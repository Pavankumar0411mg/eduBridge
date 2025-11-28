-- Fix teacher-student visibility issue
USE edubridgedb;

-- 1. Check current teacher data
SELECT 'Current physics_teacher1 data:' as info;
SELECT username, full_name, grade, stream_id FROM Users WHERE username = 'physics_teacher1';

-- 2. Check students in Grade 11 Science
SELECT 'Students in Grade 11 Science:' as info;
SELECT username, full_name, grade, stream_id FROM Users WHERE role = 'Student' AND grade = 11 AND stream_id = 1 LIMIT 5;

-- 3. Ensure physics_teacher1 exists with correct data
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('physics_teacher1', 'rajesh.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajesh Kumar (Physics)', 11, 1);

-- 4. Update physics_teacher1 to ensure correct grade and stream
UPDATE Users SET grade = 11, stream_id = 1 WHERE username = 'physics_teacher1';

-- 5. Ensure we have Grade 11 Science students
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('student1', 'aanya.sharma@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aanya Sharma', 11, 1),
('student2', 'aarav.kapoor@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aarav Kapoor', 11, 1),
('student3', 'aditi.singh@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aditi Singh', 11, 1);

-- 6. Update existing students to Grade 11 Science
UPDATE Users SET grade = 11, stream_id = 1 WHERE username IN ('student1', 'student2', 'student3', 'student4', 'student5');

-- 7. Test the query that should show students
SELECT 'Students visible to physics_teacher1:' as info;
SELECT 
    s.username,
    s.full_name,
    s.grade,
    st.name as stream
FROM Users s
JOIN Streams st ON s.stream_id = st.id
WHERE s.role = 'Student' 
  AND s.grade = (SELECT grade FROM Users WHERE username = 'physics_teacher1')
  AND s.stream_id = (SELECT stream_id FROM Users WHERE username = 'physics_teacher1')
ORDER BY s.full_name;

SELECT 'Fix complete!' as status;