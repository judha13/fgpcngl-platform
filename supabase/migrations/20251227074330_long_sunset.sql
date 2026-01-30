-- ChurchHub Database Schema
-- Run this SQL script to create the necessary tables

-- Create Members table
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'Member',
    join_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255),
    status VARCHAR(20) DEFAULT 'upcoming',
    attendees INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Sermons table
CREATE TABLE IF NOT EXISTS sermons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    speaker VARCHAR(255) NOT NULL,
    sermon_date DATE NOT NULL,
    series VARCHAR(255),
    duration VARCHAR(10),
    views INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'draft',
    video_url TEXT,
    audio_url TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal',
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Donations table
CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    donor_name VARCHAR(255),
    donor_email VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    fund VARCHAR(255) DEFAULT 'General Fund',
    donation_date DATE DEFAULT CURRENT_DATE,
    payment_method VARCHAR(50),
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT INTO members (name, email, phone, role, join_date, status) VALUES
('John Smith', 'john@email.com', '(555) 123-4567', 'Member', '2020-01-15', 'active'),
('Sarah Johnson', 'sarah@email.com', '(555) 234-5678', 'Volunteer', '2019-03-22', 'active'),
('Michael Brown', 'michael@email.com', '(555) 345-6789', 'Deacon', '2018-06-10', 'active'),
('Emily Davis', 'emily@email.com', '(555) 456-7890', 'Youth Leader', '2021-09-05', 'active'),
('Robert Wilson', 'robert@email.com', '(555) 567-8901', 'Member', '2022-12-01', 'inactive')
ON CONFLICT (email) DO NOTHING;

INSERT INTO events (title, description, event_date, event_time, location, status, attendees) VALUES
('Sunday Worship Service', 'Weekly worship service with communion', '2024-01-21', '10:00:00', 'Main Sanctuary', 'upcoming', 450),
('Youth Conference 2024', 'Annual youth conference with guest speakers', '2024-02-15', '18:00:00', 'Community Center', 'upcoming', 120),
('Bible Study', 'Weekly Bible study group', '2024-01-17', '19:00:00', 'Fellowship Hall', 'past', 85)
ON CONFLICT DO NOTHING;

INSERT INTO sermons (title, speaker, sermon_date, series, duration, views, status) VALUES
('Finding Peace in Chaos', 'Pastor James Wilson', '2024-12-22', 'Advent Series', '42:30', 324, 'published'),
('The Gift of Hope', 'Pastor James Wilson', '2024-12-15', 'Advent Series', '38:15', 456, 'published'),
('Walking in Faith', 'Pastor Sarah Miller', '2024-12-08', 'Faith Journey', '35:45', 289, 'published')
ON CONFLICT DO NOTHING;

INSERT INTO announcements (title, content, priority, expires_at, is_active) VALUES
('Christmas Eve Service Times', 'Join us for Christmas Eve services at 4 PM (family), 7 PM (contemporary), and 11 PM (candlelight).', 'high', '2024-12-26', true),
('New Year Prayer Vigil', 'Ring in the new year with prayer! Join us December 31st at 11 PM for our annual prayer vigil.', 'normal', '2025-01-01', true),
('Winter Bible Study Registration', 'Registration is now open for our winter Bible study series starting January 8th.', 'normal', '2025-01-08', true)
ON CONFLICT DO NOTHING;