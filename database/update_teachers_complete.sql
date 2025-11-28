-- Complete teacher data update with subject assignments
USE edubridgedb;

-- Update existing teachers with correct details
UPDATE Users SET full_name = 'CA Deepak Agarwal (Accountancy)', email = 'deepak.accounts@gmail.com', grade = 11 WHERE username = 'accounts_teacher1';
UPDATE Users SET full_name = 'CA Sunita Mehta (Accountancy)', email = 'sunita.accounts@gmail.com', grade = 12 WHERE username = 'accounts_teacher2';
UPDATE Users SET full_name = 'Dr. Anita Verma (Biology)', email = 'anita.biology@gmail.com', grade = 11 WHERE username = 'biology_teacher1';
UPDATE Users SET full_name = 'Dr. Ashok Kumar (History)', email = 'ashok.history@gmail.com', grade = 11 WHERE username = 'history_teacher1';
UPDATEUPDATE Users SET full_name = 'Dr. Geeta Gupta (Mathematics)', email = 'geeta.math@gmail.com', grade = 12 WHERE username = 'math_commerce_teacher2';
UPDATE Users SET full_name = 'Dr. Kavita Jain (Mathematics)', email = 'kavita.math@gmail.com', grade = 12 WHERE username = 'math_science_teacher2';
UPDATE Users SET full_name = 'Dr. Manoj Singh (Economics)', email = 'manoj.economics@gmail.com', grade = 11 WHERE username = 'economics_teacher1';
UPDATE Users SET full_name = 'Dr. Meera Singh (Chemistry)', email = 'meera.chemistry@gmail.com', grade = 12 WHERE username = 'chemistry_teacher2';
UPDATE Users SET full_name = 'Dr. Pooja Sharma (Business Studies)', email = 'pooja.business@gmail.com', grade = 12 WHERE username = 'business_teacher2';
UPDATE Users SET full_name = 'Dr. Prakash Sharma (Sociology)', email = 'prakash.sociology@gmail.com', grade = 11 WHERE username = 'sociology_teacher1';
UPDATE Users SET full_name = 'Dr. Priya Sharma (Physics)', email = 'priya.physics@gmail.com', grade = 12 WHERE username = 'physics_teacher2';
UPDATE Users SET full_name = 'Dr. Rajesh Kumar (Physics)', email = 'rajesh.physics@gmail.com', grade = 11 WHERE username = 'physics_teacher1';
UPDATE Users SET full_name = 'Dr. Rajiv Kumar (Literature)', email = 'rajiv.literature@gmail.com', grade = 11 WHERE username = 'literature_teacher1';
UPDATE Users SET full_name = 'Dr. Sunil Patel (Geography)', email = 'sunil.geography@gmail.com', grade = 11 WHERE username = 'geography_teacher1';
UPDATE Users SET full_name = 'Dr. Vinod Agarwal (Political Science)', email = 'vinod.polsci@gmail.com', grade = 11 WHERE username = 'polsci_teacher1';
UPDATE Users SET full_name = 'Mr. Amit Sharma (Computer Science)', email = 'amit.cs@gmail.com', grade = 11 WHERE username = 'cs_teacher1';
UPDATE Users SET full_name = 'Mr. Rohit Malhotra (English)', email = 'rohit.english@gmail.com', grade = 11 WHERE username = 'english_commerce_teacher1';
UPDATE Users SET full_name = 'Ms. Neha Kapoor (Computer Science)', email = 'neha.cs@gmail.com', grade = 12 WHERE username = 'cs_teacher2';
UPDATE Users SET full_name = 'Ms. Shweta Joshi (English)', email = 'shweta.english@gmail.com', grade = 12 WHERE username = 'english_commerce_teacher2';
UPDATE Users SET full_name = 'Prof. Kiran Verma (Geography)', email = 'kiran.geography@gmail.com', grade = 12 WHERE username = 'geography_teacher2';
UPDATE Users SET full_name = 'Prof. Madhuri Sharma (History)', email = 'madhuri.history@gmail.com', grade = 12 WHERE username = 'history_teacher2';
UPDATE Users SET full_name = 'Prof. Nisha Singh (Political Science)', email = 'nisha.polsci@gmail.com', grade = 12 WHERE username = 'polsci_teacher2';
UPDATE Users SET full_name = 'Prof. Ramesh Gupta (Mathematics)', email = 'ramesh.math@gmail.com', grade = 11 WHERE username = 'math_science_teacher1';
UPDATE Users SET full_name = 'Prof. Ravi Kumar (Business Studies)', email = 'ravi.business@gmail.com', grade = 11 WHERE username = 'business_teacher1';
UPDATE Users SET full_name = 'Prof. Rekha Patel (Economics)', email = 'rekha.economics@gmail.com', grade = 12 WHERE username = 'economics_teacher2';
UPDATE Users SET full_name = 'Prof. Sanjay Verma (Mathematics)', email = 'sanjay.math@gmail.com', grade = 11 WHERE username = 'math_commerce_teacher1';
UPDATE Users SET full_name = 'Prof. Seema Jain (Literature)', email = 'seema.literature@gmail.com', grade = 12 WHERE username = 'literature_teacher2';
UPDATE Users SET full_name = 'Prof. Suresh Patel (Chemistry)', email = 'suresh.chemistry@gmail.com', grade = 11 WHERE username = 'chemistry_teacher1';
UPDATE Users SET full_name = 'Prof. Usha Gupta (Sociology)', email = 'usha.sociology@gmail.com', grade = 12 WHERE username = 'sociology_teacher2';
UPDATE Users SET full_name = 'Prof. Vikram Reddy (Biology)', email = 'vikram.biology@gmail.com', grade = 12 WHERE username = 'biology_teacher2';

