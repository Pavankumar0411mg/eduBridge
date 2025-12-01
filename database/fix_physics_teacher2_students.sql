-- Fix physics_teacher2 to see Science stream Class 12 students
USE eduBridgeDB;

-- Insert physics_teacher2 if not exists
INSERT IGNORE INTO Users (username, email, password, role, full_name, stream_id) VALUES
('physics_teacher2', 'physics_teacher2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Physics Teacher 2', 1);

-- Insert Science stream Class 12 students if not enough exist
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('science12_student1', 'science12_student1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Rajesh Kumar', 12, 1),
('science12_student2', 'science12_student2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Kavya Reddy', 12, 1),
('science12_student3', 'science12_student3@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aditya Jain', 12, 1),
('science12_student4', 'science12_student4@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sneha Agarwal', 12, 1),
('science12_student5', 'science12_student5@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Karan Mehta', 12, 1);