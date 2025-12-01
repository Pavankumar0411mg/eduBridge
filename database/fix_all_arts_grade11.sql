-- Fix all Arts Grade 11 students from update_students_complete.sql
USE eduBridgeDB;

-- Update all Arts Grade 11 students with complete data
UPDATE Users SET full_name = 'Arjun Sharma', email = 'arjun.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student61';
UPDATE Users SET full_name = 'manish', email = 'manish@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student64';
UPDATE Users SET full_name = 'Rahul Kumar', email = 'rahul.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student65';
UPDATE Users SET full_name = 'Sneha Verma', email = 'sneha.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student66';
UPDATE Users SET full_name = 'Varun Reddy', email = 'varun.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student67';
UPDATE Users SET full_name = 'Priya Jain', email = 'priya.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student68';
UPDATE Users SET full_name = 'Aditya Malhotra', email = 'aditya.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student69';
UPDATE Users SET full_name = 'Kavya Desai', email = 'kavya.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student70';
UPDATE Users SET full_name = 'Rohit Shah', email = 'rohit.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student71';
UPDATE Users SET full_name = 'Anjali Kapoor', email = 'anjali.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student72';
UPDATE Users SET full_name = 'Vikash Agarwal', email = 'vikash.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student73';
UPDATE Users SET full_name = 'Pooja Mehta', email = 'pooja.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student74';
UPDATE Users SET full_name = 'Deepak Tiwari', email = 'deepak.arts@gmail.com', grade = 11, stream_id = 3, role = 'Student' WHERE username = 'student75';

-- Verify all Arts Grade 11 students
SELECT 'All Arts Grade 11 Students:' as Info;
SELECT username, full_name, grade, stream_id FROM Users WHERE grade = 11 AND stream_id = 3 AND role = 'Student' ORDER BY full_name;