-- Insert missing teachers if they don't exist
INSERT IGNORE INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES
('accounts_teacher1', 'deepak.accounts@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'CA Deepak Agarwal (Accountancy)', 11, 2),
('accounts_teacher2', 'sunita.accounts@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'CA Sunita Mehta (Accountancy)', 12, 2),
('biology_teacher1', 'anita.biology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Anita Verma (Biology)', 11, 1),
('biology_teacher2', 'vikram.biology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Vikram Reddy (Biology)', 12, 1),
('chemistry_teacher1', 'suresh.chemistry@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Suresh Patel (Chemistry)', 11, 1),
('chemistry_teacher2', 'meera.chemistry@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Meera Singh (Chemistry)', 12, 1),
('physics_teacher1', 'rajesh.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajesh Kumar (Physics)', 11, 1),
('physics_teacher2', 'priya.physics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Priya Sharma (Physics)', 12, 1),
('math_science_teacher1', 'ramesh.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Ramesh Gupta (Mathematics)', 11, 1),
('math_science_teacher2', 'kavita.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Kavita Jain (Mathematics)', 12, 1),
('cs_teacher1', 'amit.cs@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Mr. Amit Sharma (Computer Science)', 11, 1),
('cs_teacher2', 'neha.cs@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Ms. Neha Kapoor (Computer Science)', 12, 1),
('business_teacher1', 'ravi.business@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Ravi Kumar (Business Studies)', 11, 2),
('business_teacher2', 'pooja.business@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Pooja Sharma (Business Studies)', 12, 2),
('economics_teacher1', 'manoj.economics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Manoj Singh (Economics)', 11, 2),
('economics_teacher2', 'rekha.economics@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Rekha Patel (Economics)', 12, 2),
('math_commerce_teacher1', 'sanjay.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Sanjay Verma (Mathematics)', 11, 2),
('math_commerce_teacher2', 'geeta.math@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Geeta Gupta (Mathematics)', 12, 2),
('english_commerce_teacher1', 'rohit.english@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Mr. Rohit Malhotra (English)', 11, 2),
('english_commerce_teacher2', 'shweta.english@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Ms. Shweta Joshi (English)', 12, 2),
('history_teacher1', 'ashok.history@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Ashok Kumar (History)', 11, 3),
('history_teacher2', 'madhuri.history@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Madhuri Sharma (History)', 12, 3),
('polsci_teacher1', 'vinod.polsci@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Vinod Agarwal (Political Science)', 11, 3),
('polsci_teacher2', 'nisha.polsci@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Nisha Singh (Political Science)', 12, 3),
('geography_teacher1', 'sunil.geography@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Sunil Patel (Geography)', 11, 3),
('geography_teacher2', 'kiran.geography@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Kiran Verma (Geography)', 12, 3),
('sociology_teacher1', 'prakash.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Prakash Sharma (Sociology)', 11, 3),
('sociology_teacher2', 'usha.sociology@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Usha Gupta (Sociology)', 12, 3),
('literature_teacher1', 'rajiv.literature@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Dr. Rajiv Kumar (Literature)', 11, 3),
('literature_teacher2', 'seema.literature@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Teacher', 'Prof. Seema Jain (Literature)', 12, 3);