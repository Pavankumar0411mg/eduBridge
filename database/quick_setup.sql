-- Quick setup script - copy and paste this into MySQL
USE edubridgedb;

-- Update existing students with correct stream data
UPDATE Users SET full_name = 'Aanya Sharma', email = 'aanya.sharma@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student1';
UPDATE Users SET full_name = 'Aarav Kapoor', email = 'aarav.kapoor@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student2';
UPDATE Users SET full_name = 'Aditi Singh', email = 'aditi.singh@gmail.com', grade = 11, stream_id = 1 WHERE username = 'student3';

-- Insert teachers
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('physics_teacher1', 'rajesh.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajesh Kumar (Physics)', 11, 1),
('chemistry_teacher1', 'suresh.chemistry@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Suresh Patel (Chemistry)', 11, 1),
('biology_teacher1', 'anita.biology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Anita Verma (Biology)', 11, 1);

-- Insert parents
INSERT IGNORE INTO Users (username, email, password, role, full_name) VALUES
('parent_student1', 'student1.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aanya Sharma'),
('parent_student2', 'student2.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aarav Kapoor');

-- Connect students to parents
UPDATE Users s SET parent_id = (SELECT p.id FROM Users p WHERE p.username = 'parent_student1') WHERE s.username = 'student1';
UPDATE Users s SET parent_id = (SELECT p.id FROM Users p WHERE p.username = 'parent_student2') WHERE s.username = 'student2';

SELECT 'Quick setup complete!' as Status;