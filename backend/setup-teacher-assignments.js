const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupTeacherAssignments() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'railway',
            port: process.env.DB_PORT || 3306
        });

        console.log('Connected to database');

        // Execute the assignment setup SQL
        const sqlFile = path.join(__dirname, '..', 'database', 'teacher_student_assignments.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
        
        for (const statement of statements) {
            if (statement.trim() && !statement.trim().startsWith('--')) {
                await connection.execute(statement);
                console.log('Executed statement successfully');
            }
        }

        // Verify assignments
        const [assignments] = await connection.execute(`
            SELECT t.username as teacher, t.full_name as teacher_name, 
                   s.username as student, s.full_name as student_name,
                   s.grade, st.name as stream
            FROM TeacherStudentAssignments tsa
            JOIN Users t ON tsa.teacher_id = t.id
            JOIN Users s ON tsa.student_id = s.id
            JOIN Streams st ON s.stream_id = st.id
            ORDER BY t.username, s.grade, s.username
            LIMIT 10
        `);

        console.log('\nSample teacher-student assignments:');
        assignments.forEach(a => {
            console.log(`${a.teacher} -> ${a.student} (Grade ${a.grade}, ${a.stream})`);
        });

        const [count] = await connection.execute('SELECT COUNT(*) as total FROM TeacherStudentAssignments');
        console.log(`\nTotal assignments created: ${count[0].total}`);

        await connection.end();
        console.log('\nTeacher-student assignments setup completed!');
        
    } catch (error) {
        console.error('Setup failed:', error);
        process.exit(1);
    }
}

setupTeacherAssignments();