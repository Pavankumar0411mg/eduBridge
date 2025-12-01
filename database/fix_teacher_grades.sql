-- Fix teacher grade assignments to show all students in their stream
USE edubridgedb;

-- Set teachers to NULL grade so they can see all students in their stream
UPDATE Users SET grade = NULL WHERE role = 'Teacher';