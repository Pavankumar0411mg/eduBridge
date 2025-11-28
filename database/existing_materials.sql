USE eduBridgeDB;

-- Insert existing uploaded files into StudyMaterials table
INSERT INTO StudyMaterials (title, type, file_path, uploaded_by, grade, stream_id, subject_id, language) VALUES
-- Physics materials (subject_id = 1, stream_id = 1 for Science)
('Physics Chapter 1', 'PDF', 'uploads/1758898688022-physics-chapter-1.pdf', 1, 11, 1, 1, 'English'),
('Physics Chapter 2', 'PDF', 'uploads/1758898720526-chapter-2-in-english.pdf', 1, 11, 1, 1, 'English'),
('Physics Chapter 3', 'PDF', 'uploads/1758898756171-chapter-3-in-english.pdf', 1, 11, 1, 1, 'English'),
('Physics Chapter 4', 'PDF', 'uploads/1758898792338-chapter-4-in-english.pdf', 1, 11, 1, 1, 'English'),

-- Chemistry materials (subject_id = 2, stream_id = 1 for Science)
('NCERT Class 11 Chemistry Chapter 1', 'PDF', 'uploads/1758899208885-ncert-class-11-chemistry-chapter-1-in-english.pdf', 1, 11, 1, 2, 'English'),
('NCERT Class 11 Chemistry Chapter 2', 'PDF', 'uploads/1758899274648-ncert-class-11-chemistry-chapter-2-in-english.pdf', 1, 11, 1, 2, 'English'),

-- Mathematics materials (subject_id = 4, stream_id = 1 for Science)
('Sets', 'PDF', 'uploads/1758899425096-sets.pdf', 1, 11, 1, 4, 'English'),
('Relations and Functions', 'PDF', 'uploads/1758899462969-relations-and-functions.pdf', 1, 11, 1, 4, 'English'),

-- Biology materials (subject_id = 3, stream_id = 1 for Science)
('NCERT Class 11 Biology Chapter 1', 'PDF', 'uploads/1758899633346-ncert-class-11-biology-chapter-1-in-english.pdf', 1, 11, 1, 3, 'English'),
('NCERT Class 11 Biology Chapter 2 (Version 1)', 'PDF', 'uploads/1758899672980-ncert-class-11-biology-chapter-2-in-english.pdf', 1, 11, 1, 3, 'English'),
('NCERT Class 11 Biology Chapter 2 (Version 2)', 'PDF', 'uploads/1758899945629-ncert-class-11-biology-chapter-2-in-english.pdf', 1, 11, 1, 3, 'English'),
('NCERT Class 11 Biology Chapter 2 (Latest)', 'PDF', 'uploads/1758939467065-ncert-class-11-biology-chapter-2-in-english.pdf', 1, 11, 1, 3, 'English');