-- Update teachers with correct stream and grade assignments

USE edubridgedb;

-- Physics Teachers - Science Stream
UPDATE Users SET stream_id = 1, grade = 11 WHERE username = 'physics_teacher1';
UPDATE Users SET stream_id = 1, grade = 12 WHERE username = 'physics_teacher2';

-- Chemistry Teachers - Science Stream  
UPDATE Users SET stream_id = 1, grade = 11 WHERE username = 'chemistry_teacher1';
UPDATE Users SET stream_id = 1, grade = 12 WHERE username = 'chemistry_teacher2';

-- Biology Teachers - Science Stream
UPDATE Users SET stream_id = 1, grade = 11 WHERE username = 'biology_teacher1';
UPDATE Users SET stream_id = 1, grade = 12 WHERE username = 'biology_teacher2';

-- Math Teachers - Science Stream
UPDATE Users SET stream_id = 1, grade = 11 WHERE username = 'math_teacher1';
UPDATE Users SET stream_id = 1, grade = 12 WHERE username = 'math_teacher2';

-- Computer Science Teachers - Science Stream
UPDATE Users SET stream_id = 1, grade = 11 WHERE username = 'cs_teacher1';
UPDATE Users SET stream_id = 1, grade = 12 WHERE username = 'cs_teacher2';

-- Commerce Teachers - Commerce Stream
UPDATE Users SET stream_id = 2, grade = 11 WHERE username = 'accounts_teacher1';
UPDATE Users SET stream_id = 2, grade = 12 WHERE username = 'accounts_teacher2';
UPDATE Users SET stream_id = 2, grade = 11 WHERE username = 'business_teacher1';
UPDATE Users SET stream_id = 2, grade = 12 WHERE username = 'business_teacher2';
UPDATE Users SET stream_id = 2, grade = 11 WHERE username = 'economics_teacher1';
UPDATE Users SET stream_id = 2, grade = 12 WHERE username = 'economics_teacher2';

-- Arts Teachers - Arts Stream
UPDATE Users SET stream_id = 3, grade = 11 WHERE username = 'history_teacher1';
UPDATE Users SET stream_id = 3, grade = 12 WHERE username = 'history_teacher2';
UPDATE Users SET stream_id = 3, grade = 11 WHERE username = 'geography_teacher1';
UPDATE Users SET stream_id = 3, grade = 12 WHERE username = 'geography_teacher2';
UPDATE Users SET stream_id = 3, grade = 11 WHERE username = 'polsci_teacher1';
UPDATE Users SET stream_id = 3, grade = 12 WHERE username = 'polsci_teacher2';

SELECT 'Teachers updated with correct stream and grade assignments!' as message;