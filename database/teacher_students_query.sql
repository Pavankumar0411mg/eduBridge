-- Query to display students in teacher's "My Students" tab
USE edubridgedb;

-- For physics_teacher1 (Grade 11 Science) - shows his students
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
WHERE s.role = 'Student' 
  AND s.grade = (SELECT grade FROM Users WHERE username = 'physics_teacher1')
  AND s.stream_id = (SELECT stream_id FROM Users WHERE username = 'physics_teacher1')
ORDER BY s.full_name;

-- Generic query for any teacher (replace ? with teacher's username)
-- SELECT 
--     s.id,
--     s.username,
--     s.full_name,
--     s.email,
--     s.grade,
--     st.name as stream,
--     s.created_at as enrolled_date
-- FROM Users s
-- JOIN Streams st ON s.stream_id = st.id
-- WHERE s.role = 'Student' 
--   AND s.grade = (SELECT grade FROM Users WHERE username = ?)
--   AND s.stream_id = (SELECT stream_id FROM Users WHERE username = ?)
-- ORDER BY s.full_name;