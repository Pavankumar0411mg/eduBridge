-- Fix quiz creation issue by adding subject_id to Users table
USE railway;

-- Add subject_id column to Users table if it doesn't exist
ALTER TABLE Users ADD COLUMN IF NOT EXISTS subject_id INT NULL;

-- Add foreign key constraint if it doesn't exist
-- Note: This will fail silently if the constraint already exists
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'Users' 
     AND COLUMN_NAME = 'subject_id' 
     AND REFERENCED_TABLE_NAME = 'Subjects') = 0,
    'ALTER TABLE Users ADD FOREIGN KEY (subject_id) REFERENCES Subjects(id)',
    'SELECT "Foreign key already exists"'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Update existing teachers with subject assignments
-- Science stream teachers
UPDATE Users SET subject_id = 1, stream_id = 1 WHERE username = 'teacher1' AND role = 'Teacher'; -- Physics
UPDATE Users SET subject_id = 2, stream_id = 1 WHERE username LIKE '%chemistry%' AND role = 'Teacher'; -- Chemistry
UPDATE Users SET subject_id = 3, stream_id = 1 WHERE username LIKE '%biology%' AND role = 'Teacher'; -- Biology
UPDATE Users SET subject_id = 4, stream_id = 1 WHERE username LIKE '%math%' AND role = 'Teacher'; -- Mathematics
UPDATE Users SET subject_id = 5, stream_id = 1 WHERE username LIKE '%cs%' AND role = 'Teacher'; -- Computer Science

-- Commerce stream teachers  
UPDATE Users SET subject_id = 6, stream_id = 2 WHERE username = 'teacher2' AND role = 'Teacher'; -- Accountancy
UPDATE Users SET subject_id = 7, stream_id = 2 WHERE username LIKE '%business%' AND role = 'Teacher'; -- Business Studies
UPDATE Users SET subject_id = 8, stream_id = 2 WHERE username LIKE '%economics%' AND role = 'Teacher'; -- Economics
UPDATE Users SET subject_id = 9, stream_id = 2 WHERE username LIKE '%commerce_math%' AND role = 'Teacher'; -- Mathematics (Commerce)
UPDATE Users SET subject_id = 10, stream_id = 2 WHERE username LIKE '%english%' AND role = 'Teacher'; -- English

-- Arts stream teachers
UPDATE Users SET subject_id = 11, stream_id = 3 WHERE username = 'teacher3' AND role = 'Teacher'; -- History
UPDATE Users SET subject_id = 12, stream_id = 3 WHERE username LIKE '%polsci%' AND role = 'Teacher'; -- Political Science
UPDATE Users SET subject_id = 13, stream_id = 3 WHERE username LIKE '%geography%' AND role = 'Teacher'; -- Geography
UPDATE Users SET subject_id = 14, stream_id = 3 WHERE username LIKE '%sociology%' AND role = 'Teacher'; -- Sociology
UPDATE Users SET subject_id = 15, stream_id = 3 WHERE username LIKE '%literature%' AND role = 'Teacher'; -- Literature

-- Verify the updates
SELECT 'Teacher subject assignments:' as info;
SELECT u.username, u.full_name, u.stream_id, s.name as subject_name, st.name as stream_name
FROM Users u
LEFT JOIN Subjects s ON u.subject_id = s.id
LEFT JOIN Streams st ON u.stream_id = st.id
WHERE u.role = 'Teacher'
ORDER BY u.stream_id, u.subject_id;