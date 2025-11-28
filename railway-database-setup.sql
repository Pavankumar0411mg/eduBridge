-- Complete eduBridge Database Setup for Railway
-- This script creates all tables and inserts sample data

-- Create database (Railway will use the default database)
-- USE railway;

-- Drop existing tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS Notifications;
DROP TABLE IF EXISTS ProgressReports;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Quizzes;
DROP TABLE IF EXISTS StudyMaterials;
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS Streams;
DROP TABLE IF EXISTS Users;

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

-- Insert default admin user (password: password)
INSERT INTO Users (username, email, password, role, full_name) VALUES
('admin', 'admin@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'System Administrator');

-- Insert sample teachers
INSERT INTO Users (username, email, password, role, full_name, stream_id) VALUES
('teacher1', 'teacher1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajesh Kumar', 1),
('teacher2', 'teacher2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Priya Sharma', 2),
('teacher3', 'teacher3@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Amit Singh', 3);

-- Insert sample students
INSERT INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('student1', 'student1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aanya Sharma', 11, 1),
('student2', 'student2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aarav Kapoor', 12, 2),
('student3', 'student3@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aditi Singh', 11, 3);

-- Insert sample parents
INSERT INTO Users (username, email, password, role, full_name) VALUES
('parent1', 'parent1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aanya Sharma'),
('parent2', 'parent2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aarav Kapoor'),
('parent3', 'parent3@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aditi Singh');

-- Update students with parent relationships
UPDATE Users SET parent_id = 7 WHERE id = 4;  -- student1 -> parent1
UPDATE Users SET parent_id = 8 WHERE id = 5;  -- student2 -> parent2
UPDATE Users SET parent_id = 9 WHERE id = 6;  -- student3 -> parent3

-- Insert sample study materials
INSERT INTO StudyMaterials (title, type, file_path, uploaded_by, grade, stream_id, subject_id) VALUES
('Physics Chapter 1: Motion', 'PDF', '/uploads/physics_motion.pdf', 2, 11, 1, 1),
('Chemistry Basics', 'Video', '/uploads/chemistry_basics.mp4', 2, 11, 1, 2),
('Accountancy Fundamentals', 'PDF', '/uploads/accountancy_basics.pdf', 3, 11, 2, 6),
('History of India', 'Notes', '/uploads/history_india.pdf', 4, 11, 3, 11);

-- Insert sample quiz
INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks) VALUES
('Physics Motion Quiz', 'Test your knowledge of motion and kinematics', 11, 1, 1, 2, 30, 10);

-- Insert sample questions
INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES
(1, 'What is the SI unit of velocity?', 'm/s', 'km/h', 'm/s²', 'N', 'A', 2),
(1, 'Which equation represents uniform motion?', 'v = u + at', 's = ut', 'v² = u² + 2as', 's = ut + ½at²', 'B', 2);

-- Insert sample notifications
INSERT INTO Notifications (title, message, target_role) VALUES
('Welcome to eduBridge', 'Welcome to the rural education platform!', 'All'),
('New Study Materials', 'New physics materials have been uploaded', 'Student'),
('Quiz Available', 'A new physics quiz is now available', 'Student');