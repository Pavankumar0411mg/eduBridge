USE edubridgedb;

-- Create Assignments table if not exists
CREATE TABLE IF NOT EXISTS Assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    grade INT NOT NULL,
    stream_id INT NOT NULL,
    subject_id INT NOT NULL,
    created_by INT NOT NULL,
    due_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(id),
    FOREIGN KEY (stream_id) REFERENCES Streams(id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id)
);

-- Create AssignmentSubmissions table if not exists
CREATE TABLE IF NOT EXISTS AssignmentSubmissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    assignment_id INT NOT NULL,
    student_id INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade_received INT DEFAULT NULL,
    feedback TEXT DEFAULT NULL,
    graded_at TIMESTAMP NULL,
    graded_by INT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Users(id),
    FOREIGN KEY (graded_by) REFERENCES Users(id),
    UNIQUE KEY unique_student_assignment (student_id, assignment_id)
);

-- Ensure uploads directory structure exists (run this manually)
-- mkdir -p uploads/assignments

-- Verify tables exist
SELECT 'Assignments table' as table_name, COUNT(*) as record_count FROM Assignments
UNION ALL
SELECT 'AssignmentSubmissions table' as table_name, COUNT(*) as record_count FROM AssignmentSubmissions;