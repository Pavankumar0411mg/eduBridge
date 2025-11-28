const mysql = require('mysql2/promise');

async function cleanup() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'eduBridgeDB'
    });

    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    
    await connection.execute('DELETE FROM DiscussionReplies WHERE author_id IN (SELECT id FROM Users WHERE role IN ("Student", "Teacher", "Parent"))');
    await connection.execute('DELETE FROM Discussions WHERE author_id IN (SELECT id FROM Users WHERE role IN ("Student", "Teacher", "Parent"))');
    await connection.execute('DELETE FROM ProgressReports WHERE student_id IN (SELECT id FROM Users WHERE role = "Student")');
    await connection.execute('DELETE FROM Quizzes WHERE created_by IN (SELECT id FROM Users WHERE role = "Teacher")');
    await connection.execute('DELETE FROM StudyMaterials WHERE uploaded_by IN (SELECT id FROM Users WHERE role = "Teacher")');
    await connection.execute('DELETE FROM TeacherSubjects WHERE teacher_id IN (SELECT id FROM Users WHERE role = "Teacher")');
    await connection.execute('DELETE FROM Notifications WHERE target_user_id IN (SELECT id FROM Users WHERE role IN ("Student", "Teacher", "Parent"))');
    await connection.execute('DELETE FROM Users WHERE role IN ("Student", "Teacher", "Parent")');
    
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
    
    const [rows] = await connection.execute('SELECT role, COUNT(*) as count FROM Users GROUP BY role');
    console.log('Remaining users:', rows);
    
    await connection.end();
    console.log('Cleanup completed');
}

cleanup().catch(console.error);