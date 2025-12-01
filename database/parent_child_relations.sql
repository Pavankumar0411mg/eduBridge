-- Create parent-child relationships for testing
USE edubridgedb;

-- Create StudentParents table if not exists
CREATE TABLE IF NOT EXISTS StudentParents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    parent_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_parent (student_id, parent_id)
);

-- Insert parent-child relationships (first 10 students with their parents)
INSERT IGNORE INTO StudentParents (student_id, parent_id) 
SELECT 
    s.id as student_id,
    p.id as parent_id
FROM Users s
JOIN Users p ON p.username = CONCAT('parent_', s.username)
WHERE s.role = 'Student' 
AND p.role = 'Parent'
AND s.id <= 10;

-- Insert some sample quiz results for testing
INSERT IGNORE INTO QuizResults (user_id, quiz_id, score, total_questions, completed_at) VALUES
(2, 1, 8, 10, '2024-01-15 10:30:00'),
(2, 2, 7, 10, '2024-01-16 14:20:00'),
(2, 3, 9, 10, '2024-01-17 11:45:00'),
(3, 1, 6, 10, '2024-01-15 15:30:00'),
(3, 2, 8, 10, '2024-01-16 16:20:00'),
(4, 1, 9, 10, '2024-01-15 09:30:00'),
(4, 3, 7, 10, '2024-01-17 13:45:00');

SELECT 'Parent-child relationships and sample quiz results created successfully' as message;