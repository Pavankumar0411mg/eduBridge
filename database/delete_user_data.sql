-- Delete All Student, Teacher, and Parent Data
-- This script removes all user data except Admin users while preserving system structure

USE eduBridgeDB;

-- Disable foreign key checks temporarily for easier deletion
SET FOREIGN_KEY_CHECKS = 0;

-- Delete discussion replies by students, teachers, and parents
DELETE FROM DiscussionReplies 
WHERE author_id IN (
    SELECT id FROM Users WHERE role IN ('Student', 'Teacher', 'Parent')
);

-- Delete discussions created by students, teachers, and parents
DELETE FROM Discussions 
WHERE author_id IN (
    SELECT id FROM Users WHERE role IN ('Student', 'Teacher', 'Parent')
);

-- Delete progress reports for students
DELETE FROM ProgressReports 
WHERE student_id IN (
    SELECT id FROM Users WHERE role = 'Student'
);

-- Delete quizzes created by teachers
DELETE FROM Quizzes 
WHERE created_by IN (
    SELECT id FROM Users WHERE role = 'Teacher'
);

-- Delete study materials uploaded by teachers
DELETE FROM StudyMaterials 
WHERE uploaded_by IN (
    SELECT id FROM Users WHERE role = 'Teacher'
);

-- Delete teacher-subject assignments
DELETE FROM TeacherSubjects 
WHERE teacher_id IN (
    SELECT id FROM Users WHERE role = 'Teacher'
);

-- Delete notifications targeted to specific users (students, teachers, parents)
DELETE FROM Notifications 
WHERE target_user_id IN (
    SELECT id FROM Users WHERE role IN ('Student', 'Teacher', 'Parent')
);

-- Finally, delete all students, teachers, and parents
DELETE FROM Users WHERE role IN ('Student', 'Teacher', 'Parent');

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verify deletion
SELECT 'Remaining Users:' as Status;
SELECT role, COUNT(*) as count FROM Users GROUP BY role;

SELECT 'Remaining Study Materials:' as Status;
SELECT COUNT(*) as count FROM StudyMaterials;

SELECT 'Remaining Quizzes:' as Status;
SELECT COUNT(*) as count FROM Quizzes;

SELECT 'Remaining Progress Reports:' as Status;
SELECT COUNT(*) as count FROM ProgressReports;

SELECT 'Remaining Teacher Assignments:' as Status;
SELECT COUNT(*) as count FROM TeacherSubjects;

SELECT 'Remaining Discussions:' as Status;
SELECT COUNT(*) as count FROM Discussions;

SELECT 'Remaining Discussion Replies:' as Status;
SELECT COUNT(*) as count FROM DiscussionReplies;