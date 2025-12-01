-- Test database connection and data
USE eduBridgeDB;

-- Check if database exists and is connected
SELECT 'Database Connection Test' as Status, DATABASE() as CurrentDB;

-- Check if Users table exists
SHOW TABLES LIKE 'Users';

-- Count all users by role
SELECT role, COUNT(*) as count FROM Users GROUP BY role;

-- Check sociology_teacher1 specifically
SELECT 'Teacher Check:' as Info;
SELECT id, username, full_name, stream_id FROM Users WHERE username = 'sociology_teacher1';

-- Check Arts Grade 11 students
SELECT 'Arts Grade 11 Students:' as Info;
SELECT COUNT(*) as total_count FROM Users WHERE grade = 11 AND stream_id = 3 AND role = 'Student';
SELECT username, full_name, grade, stream_id FROM Users WHERE grade = 11 AND stream_id = 3 AND role = 'Student' LIMIT 5;

-- Test the exact query the backend uses
SELECT 'Backend Query Test:' as Info;
SELECT 
    s.id,
    s.username,
    s.full_name,
    s.email,
    s.grade,
    st.name as stream,
    s.created_at as enrolled_date
FROM Users s
JOIN Streams st ON s.stream_id = st.id
WHERE s.role = 'Student' AND s.stream_id = 3 AND s.grade = 11
ORDER BY s.full_name;