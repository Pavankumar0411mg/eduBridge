-- Fix teacher subject assignments
USE edubridgedb;

-- Ensure subject_id column exists
ALTER TABLE Users ADD COLUMN IF NOT EXISTS subject_id INT NULL;

-- Update teachers with correct subject IDs
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

-- Verify physics teacher
SELECT username, full_name, stream_id, subject_id FROM Users WHERE username = 'physics_teacher1';