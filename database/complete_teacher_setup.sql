-- Complete teacher setup with passwords
USE edubridgedb;

-- Set all teacher passwords to 'password'
UPDATE Users SET password = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE role = 'Teacher';