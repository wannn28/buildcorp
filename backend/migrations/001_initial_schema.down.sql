-- Rollback initial database schema for BuildCorp
-- Migration: 001_initial_schema.down.sql

-- Drop tables in reverse order (due to foreign key constraints)
DROP TABLE IF EXISTS featured_project_highlights;
DROP TABLE IF EXISTS featured_project;
DROP TABLE IF EXISTS company_documents;
DROP TABLE IF EXISTS service_features;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS management_team;
DROP TABLE IF EXISTS company_history;
DROP TABLE IF EXISTS company_values;
DROP TABLE IF EXISTS company_info;
DROP TABLE IF EXISTS project_features;
DROP TABLE IF EXISTS project_images;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;
