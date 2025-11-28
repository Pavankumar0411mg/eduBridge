-- eduBridge PostgreSQL Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('Admin', 'Teacher', 'Student', 'Parent')) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    grade INTEGER,
    stream_id INTEGER,
    parent_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Streams table
CREATE TABLE IF NOT EXISTS streams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    stream_id INTEGER NOT NULL,
    FOREIGN KEY (stream_id) REFERENCES streams(id)
);

-- Study Materials table
CREATE TABLE IF NOT EXISTS studymaterials (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('PDF', 'Video', 'Notes')) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_by INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    stream_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    language VARCHAR(20) DEFAULT 'English',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    FOREIGN KEY (stream_id) REFERENCES streams(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    grade INTEGER NOT NULL,
    stream_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    created_by INTEGER NOT NULL,
    time_limit INTEGER DEFAULT 60,
    total_marks INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (stream_id) REFERENCES streams(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(200),
    option_b VARCHAR(200),
    option_c VARCHAR(200),
    option_d VARCHAR(200),
    correct_answer CHAR(1) NOT NULL,
    marks INTEGER DEFAULT 1,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Progress Reports table
CREATE TABLE IF NOT EXISTS progressreports (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    quiz_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    target_role VARCHAR(20) CHECK (target_role IN ('All', 'Admin', 'Teacher', 'Student', 'Parent')),
    target_user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (target_user_id) REFERENCES users(id)
);

-- Insert initial streams
INSERT INTO streams (name, description) VALUES
('Science', 'Science stream for 11th and 12th grade'),
('Commerce', 'Commerce stream for 11th and 12th grade'),
('Arts', 'Arts stream for 11th and 12th grade')
ON CONFLICT DO NOTHING;

-- Insert subjects for Science stream
INSERT INTO subjects (name, stream_id) VALUES
('Physics', 1),
('Chemistry', 1),
('Biology', 1),
('Mathematics', 1),
('Computer Science', 1)
ON CONFLICT DO NOTHING;

-- Insert subjects for Commerce stream
INSERT INTO subjects (name, stream_id) VALUES
('Accountancy', 2),
('Business Studies', 2),
('Economics', 2),
('Mathematics', 2),
('English', 2)
ON CONFLICT DO NOTHING;

-- Insert subjects for Arts stream
INSERT INTO subjects (name, stream_id) VALUES
('History', 3),
('Political Science', 3),
('Geography', 3),
('Sociology', 3),
('Literature', 3)
ON CONFLICT DO NOTHING;

-- Insert default admin user (password: password - hashed)
INSERT INTO users (username, email, password, role, full_name) VALUES
('admin', 'admin@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'System Administrator')
ON CONFLICT DO NOTHING;