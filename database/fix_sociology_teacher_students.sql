-- Fix sociology_teacher1 to see Arts Class 11 students
USE eduBridgeDB;

-- Ensure Arts Class 11 students exist
UPDATE Users SET grade = 11, stream_id = 3 WHERE username IN ('student61', 'student64', 'student65', 'student66', 'student67', 'student68', 'student69', 'student70', 'student71', 'student72', 'student73', 'student74', 'student75') AND role = 'Student';

-- Add more Arts Class 11 students if needed
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('arts11_student1', 'arts11_1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Rahul Yadav', 11, 3),
('arts11_student2', 'arts11_2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sunita Devi', 11, 3),
('arts11_student3', 'arts11_3@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ajay Kumar', 11, 3),
('arts11_student4', 'arts11_4@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Rekha Singh', 11, 3),
('arts11_student5', 'arts11_5@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Mohan Lal', 11, 3);