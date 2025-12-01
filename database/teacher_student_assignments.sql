-- Create teacher-student assignment table
USE railway;

-- Create teacher-student assignments table
CREATE TABLE IF NOT EXISTS TeacherStudentAssignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    student_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES Users(id),
    FOREIGN KEY (student_id) REFERENCES Users(id),
    UNIQUE KEY unique_assignment (teacher_id, student_id)
);

-- Auto-assign students to teachers based on grade, stream, and subject
INSERT IGNORE INTO TeacherStudentAssignments (teacher_id, student_id)
SELECT DISTINCT t.id as teacher_id, s.id as student_id
FROM Users t
JOIN Users s ON s.grade = t.grade AND s.stream_id = t.stream_id AND s.role = 'Student'
WHERE t.role = 'Teacher' AND t.subject_id IS NOT NULL;