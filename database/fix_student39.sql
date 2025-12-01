-- Fix student39 login issue
USE edubridgedb;

-- Insert student39 if not exists with correct password hash for "student123"
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('student39', 'rohan.kumar@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Rohan Kumar', 11, 2);

-- Update student39 details if already exists
UPDATE Users SET 
    full_name = 'Rohan Kumar', 
    email = 'rohan.kumar@gmail.com', 
    grade = 11, 
    stream_id = 2,
    password = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE username = 'student39';

-- Verify the student exists
SELECT username, email, full_name, grade, stream_id FROM Users WHERE username = 'student39';