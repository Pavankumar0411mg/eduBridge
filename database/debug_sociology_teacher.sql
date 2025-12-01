-- Debug and fix sociology_teacher1 issue
USE eduBridgeDB;

-- Check if sociology_teacher1 exists and has correct stream_id
SELECT 'Sociology Teacher Check:' as Info;
SELECT id, username, full_name, stream_id, role FROM Users WHERE username = 'sociology_teacher1';

-- Check Arts stream students Grade 11
SELECT 'Arts Grade 11 Students:' as Info;
SELECT id, username, full_name, grade, stream_id, role FROM Users WHERE grade = 11 AND stream_id = 3 AND role = 'Student';

-- Ensure sociology_teacher1 exists with correct data
INSERT IGNORE INTO Users (username, email, password, role, full_name, stream_id) VALUES
('sociology_teacher1', 'prakash.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Prakash Sharma (Sociology)', 3);

-- Ensure Arts Grade 11 students exist
UPDATE Users SET grade = 11, stream_id = 3, role = 'Student' WHERE username IN ('student61', 'student64', 'student65', 'student66', 'student67', 'student68', 'student69', 'student70', 'student71', 'student72', 'student73', 'student74', 'student75');

-- Verify the fix
SELECT 'Final Check - Teacher:' as Info;
SELECT id, username, full_name, stream_id FROM Users WHERE username = 'sociology_teacher1';

SELECT 'Final Check - Students:' as Info;
SELECT username, full_name, grade, stream_id FROM Users WHERE grade = 11 AND stream_id = 3 AND role = 'Student' ORDER BY full_name;