-- Create teacher-subject mapping for automatic quiz subject assignment
USE edubridgedb;

-- Add subject_id to Users table for teachers
ALTER TABLE Users ADD COLUMN subject_id INT NULL;
ALTER TABLE Users ADD FOREIGN KEY (subject_id) REFERENCES Subjects(id);

-- Update teachers with their subject IDs
UPDATE Users SET subject_id = 1 WHERE username LIKE '%physics%'; -- Physics
UPDATE Users SET subject_id = 2 WHERE username LIKE '%chemistry%'; -- Chemistry  
UPDATE Users SET subject_id = 3 WHERE username LIKE '%biology%'; -- Biology
UPDATE Users SET subject_id = 4 WHERE username LIKE '%math%'; -- Mathematics
UPDATE Users SET subject_id = 5 WHERE username LIKE '%cs%'; -- Computer Science
UPDATE Users SET subject_id = 6 WHERE username LIKE '%accounts%'; -- Accountancy
UPDATE Users SET subject_id = 7 WHERE username LIKE '%business%'; -- Business Studies
UPDATE Users SET subject_id = 8 WHERE username LIKE '%economics%'; -- Economics
UPDATE Users SET subject_id = 10 WHERE username LIKE '%english%'; -- English
UPDATE Users SET subject_id = 11 WHERE username LIKE '%history%'; -- History
UPDATE Users SET subject_id = 12 WHERE username LIKE '%polsci%'; -- Political Science
UPDATE Users SET subject_id = 13 WHERE username LIKE '%geography%'; -- Geography
UPDATE Users SET subject_id = 14 WHERE username LIKE '%sociology%'; -- Sociology
UPDATE Users SET subject_id = 15 WHERE username LIKE '%literature%'; -- Literature

-- Query to get teacher's subject for quiz creation
SELECT 'Teacher subject mapping:' as info;
SELECT u.username, u.full_name, s.name as subject
FROM Users u
LEFT JOIN Subjects s ON u.subject_id = s.id
WHERE u.role = 'Teacher' AND u.username = 'physics_teacher1';