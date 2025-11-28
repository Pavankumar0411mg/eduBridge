-- eduBridge Database Schema
CREATE DATABASE IF NOT EXISTS eduBridgeDB;
USE eduBridgeDB;

-- Users table
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Teacher', 'Student', 'Parent') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    grade INT,
    stream_id INT,
    parent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Streams table
CREATE TABLE Streams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Subjects table
CREATE TABLE Subjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    stream_id INT NOT NULL,
    FOREIGN KEY (stream_id) REFERENCES Streams(id)
);

-- Study Materials table
CREATE TABLE StudyMaterials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    type ENUM('PDF', 'Video', 'Notes') NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_by INT NOT NULL,
    grade INT NOT NULL,
    stream_id INT NOT NULL,
    subject_id INT NOT NULL,
    language VARCHAR(20) DEFAULT 'English',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES Users(id),
    FOREIGN KEY (stream_id) REFERENCES Streams(id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id)
);

-- Quizzes table
CREATE TABLE Quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    grade INT NOT NULL,
    stream_id INT NOT NULL,
    subject_id INT NOT NULL,
    created_by INT NOT NULL,
    time_limit INT DEFAULT 60,
    total_marks INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(id),
    FOREIGN KEY (stream_id) REFERENCES Streams(id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id)
);

-- Questions table
CREATE TABLE Questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(200),
    option_b VARCHAR(200),
    option_c VARCHAR(200),
    option_d VARCHAR(200),
    correct_answer CHAR(1) NOT NULL,
    marks INT DEFAULT 1,
    FOREIGN KEY (quiz_id) REFERENCES Quizzes(id) ON DELETE CASCADE
);

-- Progress Reports table
CREATE TABLE ProgressReports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    quiz_id INT NOT NULL,
    score INT NOT NULL,
    total_marks INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Users(id),
    FOREIGN KEY (quiz_id) REFERENCES Quizzes(id)
);

-- Notifications table
CREATE TABLE Notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    target_role ENUM('All', 'Admin', 'Teacher', 'Student', 'Parent'),
    target_user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (target_user_id) REFERENCES Users(id)
);

-- Insert initial streams
INSERT INTO Streams (name, description) VALUES
('Science', 'Science stream for 11th and 12th grade'),
('Commerce', 'Commerce stream for 11th and 12th grade'),
('Arts', 'Arts stream for 11th and 12th grade');

-- Insert subjects for Science stream
INSERT INTO Subjects (name, stream_id) VALUES
('Physics', 1),
('Chemistry', 1),
('Biology', 1),
('Mathematics', 1),
('Computer Science', 1);

-- Insert subjects for Commerce stream
INSERT INTO Subjects (name, stream_id) VALUES
('Accountancy', 2),
('Business Studies', 2),
('Economics', 2),
('Mathematics', 2),
('English', 2);

-- Insert subjects for Arts stream
INSERT INTO Subjects (name, stream_id) VALUES
('History', 3),
('Political Science', 3),
('Geography', 3),
('Sociology', 3),
('Literature', 3);

-- Insert default admin user (password: password - hashed)
INSERT INTO Users (username, email, password, role, full_name) VALUES
('admin', 'admin@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'System Administrator');