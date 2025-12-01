-- Complete student setup - create missing students and update all
USE eduBridgeDB;

-- Create missing students first
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('student66', 'student66@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 66', 11, 3),
('student67', 'student67@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 67', 11, 3),
('student68', 'student68@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 68', 11, 3),
('student69', 'student69@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 69', 11, 3),
('student70', 'student70@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 70', 11, 3),
('student71', 'student71@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 71', 11, 3),
('student72', 'student72@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 72', 11, 3),
('student73', 'student73@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 73', 11, 3),
('student74', 'student74@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 74', 11, 3),
('student75', 'student75@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 75', 11, 3),
('student76', 'student76@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 76', 12, 3),
('student77', 'student77@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 77', 12, 3),
('student78', 'student78@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 78', 12, 3),
('student79', 'student79@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 79', 12, 3),
('student80', 'student80@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 80', 12, 3),
('student81', 'student81@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 81', 12, 3),
('student82', 'student82@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 82', 12, 3),
('student83', 'student83@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 83', 12, 3),
('student84', 'student84@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 84', 12, 3),
('student85', 'student85@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 85', 12, 3),
('student86', 'student86@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 86', 12, 3),
('student87', 'student87@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 87', 12, 3),
('student88', 'student88@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 88', 12, 3),
('student89', 'student89@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 89', 12, 3),
('student90', 'student90@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Student 90', 12, 3);

-- Now update with proper names from update_students_complete.sql
-- Arts Stream Students (Grade 11)
UPDATE Users SET full_name = 'Sneha Verma', email = 'sneha.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student66';
UPDATE Users SET full_name = 'Varun Reddy', email = 'varun.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student67';
UPDATE Users SET full_name = 'Priya Jain', email = 'priya.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student68';
UPDATE Users SET full_name = 'Aditya Malhotra', email = 'aditya.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student69';
UPDATE Users SET full_name = 'Kavya Desai', email = 'kavya.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student70';
UPDATE Users SET full_name = 'Rohit Shah', email = 'rohit.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student71';
UPDATE Users SET full_name = 'Anjali Kapoor', email = 'anjali.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student72';
UPDATE Users SET full_name = 'Vikash Agarwal', email = 'vikash.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student73';
UPDATE Users SET full_name = 'Pooja Mehta', email = 'pooja.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student74';
UPDATE Users SET full_name = 'Deepak Tiwari', email = 'deepak.arts@gmail.com', grade = 11, stream_id = 3 WHERE username = 'student75';

-- Arts Stream Students (Grade 12)
UPDATE Users SET full_name = 'Neha Sharma', email = 'neha.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student76';
UPDATE Users SET full_name = 'Suresh Patel', email = 'suresh.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student77';
UPDATE Users SET full_name = 'Ritu Singh', email = 'ritu.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student78';
UPDATE Users SET full_name = 'Manish Gupta', email = 'manish.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student79';
UPDATE Users SET full_name = 'Sunita Kumar', email = 'sunita.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student80';
UPDATE Users SET full_name = 'Rajesh Verma', email = 'rajesh.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student81';
UPDATE Users SET full_name = 'Geeta Reddy', email = 'geeta.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student82';
UPDATE Users SET full_name = 'Amit Jain', email = 'amit.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student83';
UPDATE Users SET full_name = 'Sonia Malhotra', email = 'sonia.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student84';
UPDATE Users SET full_name = 'Vinod Desai', email = 'vinod.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student85';
UPDATE Users SET full_name = 'Rekha Shah', email = 'rekha.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student86';
UPDATE Users SET full_name = 'Manoj Kapoor', email = 'manoj.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student87';
UPDATE Users SET full_name = 'Usha Agarwal', email = 'usha.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student88';
UPDATE Users SET full_name = 'Prakash Mehta', email = 'prakash.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student89';
UPDATE Users SET full_name = 'Seema Tiwari', email = 'seema.arts@gmail.com', grade = 12, stream_id = 3 WHERE username = 'student90';

-- Verify Arts Grade 11 students
SELECT 'Arts Grade 11 Students:' as Info;
SELECT username, full_name, grade, stream_id FROM Users WHERE grade = 11 AND stream_id = 3 AND role = 'Student' ORDER BY full_name;