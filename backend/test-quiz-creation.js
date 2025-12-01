const mysql = require('mysql2/promise');
require('dotenv').config();

async function testQuizCreation() {
    try {
        // Database connection
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'railway',
            port: process.env.DB_PORT || 3306
        });

        console.log('Connected to database');

        // Test 1: Check if teachers have subject assignments
        console.log('\n=== Test 1: Teacher Subject Assignments ===');
        const [teachers] = await connection.execute(`
            SELECT u.id, u.username, u.full_name, u.subject_id, s.name as subject_name, u.stream_id, st.name as stream_name
            FROM Users u
            LEFT JOIN Subjects s ON u.subject_id = s.id
            LEFT JOIN Streams st ON u.stream_id = st.id
            WHERE u.role = 'Teacher'
            ORDER BY u.id
        `);
        
        teachers.forEach(teacher => {
            console.log(`Teacher ID ${teacher.id}: ${teacher.username} - ${teacher.subject_name || 'NO SUBJECT'} (Stream: ${teacher.stream_name || 'NO STREAM'})`);
        });

        // Test 2: Try to create a sample quiz
        console.log('\n=== Test 2: Sample Quiz Creation ===');
        
        if (teachers.length > 0 && teachers[0].subject_id) {
            const teacher = teachers[0];
            
            try {
                // Create a test quiz
                const [quizResult] = await connection.execute(`
                    INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `, ['Test Quiz', 'This is a test quiz', 11, teacher.stream_id, teacher.subject_id, teacher.id, 30, 5]);
                
                const quizId = quizResult.insertId;
                console.log(`✓ Quiz created successfully with ID: ${quizId}`);
                
                // Add a test question
                await connection.execute(`
                    INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `, [quizId, 'What is 2+2?', '3', '4', '5', '6', 'B', 5]);
                
                console.log('✓ Question added successfully');
                
                // Clean up - delete the test quiz
                await connection.execute('DELETE FROM Quizzes WHERE id = ?', [quizId]);
                console.log('✓ Test quiz cleaned up');
                
            } catch (error) {
                console.log('✗ Quiz creation failed:', error.message);
            }
        } else {
            console.log('✗ No teachers with subject assignments found');
        }

        // Test 3: Check database structure
        console.log('\n=== Test 3: Database Structure ===');
        
        const [userColumns] = await connection.execute(`
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'Users'
            AND COLUMN_NAME IN ('subject_id', 'stream_id', 'grade')
            ORDER BY COLUMN_NAME
        `);
        
        console.log('Users table relevant columns:');
        userColumns.forEach(col => {
            console.log(`- ${col.COLUMN_NAME}: ${col.DATA_TYPE} (${col.IS_NULLABLE === 'YES' ? 'nullable' : 'not null'})`);
        });

        await connection.end();
        console.log('\n=== Test Complete ===');
        
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

// Run the test
testQuizCreation();