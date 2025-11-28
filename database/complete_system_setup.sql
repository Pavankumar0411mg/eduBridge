-- Complete eduBridge system setup with all users, subjects, and relationships
USE edubridgedb;

-- 1. Add subject_id column to Users table
ALTER TABLE Users ADD COLUMN IF NOT EXISTS subject_id INT NULL;

-- 2. Insert all teachers with proper assignments
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id, subject_id) VALUES
-- Science Stream Teachers
('physics_teacher1', 'rajesh.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajesh Kumar (Physics)', 11, 1, 1),
('physics_teacher2', 'priya.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Priya Sharma (Physics)', 12, 1, 1),
('chemistry_teacher1', 'suresh.chemistry@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Suresh Patel (Chemistry)', 11, 1, 2),
('chemistry_teacher2', 'meera.chemistry@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Meera Singh (Chemistry)', 12, 1, 2),
('biology_teacher1', 'anita.biology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Anita Verma (Biology)', 11, 1, 3),
('biology_teacher2', 'vikram.biology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Vikram Reddy (Biology)', 12, 1, 3),
('math_science_teacher1', 'ramesh.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Ramesh Gupta (Mathematics)', 11, 1, 4),
('math_science_teacher2', 'kavita.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Kavita Jain (Mathematics)', 12, 1, 4),
('cs_teacher1', 'amit.cs@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Mr. Amit Sharma (Computer Science)', 11, 1, 5),
('cs_teacher2', 'neha.cs@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Ms. Neha Kapoor (Computer Science)', 12, 1, 5),
-- Commerce Stream Teachers
('accounts_teacher1', 'deepak.accounts@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'CA Deepak Agarwal (Accountancy)', 11, 2, 6),
('accounts_teacher2', 'sunita.accounts@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'CA Sunita Mehta (Accountancy)', 12, 2, 6),
('business_teacher1', 'ravi.business@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Ravi Kumar (Business Studies)', 11, 2, 7),
('business_teacher2', 'pooja.business@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Pooja Sharma (Business Studies)', 12, 2, 7),
('economics_teacher1', 'manoj.economics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Manoj Singh (Economics)', 11, 2, 8),
('economics_teacher2', 'rekha.economics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Rekha Patel (Economics)', 12, 2, 8),
('math_commerce_teacher1', 'sanjay.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Sanjay Verma (Mathematics)', 11, 2, 9),
('math_commerce_teacher2', 'geeta.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Geeta Gupta (Mathematics)', 12, 2, 9),
('english_commerce_teacher1', 'rohit.english@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Mr. Rohit Malhotra (English)', 11, 2, 10),
('english_commerce_teacher2', 'shweta.english@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Ms. Shweta Joshi (English)', 12, 2, 10),
-- Arts Stream Teachers
('history_teacher1', 'ashok.history@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Ashok Kumar (History)', 11, 3, 11),
('history_teacher2', 'madhuri.history@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Madhuri Sharma (History)', 12, 3, 11),
('polsci_teacher1', 'vinod.polsci@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Vinod Agarwal (Political Science)', 11, 3, 12),
('polsci_teacher2', 'nisha.polsci@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Nisha Singh (Political Science)', 12, 3, 12),
('geography_teacher1', 'sunil.geography@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Sunil Patel (Geography)', 11, 3, 13),
('geography_teacher2', 'kiran.geography@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Kiran Verma (Geography)', 12, 3, 13),
('sociology_teacher1', 'prakash.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Prakash Sharma (Sociology)', 11, 3, 14),
('sociology_teacher2', 'usha.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Usha Gupta (Sociology)', 12, 3, 14),
('literature_teacher1', 'rajiv.literature@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajiv Kumar (Literature)', 11, 3, 15),
('literature_teacher2', 'seema.literature@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Seema Jain (Literature)', 12, 3, 15);

-- 3. Insert students for each stream and grade
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
-- Grade 11 Science Students
('student1', 'aanya.sharma@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aanya Sharma', 11, 1),
('student2', 'aarav.kapoor@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aarav Kapoor', 11, 1),
('student3', 'aditi.singh@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Aditi Singh', 11, 1),
('student4', 'ahan.patel@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ahan Patel', 11, 1),
('student5', 'akshara.nair@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Akshara Nair', 11, 1),
-- Grade 12 Science Students
('student16', 'gaurav.singh@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Gaurav Singh', 12, 1),
('student17', 'harsha.desai@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Harsha Desai', 12, 1),
('student18', 'ishaan.malhotra@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ishaan Malhotra', 12, 1),
('student19', 'jhanvi.shah@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Jhanvi Shah', 12, 1),
('student20', 'kaira.jain@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Kaira Jain', 12, 1),
-- Grade 11 Commerce Students
('student31', 'nishant.sharma@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Nishant Sharma', 11, 2),
('student32', 'om.desai@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Om Desai', 11, 2),
('student33', 'ojas.jain@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ojas Jain', 11, 2),
('student34', 'pari.shah@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Pari Shah', 11, 2),
('student35', 'parth.malhotra@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Parth Malhotra', 11, 2),
-- Grade 12 Commerce Students
('student46', 'sanjay.verma@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sanjay Verma', 12, 2),
('student47', 'sarah.khan@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sarah Khan', 12, 2),
('student48', 'shaan.reddy@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Shaan Reddy', 12, 2),
('student49', 'shreya.singh@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Shreya Singh', 12, 2),
('student50', 'siddharth.sharma@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Siddharth Sharma', 12, 2),
-- Grade 11 Arts Students
('student61', 'arjun.sharma@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Arjun Sharma', 11, 3),
('student62', 'rahul.kumar@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Rahul Kumar', 11, 3),
('student63', 'sneha.verma@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sneha Verma', 11, 3),
('student64', 'varun.reddy@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Varun Reddy', 11, 3),
('student65', 'priya.jain@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Priya Jain', 11, 3),
-- Grade 12 Arts Students
('student76', 'neha.sharma@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Neha Sharma', 12, 3),
('student77', 'suresh.patel@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Suresh Patel', 12, 3),
('student78', 'ritu.singh@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Ritu Singh', 12, 3),
('student79', 'manish.gupta@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Manish Gupta', 12, 3),
('student80', 'sunita.kumar@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sunita Kumar', 12, 3);

-- 4. Insert sample parents
INSERT IGNORE INTO Users (username, email, password, role, full_name) VALUES
('parent_student1', 'student1.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aanya Sharma'),
('parent_student2', 'student2.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aarav Kapoor'),
('parent_student3', 'student3.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aditi Singh');

-- 5. Connect students to parents
UPDATE Users s SET parent_id = (SELECT p.id FROM Users p WHERE p.username = 'parent_student1') WHERE s.username = 'student1';
UPDATE Users s SET parent_id = (SELECT p.id FROM Users p WHERE p.username = 'parent_student2') WHERE s.username = 'student2';
UPDATE Users s SET parent_id = (SELECT p.id FROM Users p WHERE p.username = 'parent_student3') WHERE s.username = 'student3';

-- 6. Create sample quiz by physics teacher
INSERT IGNORE INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks) VALUES
('Physics Motion Quiz', 'Quiz on motion and forces', 11, 1, 1, 
 (SELECT id FROM Users WHERE username = 'physics_teacher1'), 30, 10);

-- 7. Add sample questions
INSERT IGNORE INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES
((SELECT id FROM Quizzes WHERE title = 'Physics Motion Quiz'), 
 'What is the SI unit of velocity?', 'm/s', 'km/h', 'm/s²', 'N', 'A', 2),
((SELECT id FROM Quizzes WHERE title = 'Physics Motion Quiz'), 
 'Acceleration is the rate of change of:', 'Distance', 'Velocity', 'Speed', 'Time', 'B', 2);

-- 8. Test queries
SELECT 'Physics teacher info:' as info;
SELECT username, full_name, grade, stream_id, subject_id FROM Users WHERE username = 'physics_teacher1';

SELECT 'Students visible to physics_teacher1:' as info;
SELECT s.username, s.full_name, s.grade, st.name as stream
FROM Users s
JOIN Streams st ON s.stream_id = st.id
WHERE s.role = 'Student' 
  AND s.grade = (SELECT grade FROM Users WHERE username = 'physics_teacher1')
  AND s.stream_id = (SELECT stream_id FROM Users WHERE username = 'physics_teacher1')
ORDER BY s.full_name;

SELECT 'Quiz created by physics_teacher1:' as info;
SELECT q.title, s.name as subject, q.grade, st.name as stream
FROM Quizzes q
JOIN Subjects s ON q.subject_id = s.id
JOIN Streams st ON q.stream_id = st.id
WHERE q.created_by = (SELECT id FROM Users WHERE username = 'physics_teacher1');

SELECT 'Setup Complete! All users, relationships, and subject mappings created.' as Status;