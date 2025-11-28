-- View all student-teacher-stream relationships
USE edubridgedb;

-- Students by Stream and Grade
SELECT 'STUDENTS BY STREAM AND GRADE:' as info;
SELECT 
    st.name as stream,
    u.grade,
    u.full_name as student_name,
    u.username,
    u.email
FROM Users u
JOIN Streams st ON u.stream_id = st.id
WHERE u.role = 'Student'
ORDER BY st.name, u.grade, u.full_name;

-- Teachers by Stream and Grade  
SELECT 'TEACHERS BY STREAM AND GRADE:' as info;
SELECT 
    st.name as stream,
    u.grade,
    u.full_name as teacher_name,
    u.username,
    u.email
FROM Users u
JOIN Streams st ON u.stream_id = st.id
WHERE u.role = 'Teacher'
ORDER BY st.name, u.grade, u.full_name;

-- Summary Count
SELECT 'SUMMARY COUNT:' as info;
SELECT 
    st.name as stream,
    u.grade,
    COUNT(CASE WHEN u.role = 'Student' THEN 1 END) as students,
    COUNT(CASE WHEN u.role = 'Teacher' THEN 1 END) as teachers
FROM Users u
JOIN Streams st ON u.stream_id = st.id
WHERE u.role IN ('Student', 'Teacher')
GROUP BY st.name, u.grade
ORDER BY st.name, u.grade;