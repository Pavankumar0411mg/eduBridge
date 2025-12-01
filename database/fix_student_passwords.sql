-- Fix student passwords - Set all student passwords to 'password'
USE edubridgedb;

-- Update all student passwords to bcrypt hash of 'password'
UPDATE Users SET password = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE role = 'student';

-- Verify the update
SELECT username, full_name, role FROM Users WHERE role = 'student' LIMIT 10;