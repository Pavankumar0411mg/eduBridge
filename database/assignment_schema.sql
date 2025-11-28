-- Assignment system schema
USE edubridgedb;

-- Assignments table
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

-- Assignment submissions table
CREATE TABLE IF NOT EXISTS AssignmentSubmissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    assignment_id INT NOT NULL,
    student_id INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade_received INT DEFAULT NULL,
    feedback TEXT DEFAULT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Users(id),
    UNIQUE KEY unique_student_assignment (student_id, assignment_id)
);