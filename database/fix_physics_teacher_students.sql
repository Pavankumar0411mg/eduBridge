-- Fix physics_teacher1 to see Science stream Class 11 students
USE eduBridgeDB;

-- Insert physics_teacher1 if not exists
INSERT IGNORE INTO Users (username, email, password, role, full_name, stream_id) VALUES
('physics_teacher1', 'physics_teacher1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Physics Teacher', 1);

-- Insert Science stream Class 11 students if not enough exist
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('science_student1', 'science_student1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Arjun Kumar', 11, 1),
('science_student2', 'science_student2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Priya Sharma', 11, 1),
('science_student3', 'science_student3@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Vikram Singh', 11, 1),
('science_student4', 'science_student4@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Anita Patel', 11, 1),
('science_student5', 'science_student5@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Rohit Gupta', 11, 1);