USE eduBridgeDB;

-- Create TeacherSubjects table if it doesn't exist
CREATE TABLE IF NOT EXISTS TeacherSubjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    grade INT NOT NULL,
    stream_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (stream_id) REFERENCES Streams(id) ON DELETE CASCADE,
    UNIQUE KEY unique_teacher_subject (teacher_id, subject_id, grade)
);

-- Insert sample teacher-subject mappings
-- Assuming we have some teachers in the system, let's create basic mappings
INSERT IGNORE INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id) VALUES
-- Physics teacher for grade 11 science (subject_id=1, stream_id=1)
(2, 1, 11, 1),
-- Chemistry teacher for grade 11 science (subject_id=2, stream_id=1)  
(3, 2, 11, 1),
-- Math teacher for grade 11 science (subject_id=4, stream_id=1)
(4, 4, 11, 1);