package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/url"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func buildDSN() string {
	host := getEnv("DB_HOST", "localhost")
	port := getEnv("DB_PORT", "5432")
	user := getEnv("DB_USER", "postgres")
	password := getEnv("DB_PASSWORD", "")
	dbName := getEnv("DB_NAME", "buildcorp_db")
	sslMode := getEnv("DB_SSL_MODE", "disable")
	// lib/pq only supports: disable, require, verify-ca, verify-full.
	// Map "prefer"/"allow" (supported by GORM/pgx but not lib/pq) to "disable".
	if sslMode == "prefer" || sslMode == "allow" {
		sslMode = "disable"
	}
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s",
		url.QueryEscape(user),
		url.QueryEscape(password),
		host, port, dbName, sslMode,
	)
}

// dropMigrationsTable drops the schema_migrations table directly via database/sql
// so golang-migrate can recreate it with the correct owner.
func dropMigrationsTable(dsn string) error {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return fmt.Errorf("cannot open db: %w", err)
	}
	defer db.Close()

	_, err = db.Exec(`DROP TABLE IF EXISTS schema_migrations`)
	if err != nil {
		return fmt.Errorf("cannot drop schema_migrations: %w", err)
	}
	log.Println("Dropped schema_migrations table")
	return nil
}

func newMigrator(dsn string) *migrate.Migrate {
	m, err := migrate.New("file://migrations", dsn)
	if err != nil {
		log.Fatalf("Failed to create migrate instance: %v", err)
	}
	return m
}

func main() {
	action := flag.String("action", "up", "Migration action: up, down, reset, force-reset")
	steps := flag.Int("steps", 0, "Number of migration steps for up/down (0 = all)")
	flag.Parse()

	// Load .env — try backend root first, then CWD (when run via `go run` from backend/)
	if err := godotenv.Load("../../.env"); err != nil {
		_ = godotenv.Load(".env")
	}

	dsn := buildDSN()

	switch *action {
	case "up":
		m := newMigrator(dsn)
		defer m.Close()
		var err error
		if *steps > 0 {
			err = m.Steps(*steps)
		} else {
			err = m.Up()
		}
		if err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration up failed: %v", err)
		}
		if err == migrate.ErrNoChange {
			log.Println("No pending migrations")
		} else {
			log.Println("Migration up completed successfully")
		}

	case "down":
		m := newMigrator(dsn)
		defer m.Close()
		var err error
		if *steps > 0 {
			err = m.Steps(-*steps)
		} else {
			err = m.Steps(-1)
		}
		if err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration down failed: %v", err)
		}
		if err == migrate.ErrNoChange {
			log.Println("No migrations to roll back")
		} else {
			log.Println("Migration down completed successfully")
		}

	case "reset":
		m := newMigrator(dsn)
		defer m.Close()
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration reset (down all) failed: %v", err)
		}
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration reset (up all) failed: %v", err)
		}
		log.Println("Migration reset completed successfully")

	case "force-reset":
		// 1. Drop schema_migrations so it gets recreated owned by the current DB user.
		if err := dropMigrationsTable(dsn); err != nil {
			log.Fatalf("force-reset: %v", err)
		}
		m := newMigrator(dsn)
		defer m.Close()
		// 2. Force the version to 1 (latest) so golang-migrate knows what to roll back.
		//    The table may already exist from GORM AutoMigrate, that's fine — down.sql
		//    uses DROP TABLE IF EXISTS so it handles both cases safely.
		if err := m.Force(1); err != nil {
			log.Fatalf("force-reset (force version) failed: %v", err)
		}
		// 3. Roll back all migrations (drops all app tables).
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("force-reset (down all) failed: %v", err)
		}
		// 4. Re-apply all migrations from scratch.
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("force-reset (up all) failed: %v", err)
		}
		log.Println("force-reset completed successfully")

	default:
		log.Fatalf("Unknown action: %q — valid values: up, down, reset, force-reset", *action)
	}
}
