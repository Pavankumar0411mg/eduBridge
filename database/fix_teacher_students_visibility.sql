-- Fix teacher-student visibility by updating the backend route logic
USE edubridgedb;

-- Simple query to get students for a teacher based on same stream and grade
-- This query can be used in the backend route

-- For testing - show what students each teacher should see
SELECT 
    t.full_name as teacher_name,
    t.grade as teacher_grade,
    st.name as stream_name,
    COUNT(s.id) as student_count,
    GROUP_CONCAT(s.full_name SEPARATOR ', ') as students
FROM Users t
JOIN Streams st ON t.stream_id = st.id
LEFT JOIN Users s ON s.stream_id = t.stream_id 
    AND s.grade = t.grade 
    AND s.role = 'Student'
WHERE t.role = 'Teacher'
GROUP BY t.id, t.full_name, t.grade, st.name
ORDER BY st.name, t.grade;