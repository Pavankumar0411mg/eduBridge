-- Complete teacher and student setup
USE edubridgedb;

-- Insert all teachers if they don't exist
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
-- Science Stream Teachers
('physics_teacher1', 'rajesh.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajesh Kumar (Physics)', NULL, 1),
('physics_teacher2', 'priya.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Priya Sharma (Physics)', NULL, 1),
('chemistry_teacher1', 'suresh.chemistry@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Suresh Patel (Chemistry)', NULL, 1),
('chemistry_teacher2', 'meera.chemistry@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Meera Singh (Chemistry)', NULL, 1),
('biology_teacher1', 'anita.biology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Anita Verma (Biology)', NULL, 1),
('biology_teacher2', 'vikram.biology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Vikram Reddy (Biology)', NULL, 1),
('math_science_teacher1', 'ramesh.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Ramesh Gupta (Mathematics)', NULL, 1),
('math_science_teacher2', 'kavita.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Kavita Jain (Mathematics)', NULL, 1),
('cs_teacher1', 'amit.cs@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Mr. Amit Sharma (Computer Science)', NULL, 1),
('cs_teacher2', 'neha.cs@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Ms. Neha Kapoor (Computer Science)', NULL, 1),
-- Commerce Stream Teachers
('business_teacher1', 'ravi.business@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Ravi Kumar (Business Studies)', NULL, 2),
('business_teacher2', 'pooja.business@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Pooja Sharma (Business Studies)', NULL, 2),
('economics_teacher1', 'manoj.economics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Manoj Singh (Economics)', NULL, 2),
('economics_teacher2', 'rekha.economics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Rekha Patel (Economics)', NULL, 2),
('accounts_teacher1', 'deepak.accounts@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'CA Deepak Agarwal (Accountancy)', NULL, 2),
('accounts_teacher2', 'sunita.accounts@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'CA Sunita Mehta (Accountancy)', NULL, 2),
('math_commerce_teacher1', 'sanjay.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Sanjay Verma (Mathematics)', NULL, 2),
('math_commerce_teacher2', 'geeta.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Geeta Gupta (Mathematics)', NULL, 2),
('english_commerce_teacher1', 'rohit.english@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Mr. Rohit Malhotra (English)', NULL, 2),
('english_commerce_teacher2', 'shweta.english@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Ms. Shweta Joshi (English)', NULL, 2),
-- Arts Stream Teachers
('history_teacher1', 'ashok.history@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Ashok Kumar (History)', NULL, 3),
('history_teacher2', 'madhuri.history@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Madhuri Sharma (History)', NULL, 3),
('polsci_teacher1', 'vinod.polsci@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Vinod Agarwal (Political Science)', NULL, 3),
('polsci_teacher2', 'nisha.polsci@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Nisha Singh (Political Science)', NULL, 3),
('geography_teacher1', 'sunil.geography@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Sunil Patel (Geography)', NULL, 3),
('geography_teacher2', 'kiran.geography@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Kiran Verma (Geography)', NULL, 3),
('sociology_teacher1', 'prakash.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Prakash Sharma (Sociology)', NULL, 3),
('sociology_teacher2', 'usha.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Usha Gupta (Sociology)', NULL, 3),
('literature_teacher1', 'rajiv.literature@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajiv Kumar (Literature)', NULL, 3),
('literature_teacher2', 'seema.literature@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Seema Jain (Literature)', NULL, 3);

-- Set all teacher passwords to 'password'
UPDATE Users SET password = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE role = 'Teacher';

-- Fix all student assignments
-- Science Stream Grade 11
UPDATE Users SET grade = 11, stream_id = 1 WHERE username IN ('newstudent123', 'student1', 'student2', 'student3', 'student4', 'student5', 'student6', 'student7', 'student8', 'student9', 'student10', 'student11', 'student12', 'student13', 'student14', 'student15');
-- Science Stream Grade 12
UPDATE Users SET grade = 12, stream_id = 1 WHERE username IN ('student16', 'student17', 'student18', 'student19', 'student20', 'student21', 'student22', 'student23', 'student24', 'student25', 'student26', 'student27', 'student28', 'student29', 'student30', 'student63');
-- Commerce Stream Grade 11
UPDATE Users SET grade = 11, stream_id = 2 WHERE username IN ('student31', 'student32', 'student33', 'student34', 'student35', 'student36', 'student37', 'student38', 'student39', 'student40', 'student41', 'student42', 'student43', 'student44', 'student45');
-- Commerce Stream Grade 12
UPDATE Users SET grade = 12, stream_id = 2 WHERE username IN ('student46', 'student47', 'student48', 'student49', 'student50', 'student51', 'student52', 'student53', 'student54', 'student55', 'student56', 'student57', 'student58', 'student59', 'student60', 'student62');
-- Arts Stream Grade 11
UPDATE Users SET grade = 11, stream_id = 3 WHERE username IN ('student61', 'student64', 'student65', 'student66', 'student67', 'student68', 'student69', 'student70', 'student71', 'student72', 'student73', 'student74', 'student75');
-- Arts Stream Grade 12
UPDATE Users SET grade = 12, stream_id = 3 WHERE username IN ('student76', 'student77', 'student78', 'student79', 'student80', 'student81', 'student82', 'student83', 'student84', 'student85', 'student86', 'student87', 'student88', 'student89', 'student90');

-- Verification queries
SELECT 'Arts Grade 11 Students:' as Info;
SELECT username, full_name, grade, stream_id FROM Users WHERE grade = 11 AND stream_id = 3 AND role = 'Student';
SELECT 'Sociology Teacher:' as Info;
SELECT username, full_name, stream_id FROM Users WHERE username = 'sociology_teacher1';
SELECT 'All Arts Students:' as Info;
SELECT username, full_name, grade, stream_id, role FROM Users WHERE stream_id = 3;