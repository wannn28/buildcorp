-- Initial database schema for BuildCorp
-- Migration: 001_initial_schema.up.sql

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    year VARCHAR(4) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    client VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Dalam Proses',
    image VARCHAR(255),
    team VARCHAR(100),
    challenges TEXT,
    solutions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project images table
CREATE TABLE project_images (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    image_path VARCHAR(500) NOT NULL,
    image_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project features table
CREATE TABLE project_features (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    feature VARCHAR(255) NOT NULL,
    feature_order INTEGER DEFAULT 0
);

-- Company info table
CREATE TABLE company_info (
    id SERIAL PRIMARY KEY,
    vision TEXT,
    mission TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company values table
CREATE TABLE company_values (
    id SERIAL PRIMARY KEY,
    value VARCHAR(255) NOT NULL,
    value_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company history table
CREATE TABLE company_history (
    id SERIAL PRIMARY KEY,
    year VARCHAR(4) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    history_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Management team table
CREATE TABLE management_team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    bio TEXT,
    team_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    service_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service features table
CREATE TABLE service_features (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    feature VARCHAR(255) NOT NULL,
    feature_order INTEGER DEFAULT 0
);

-- Company documents table
CREATE TABLE company_documents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    document_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Featured project table
CREATE TABLE featured_project (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Featured project highlights table
CREATE TABLE featured_project_highlights (
    id SERIAL PRIMARY KEY,
    featured_project_id INTEGER REFERENCES featured_project(id) ON DELETE CASCADE,
    highlight VARCHAR(255) NOT NULL,
    highlight_order INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_project_features_project_id ON project_features(project_id);
CREATE INDEX idx_company_values_order ON company_values(value_order);
CREATE INDEX idx_company_history_order ON company_history(history_order);
CREATE INDEX idx_management_team_order ON management_team(team_order);
CREATE INDEX idx_services_order ON services(service_order);
CREATE INDEX idx_service_features_service_id ON service_features(service_id);
CREATE INDEX idx_company_documents_order ON company_documents(document_order);
CREATE INDEX idx_featured_project_highlights_project_id ON featured_project_highlights(featured_project_id);

-- Insert default company info
INSERT INTO company_info (vision, mission) VALUES (
    'Menjadi perusahaan konstruksi terdepan yang inovatif dan berkelanjutan di Indonesia',
    'Menyediakan layanan konstruksi berkualitas tinggi dengan teknologi terkini dan komitmen terhadap keselamatan dan lingkungan'
);

-- Insert default company values
INSERT INTO company_values (value, value_order) VALUES 
    ('Integritas dan Profesionalisme', 1),
    ('Inovasi dan Teknologi', 2),
    ('Keselamatan dan Kualitas', 3),
    ('Keberlanjutan dan Lingkungan', 4),
    ('Kolaborasi dan Tim Kerja', 5);

-- Insert default company history
INSERT INTO company_history (year, title, description, history_order) VALUES 
    ('2009', 'Pendirian Perusahaan', 'PT Konstruksi Maju didirikan dengan fokus pada proyek konstruksi skala menengah', 1),
    ('2015', 'Ekspansi Nasional', 'Memperluas layanan ke berbagai kota di Indonesia', 2),
    ('2020', 'Teknologi Digital', 'Implementasi teknologi BIM dan manajemen proyek digital', 3);

-- Insert default management team
INSERT INTO management_team (name, position, photo, bio, team_order) VALUES 
    ('Ir. Ahmad Suharto', 'Direktur Utama', '👨‍💼', 'Memiliki pengalaman 25 tahun di industri konstruksi dengan spesialisasi manajemen proyek besar', 1),
    ('Ir. Siti Nurhaliza', 'Direktur Operasional', '👩‍💼', 'Ahli konstruksi dengan fokus pada keselamatan kerja dan standar kualitas internasional', 2);

-- Insert default services
INSERT INTO services (title, description, icon, service_order) VALUES 
    ('Konstruksi Gedung', 'Layanan konstruksi gedung komersial, perkantoran, dan residensial', '🏢', 1);

-- Insert default service features
INSERT INTO service_features (service_id, feature, feature_order) VALUES 
    (1, 'Design & Build', 1),
    (1, 'Renovasi', 2),
    (1, 'Pemeliharaan', 3);
