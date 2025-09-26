-- Weather Alert System Database Schema
-- SQLite Database for storing users, locations, alerts, and notifications

-- =====================================================
-- Users Table
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- =====================================================
-- Locations Table
-- =====================================================
CREATE TABLE IF NOT EXISTS locations (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    country TEXT,
    state TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_locations_user_id ON locations(user_id);
CREATE INDEX IF NOT EXISTS idx_locations_coordinates ON locations(latitude, longitude);

-- =====================================================
-- Weather Alerts Table
-- =====================================================
CREATE TABLE IF NOT EXISTS weather_alerts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    location_id TEXT NOT NULL,
    condition_type TEXT NOT NULL CHECK (condition_type IN ('temperature', 'humidity', 'wind_speed', 'pressure', 'visibility')),
    condition_value REAL NOT NULL,
    operator TEXT NOT NULL CHECK (operator IN ('greater_than', 'less_than', 'equals', 'greater_or_equal', 'less_or_equal')),
    message TEXT NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON weather_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_location_id ON weather_alerts(location_id);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON weather_alerts(is_active);

-- =====================================================
-- Notifications Table
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    alert_id TEXT NOT NULL,
    message TEXT NOT NULL,
    weather_data TEXT NOT NULL, -- JSON string of weather data
    triggered_at TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0 CHECK (is_read IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (alert_id) REFERENCES weather_alerts(id) ON DELETE CASCADE
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_alert_id ON notifications(alert_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_triggered_at ON notifications(triggered_at);

-- =====================================================
-- Sample Data for Testing
-- =====================================================

-- Insert a sample user for testing
INSERT OR IGNORE INTO users (id, name, email)
VALUES ('user-001', 'Test User', 'test@example.com');

-- Insert sample locations
INSERT OR IGNORE INTO locations (id, user_id, name, latitude, longitude, country, state)
VALUES
    ('loc-001', 'user-001', 'London', 51.5074, -0.1278, 'GB', 'England'),
    ('loc-002', 'user-001', 'New York', 40.7128, -74.0060, 'US', 'NY'),
    ('loc-003', 'user-001', 'Tokyo', 35.6762, 139.6503, 'JP', 'Tokyo');

-- Insert sample weather alerts
INSERT OR IGNORE INTO weather_alerts (id, user_id, location_id, condition_type, condition_value, operator, message)
VALUES
    ('alert-001', 'user-001', 'loc-001', 'temperature', 25.0, 'greater_than', 'Temperature in London is above 25°C'),
    ('alert-002', 'user-001', 'loc-002', 'humidity', 80.0, 'greater_or_equal', 'High humidity alert for New York'),
    ('alert-003', 'user-001', 'loc-003', 'wind_speed', 15.0, 'greater_than', 'Strong winds in Tokyo');

-- =====================================================
-- Triggers for Updated Timestamps
-- =====================================================

-- Update timestamp trigger for users
CREATE TRIGGER IF NOT EXISTS trigger_users_updated_at
    AFTER UPDATE ON users
BEGIN
    UPDATE users SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- Update timestamp trigger for locations
CREATE TRIGGER IF NOT EXISTS trigger_locations_updated_at
    AFTER UPDATE ON locations
BEGIN
    UPDATE locations SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- Update timestamp trigger for weather_alerts
CREATE TRIGGER IF NOT EXISTS trigger_alerts_updated_at
    AFTER UPDATE ON weather_alerts
BEGIN
    UPDATE weather_alerts SET updated_at = datetime('now') WHERE id = NEW.id;
END;
