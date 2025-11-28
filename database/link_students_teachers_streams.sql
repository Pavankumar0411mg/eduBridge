-- Link all students and teachers to streams and classes
USE edubridgedb;

-- Create Teacher-Subject assignments table if not exists
CREATE TABLE IF NOT EXISTS TeacherSubjects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    grade INT NOT NULL,
    stream_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES Users(id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id),
    FOREIGN KEY (stream_id) REFERENCES Streams(id),
    UNIQUE KEY unique_teacher_subject_grade (teacher_id, subject_id, grade)
);

-- Create Student-Teacher assignments table if not exists  
CREATE TABLE IF NOT EXISTS StudentTeachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Users(id),
    FOREIGN KEY (teacher_id) REFERENCES Users(id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id),
    UNIQUE KEY unique_student_teacher_subject (student_id, teacher_id, subject_id)
);

-- Clear existing assignments
DELETE FROM TeacherSubjects;
DELETE FROM StudentTeachers;

-- Assign teachers to subjects and grades
-- Science Stream Teachers
INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 1, u.grade, 1 FROM Users u WHERE u.username LIKE '%physics%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 2, u.grade, 1 FROM Users u WHERE u.username LIKE '%chemistry%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 3, u.grade, 1 FROM Users u WHERE u.username LIKE '%biology%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 4, u.grade, 1 FROM Users u WHERE u.username LIKE '%math_science%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 5, u.grade, 1 FROM Users u WHERE u.username LIKE '%cs%' AND u.role = 'Teacher';

-- Commerce Stream Teachers
INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 6, u.grade, 2 FROM Users u WHERE u.username LIKE '%accounts%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 7, u.grade, 2 FROM Users u WHERE u.username LIKE '%business%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 8, u.grade, 2 FROM Users u WHERE u.username LIKE '%economics%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 9, u.grade, 2 FROM Users u WHERE u.username LIKE '%math_commerce%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 10, u.grade, 2 FROM Users u WHERE u.username LIKE '%english_commerce%' AND u.role = 'Teacher';

-- Arts Stream Teachers
INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 11, u.grade, 3 FROM Users u WHERE u.username LIKE '%history%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 12, u.grade, 3 FROM Users u WHERE u.username LIKE '%polsci%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 13, u.grade, 3 FROM Users u WHERE u.username LIKE '%geography%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 14, u.grade, 3 FROM Users u WHERE u.username LIKE '%sociology%' AND u.role = 'Teacher';

INSERT INTO TeacherSubjects (teacher_id, subject_id, grade, stream_id)
SELECT u.id, 15, u.grade, 3 FROM Users u WHERE u.username LIKE '%literature%' AND u.role = 'Teacher';

-- Link students to teachers based on stream and grade
-- Science Stream Students to Teachers
INSERT INTO StudentTeachers (student_id, teacher_id, subject_id)
SELECT s.id, t.teacher_id, t.subject_id
FROM Users s
JOIN TeacherSubjects t ON s.stream_id = t.stream_id AND s.grade = t.grade
WHERE s.role = 'Student' AND s.stream_id = 1;

-- Commerce Stream Students to Teachers  
INSERT INTO StudentTeachers (student_id, teacher_id, subject_id)
SELECT s.id, t.teacher_id, t.subject_id
FROM Users s
JOIN TeacherSubjects t ON s.stream_id = t.stream_id AND s.grade = t.grade
WHERE s.role = 'Student' AND s.stream_id = 2;

-- Arts Stream Students to Teachers
INSERT INTO StudentTeachers (student_id, teacher_id, subject_id)
SELECT s.id, t.teacher_id, t.subject_id
FROM Users s
JOIN TeacherSubjects t ON s.stream_id = t.stream_id AND s.grade = t.grade
WHERE s.role = 'Student' AND s.stream_id = 3;

-- Verification queries
SELECT 'Teacher-Subject Assignments:' as info;
SELECT 
    u.full_name as teacher_name,
    s.name as subject,
    st.name as stream,
    ts.grade
FROM TeacherSubjects ts
JOIN Users u ON ts.teacher_id = u.id
JOIN Subjects s ON ts.subject_id = s.id
JOIN Streams st ON ts.stream_id = st.id
ORDER BY st.name, ts.grade, s.name;

SELECT 'Student-Teacher Assignments Count:' as info;
SELECT 
    st.name as stream,
    u.grade,
    COUNT(DISTINCT stu.student_id) as students,
    COUNT(DISTINCT stu.teacher_id) as teachers,
    COUNT(*) as total_assignments
FROM StudentTeachers stu
JOIN Users s ON stu.student_id = s.id
JOIN Users t ON stu.teacher_id = t.id
JOIN Streams st ON s.stream_id = st.id
GROUP BY st.name, u.grade
ORDER BY st.name, u.grade;