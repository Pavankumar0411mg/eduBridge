USE eduBridgeDB;

-- Insert sample study materials
INSERT INTO StudyMaterials (title, type, file_path, uploaded_by, grade, stream_id, subject_id, language) VALUES
-- Science Stream Materials
('Physics Chapter 1 - Motion', 'PDF', 'uploads/physics-chapter-1.pdf', 1, 11, 1, 1, 'English'),
('Chemistry Basics', 'PDF', 'uploads/chemistry-basics.pdf', 1, 11, 1, 2, 'English'),
('Biology Cell Structure', 'PDF', 'uploads/biology-cell-structure.pdf', 1, 11, 1, 3, 'English'),
('Mathematics Sets and Functions', 'PDF', 'uploads/math-sets.pdf', 1, 11, 1, 4, 'English'),
('Computer Science Introduction', 'PDF', 'uploads/cs-intro.pdf', 1, 11, 1, 5, 'English'),

-- Grade 12 Science Materials
('Physics Electricity', 'PDF', 'uploads/physics-electricity.pdf', 1, 12, 1, 1, 'English'),
('Organic Chemistry', 'PDF', 'uploads/organic-chemistry.pdf', 1, 12, 1, 2, 'English'),
('Human Physiology', 'PDF', 'uploads/human-physiology.pdf', 1, 12, 1, 3, 'English'),
('Calculus Basics', 'PDF', 'uploads/calculus-basics.pdf', 1, 12, 1, 4, 'English'),
('Data Structures', 'PDF', 'uploads/data-structures.pdf', 1, 12, 1, 5, 'English'),

-- Commerce Stream Materials
('Accounting Principles', 'PDF', 'uploads/accounting-principles.pdf', 1, 11, 2, 6, 'English'),
('Business Studies Basics', 'PDF', 'uploads/business-basics.pdf', 1, 11, 2, 7, 'English'),
('Economics Introduction', 'PDF', 'uploads/economics-intro.pdf', 1, 11, 2, 8, 'English'),
('Statistics for Commerce', 'PDF', 'uploads/statistics-commerce.pdf', 1, 11, 2, 9, 'English'),
('Business English', 'PDF', 'uploads/business-english.pdf', 1, 11, 2, 10, 'English'),

-- Arts Stream Materials
('Indian History', 'PDF', 'uploads/indian-history.pdf', 1, 11, 3, 11, 'English'),
('Political Science Basics', 'PDF', 'uploads/political-science.pdf', 1, 11, 3, 12, 'English'),
('Geography Physical Features', 'PDF', 'uploads/geography-physical.pdf', 1, 11, 3, 13, 'English'),
('Sociology Introduction', 'PDF', 'uploads/sociology-intro.pdf', 1, 11, 3, 14, 'English'),
('English Literature', 'PDF', 'uploads/english-literature.pdf', 1, 11, 3, 15, 'English');