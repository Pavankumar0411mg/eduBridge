USE edubridgedb;

-- Fix physics teacher specifically
UPDATE Users SET stream_id = 1, subject_id = 1 WHERE username = 'physics_teacher1';

-- Verify the fix
SELECT username, full_name, stream_id, subject_id FROM Users WHERE username = 'physics_teacher1';