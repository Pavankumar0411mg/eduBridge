USE edubridgedb;

-- Add subject_id column if not exists
ALTER TABLE Users ADD COLUMN IF NOT EXISTS subject_id INT NULL;

-- Science Stream Teachers
UPDATE Users SET subject_id = 1 WHERE username IN ('physics_teacher1', 'physics_teacher2');
UPDATE Users SET subject_id = 2 WHERE username IN ('chemistry_teacher1', 'chemistry_teacher2');
UPDATE Users SET subject_id = 3 WHERE username IN ('biology_teacher1', 'biology_teacher2');
UPDATE Users SET subject_id = 4 WHERE username IN ('math_science_teacher1', 'math_science_teacher2');
UPDATE Users SET subject_id = 5 WHERE username IN ('cs_teacher1', 'cs_teacher2');

-- Commerce Stream Teachers
UPDATE Users SET subject_id = 6 WHERE username IN ('accounts_teacher1', 'accounts_teacher2');
UPDATE Users SET subject_id = 7 WHERE username IN ('business_teacher1', 'business_teacher2');
UPDATE Users SET subject_id = 8 WHERE username IN ('economics_teacher1', 'economics_teacher2');
UPDATE Users SET subject_id = 9 WHERE username IN ('math_commerce_teacher1', 'math_commerce_teacher2');
UPDATE Users SET subject_id = 10 WHERE username IN ('english_commerce_teacher1', 'english_commerce_teacher2');

-- Ensure all teachers have stream_id and subject_id set
UPDATE Users SET stream_id = 1 WHERE role = 'Teacher' AND (username LIKE '%physics%' OR username LIKE '%chemistry%' OR username LIKE '%biology%' OR username LIKE '%math_science%' OR username LIKE '%cs%');
UPDATE Users SET stream_id = 2 WHERE role = 'Teacher' AND (username LIKE '%accounts%' OR username LIKE '%business%' OR username LIKE '%economics%' OR username LIKE '%math_commerce%' OR username LIKE '%english_commerce%');
UPDATE Users SET stream_id = 3 WHERE role = 'Teacher' AND (username LIKE '%history%' OR username LIKE '%polsci%' OR username LIKE '%geography%' OR username LIKE '%sociology%' OR username LIKE '%literature%');

-- Arts Stream Teachers
UPDATE Users SET subject_id = 11 WHERE username IN ('history_teacher1', 'history_teacher2');
UPDATE Users SET subject_id = 12 WHERE username IN ('polsci_teacher1', 'polsci_teacher2');
UPDATE Users SET subject_id = 13 WHERE username IN ('geography_teacher1', 'geography_teacher2');
UPDATE Users SET subject_id = 14 WHERE username IN ('sociology_teacher1', 'sociology_teacher2');
UPDATE Users SET subject_id = 15 WHERE username IN ('literature_teacher1', 'literature_teacher2');

-- Set grade for all teachers (both 11th and 12th grade)
UPDATE Users SET grade = 11 WHERE role = 'Teacher' AND grade IS NULL;

-- Verify all teachers have required fields
SELECT username, full_name, stream_id, subject_id, grade FROM Users WHERE role = 'Teacher' AND (stream_id IS NULL OR subject_id IS NULL OR grade IS NULL);