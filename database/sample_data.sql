-- Sample data for eduBridge testing
USE eduBridgeDB;

-- Sample Teachers
INSERT INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('teacher1', 'teacher1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajesh Kumar', NULL, 1),
('teacher2', 'teacher2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Priya Sharma', NULL, 2);

-- Sample Students
INSERT INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('student1', 'student1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Amit Patel', 11, 1),
('student2', 'student2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Sneha Gupta', 12, 2),
('student3', 'student3@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Student', 'Rahul Singh', 11, 3);

-- Sample Parents
INSERT INTO Users (username, email, password, role, full_name) VALUES
('parent1', 'parent1@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Suresh Patel'),
('parent2', 'parent2@edubridge.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Meera Gupta');

-- Update students with parent relationships
UPDATE Users SET parent_id = (SELECT id FROM Users WHERE username = 'parent1' LIMIT 1) WHERE username = 'student1';
UPDATE Users SET parent_id = (SELECT id FROM Users WHERE username = 'parent2' LIMIT 1) WHERE username = 'student2';

-- Sample Study Materials
INSERT INTO StudyMaterials (title, type, file_path, uploaded_by, grade, stream_id, subject_id, language) VALUES
('Physics Chapter 1 - Motion', 'PDF', 'uploads/physics-motion.pdf', 2, 11, 1, 1, 'English'),
('Chemistry Organic Compounds', 'Video', 'uploads/chemistry-organic.mp4', 2, 12, 1, 2, 'English'),
('Biology Cell Structure Notes', 'Notes', 'uploads/biology-cells.pdf', 2, 11, 1, 3, 'English'),
('Mathematics Calculus Basics', 'PDF', 'uploads/math-calculus.pdf', 2, 12, 1, 4, 'English'),
('Accountancy Balance Sheet', 'PDF', 'uploads/accounts-balance.pdf', 3, 11, 2, 6, 'English'),
('Business Studies Marketing', 'Video', 'uploads/business-marketing.mp4', 3, 12, 2, 7, 'English');

-- Sample Quizzes
INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks) VALUES
('Physics Motion Test', 'Basic test on motion and kinematics', 11, 1, 1, 2, 30, 10),
('Chemistry Periodic Table', 'Test on periodic table and elements', 11, 1, 2, 2, 25, 8),
('Accountancy Basics', 'Fundamental accounting principles', 11, 2, 6, 3, 20, 6),
('History Ancient India', 'Test on ancient Indian civilization', 11, 3, 11, 2, 30, 10);

-- Sample Questions for Physics Quiz
INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES
(1, 'What is the SI unit of velocity?', 'm/s', 'km/h', 'm/s²', 'N', 'A', 2),
(1, 'Which equation represents uniform acceleration?', 'v = u', 'v = u + at', 'v = u - at', 's = ut', 'B', 2),
(1, 'What is acceleration due to gravity?', '9.8 m/s', '9.8 m/s²', '9.8 km/h', '9.8 N', 'B', 3),
(1, 'Distance is a _____ quantity', 'Vector', 'Scalar', 'Tensor', 'Complex', 'B', 1),
(1, 'Displacement can be _____ than distance', 'Greater', 'Less or equal', 'Always equal', 'Never equal', 'B', 2),

-- Chemistry Quiz Questions
(2, 'What is the atomic number of Carbon?', '4', '6', '8', '12', 'B', 2),
(2, 'Which gas is most abundant in atmosphere?', 'Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen', 'C', 2),
(2, 'What is the chemical formula of water?', 'H2O', 'CO2', 'NaCl', 'CH4', 'A', 2),
(2, 'Noble gases are found in which group?', '17', '18', '1', '2', 'B', 2),

-- Accountancy Quiz Questions
(3, 'What is the accounting equation?', 'Assets = Liabilities', 'Assets = Capital', 'Assets = Liabilities + Capital', 'Capital = Assets', 'C', 2),
(3, 'Which side shows what business owns?', 'Credit', 'Debit', 'Both', 'None', 'B', 2),
(3, 'Cash is which type of asset?', 'Fixed', 'Current', 'Intangible', 'Fictitious', 'B', 2),

-- History Quiz Questions
(4, 'Who founded the Mauryan Empire?', 'Ashoka', 'Chandragupta Maurya', 'Bindusara', 'Chanakya', 'B', 2),
(4, 'Harappan civilization belonged to which age?', 'Stone Age', 'Bronze Age', 'Iron Age', 'Copper Age', 'B', 3),
(4, 'Which river was central to Indus Valley?', 'Ganges', 'Yamuna', 'Indus', 'Saraswati', 'C', 2),
(4, 'Capital of Magadha was?', 'Pataliputra', 'Ujjain', 'Taxila', 'Mathura', 'A', 2),
(4, 'Vedic period is known for?', 'Trade', 'Agriculture', 'Literature', 'All of these', 'D', 1);

-- Sample Notifications
INSERT INTO Notifications (title, message, target_role, created_at) VALUES
('Welcome to eduBridge', 'Welcome to the eduBridge platform! Start exploring study materials and take quizzes to enhance your learning.', 'Student', NOW()),
('New Study Materials Added', 'New physics and chemistry materials have been uploaded for Grade 11 students.', 'Student', NOW()),
('System Maintenance', 'Scheduled maintenance on Sunday 2 AM - 4 AM. Platform will be temporarily unavailable.', 'All', NOW());