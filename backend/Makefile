.PHONY: run build migrate-up migrate-down migrate-reset migrate-force-reset migrate-steps-up migrate-steps-down

# ── Server ────────────────────────────────────────────────────────────────────
run:
	go run ./cmd/server/main.go

build:
	go build -o bin/server ./cmd/server/main.go

# ── Migrations  (reads DB_* values from .env automatically) ──────────────────
MIGRATE = go run ./cmd/migrate/main.go

## Apply all pending migrations
migrate-up:
	$(MIGRATE) -action=up

## Roll back the last migration
migrate-down:
	$(MIGRATE) -action=down

## Roll back ALL migrations then re-apply all
migrate-reset:
	$(MIGRATE) -action=reset

## Drop schema_migrations ownership issue then full reset (use when: "permission denied for schema_migrations")
migrate-force-reset:
	$(MIGRATE) -action=force-reset

## Apply N steps:  make migrate-steps-up STEPS=2
migrate-steps-up:
	$(MIGRATE) -action=up -steps=$(STEPS)

## Roll back N steps:  make migrate-steps-down STEPS=2
migrate-steps-down:
	$(MIGRATE) -action=down -steps=$(STEPS)
