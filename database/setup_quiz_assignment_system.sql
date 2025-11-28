-- Setup Quiz and Assignment System for Teacher-Student Interaction
USE edubridgedb;

-- 1. Insert sample quiz by physics_teacher1 for Grade 11 Science
INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks) VALUES
('Physics Chapter 1 Quiz', 'Motion in a Straight Line', 11, 1, 1, 
 (SELECT id FROM Users WHERE username = 'physics_teacher1'), 30, 20);

-- 2. Insert sample questions for the quiz
INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES
((SELECT id FROM Quizzes WHERE title = 'Physics Chapter 1 Quiz'), 
 'What is the SI unit of velocity?', 'm/s', 'km/h', 'm/s²', 'N', 'A', 2),
((SELECT id FROM Quizzes WHERE title = 'Physics Chapter 1 Quiz'), 
 'Acceleration is the rate of change of:', 'Distance', 'Velocity', 'Speed', 'Time', 'B', 2);

-- 3. Insert sample assignment by physics_teacher1
INSERT INTO Assignments (title, description, grade, stream_id, subject_id, created_by, due_date, total_marks) VALUES
('Physics Problem Set 1', 'Solve problems on motion equations', 11, 1, 1,
 (SELECT id FROM Users WHERE username = 'physics_teacher1'), 
 DATE_ADD(NOW(), INTERVAL 7 DAY), 50);

-- 4. Query to show quizzes visible to Grade 11 Science students
SELECT 'Quizzes visible to Grade 11 Science students:' as Info;
SELECT q.id, q.title, q.description, u.full_name as created_by, s.name as subject
FROM Quizzes q
JOIN Users u ON q.created_by = u.id
JOIN Subjects s ON q.subject_id = s.id
WHERE q.grade = 11 AND q.stream_id = 1;

-- 5. Query to show assignments visible to Grade 11 Science students
SELECT 'Assignments visible to Grade 11 Science students:' as Info;
SELECT a.id, a.title, a.description, u.full_name as created_by, s.name as subject
FROM Assignments a
JOIN Users u ON a.created_by = u.id
JOIN Subjects s ON a.subject_id = s.id
WHERE a.grade = 11 AND a.stream_id = 1;

-- 6. Sample student quiz attempts (students taking the quiz)
INSERT INTO ProgressReports (student_id, quiz_id, score, total_marks) VALUES
((SELECT id FROM Users WHERE username = 'student1'), 
 (SELECT id FROM Quizzes WHERE title = 'Physics Chapter 1 Quiz'), 18, 20),
((SELECT id FROM Users WHERE username = 'student2'), 
 (SELECT id FROM Quizzes WHERE title = 'Physics Chapter 1 Quiz'), 16, 20),
((SELECT id FROM Users WHERE username = 'student3'), 
 (SELECT id FROM Quizzes WHERE title = 'Physics Chapter 1 Quiz'), 19, 20);

-- 7. Sample assignment submissions
INSERT INTO AssignmentSubmissions (assignment_id, student_id, submission_text, score, total_marks) VALUES
((SELECT id FROM Assignments WHERE title = 'Physics Problem Set 1'),
 (SELECT id FROM Users WHERE username = 'student1'), 'Solution submitted', 45, 50),
((SELECT id FROM Assignments WHERE title = 'Physics Problem Set 1'),
 (SELECT id FROM Users WHERE username = 'student2'), 'Solution submitted', 42, 50),
((SELECT id FROM Assignments WHERE title = 'Physics Problem Set 1'),
 (SELECT id FROM Users WHERE username = 'student3'), 'Solution submitted', 48, 50);

-- 8. Query for teacher to see student performance (Quiz Results)
SELECT 'Quiz Performance Report for physics_teacher1:' as Info;
SELECT 
    u.full_name as student_name,
    q.title as quiz_title,
    pr.score,
    pr.total_marks,
    ROUND((pr.score / pr.total_marks) * 100, 2) as percentage
FROM ProgressReports pr
JOIN Users u ON pr.student_id = u.id
JOIN Quizzes q ON pr.quiz_id = q.id
WHERE q.created_by = (SELECT id FROM Users WHERE username = 'physics_teacher1')
ORDER BY pr.score DESC;

-- 9. Query for teacher to see assignment performance
SELECT 'Assignment Performance Report for physics_teacher1:' as Info;
SELECT 
    u.full_name as student_name,
    a.title as assignment_title,
    asub.score,
    asub.total_marks,
    ROUND((asub.score / asub.total_marks) * 100, 2) as percentage
FROM AssignmentSubmissions asub
JOIN Users u ON asub.student_id = u.id
JOIN Assignments a ON asub.assignment_id = a.id
WHERE a.created_by = (SELECT id FROM Users WHERE username = 'physics_teacher1')
ORDER BY asub.score DESC;

-- 10. Average score calculation for teacher dashboard
SELECT 'Average Performance Summary:' as Info;
SELECT 
    'Quiz Average' as type,
    ROUND(AVG((pr.score / pr.total_marks) * 100), 2) as average_percentage
FROM ProgressReports pr
JOIN Quizzes q ON pr.quiz_id = q.id
WHERE q.created_by = (SELECT id FROM Users WHERE username = 'physics_teacher1')
UNION ALL
SELECT 
    'Assignment Average' as type,
    ROUND(AVG((asub.score / asub.total_marks) * 100), 2) as average_percentage
FROM AssignmentSubmissions asub
JOIN Assignments a ON asub.assignment_id = a.id
WHERE a.created_by = (SELECT id FROM Users WHERE username = 'physics_teacher1');

SELECT 'Setup Complete! physics_teacher1 can now create quizzes/assignments for Grade 11 Science students.' as Status;