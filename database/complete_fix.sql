-- Complete fix - create all data and ensure teachers see students
USE edubridgedb;

-- Create all missing students
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
-- Science Grade 11
('newstudent123', 'newstudent123@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'New Student', 11, 1),
('student1', 'student1@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aanya Sharma', 11, 1),
('student2', 'student2@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aarav Kapoor', 11, 1),
('student3', 'student3@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aditi Singh', 11, 1),
('student4', 'student4@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ahan Patel', 11, 1),
('student5', 'student5@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Akshara Nair', 11, 1),
-- Science Grade 12
('student16', 'student16@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Gaurav Singh', 12, 1),
('student17', 'student17@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Harsha Desai', 12, 1),
('student18', 'student18@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ishaan Malhotra', 12, 1),
-- Commerce Grade 11
('student31', 'student31@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Nishant Sharma', 11, 2),
('student32', 'student32@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Om Desai', 11, 2),
('student33', 'student33@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ojas Jain', 11, 2),
-- Commerce Grade 12
('student46', 'student46@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sanjay Verma', 12, 2),
('student47', 'student47@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sarah Khan', 12, 2),
('student48', 'student48@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Shaan Reddy', 12, 2),
-- Arts Grade 11
('student61', 'student61@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Arjun Sharma', 11, 3),
('student64', 'student64@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'manish', 11, 3),
('student65', 'student65@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Rahul Kumar', 11, 3),
('student66', 'student66@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sneha Verma', 11, 3),
('student67', 'student67@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Varun Reddy', 11, 3),
-- Arts Grade 12
('student76', 'student76@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Neha Sharma', 12, 3),
('student77', 'student77@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Suresh Patel', 12, 3),
('student78', 'student78@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ritu Singh', 12, 3);

-- Ensure all teachers exist
INSERT IGNORE INTO Users (username, email, password, role, full_name, stream_id) VALUES
('physics_teacher1', 'rajesh.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajesh Kumar (Physics)', 1),
('physics_teacher2', 'priya.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Priya Sharma (Physics)', 1),
('business_teacher1', 'ravi.business@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Ravi Kumar (Business Studies)', 2),
('business_teacher2', 'pooja.business@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Pooja Sharma (Business Studies)', 2),
('sociology_teacher1', 'prakash.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Prakash Sharma (Sociology)', 3),
('sociology_teacher2', 'usha.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Usha Gupta (Sociology)', 3);

-- Test queries
SELECT 'Teachers:' as Info, COUNT(*) as Count FROM Users WHERE role = 'Teacher';
SELECT 'Students:' as Info, COUNT(*) as Count FROM Users WHERE role = 'Student';
SELECT 'Science Grade 11:' as Info, COUNT(*) as Count FROM Users WHERE grade = 11 AND stream_id = 1 AND role = 'Student';
SELECT 'Arts Grade 11:' as Info, COUNT(*) as Count FROM Users WHERE grade = 11 AND stream_id = 3 AND role = 'Student';

-- Test backend query for sociology_teacher1
SELECT 'Sociology Teacher 1 Students:' as Info;
SELECT s.username, s.full_name, s.grade, st.name as stream
FROM Users s
JOIN Streams st ON s.stream_id = st.id
WHERE s.role = 'Student' AND s.stream_id = 3 AND s.grade = 11
ORDER BY s.full_name;