-- Fix all student passwords to "password"
USE edubridgedb;

-- Update all existing students to use "password" hash
UPDATE Users SET password = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE role = 'Student';

SELECT 'All student passwords updated to: password' as message;
SELECT COUNT(*) as students_updated FROM Users WHERE role = 'Student';