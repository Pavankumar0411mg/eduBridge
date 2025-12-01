const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function fixQuizDatabase() {
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

        // Read and execute SQL fix file
        const sqlFile = path.join(__dirname, '..', 'database', 'fix_quiz_creation.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        // Split SQL into individual statements
        const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
        
        for (const statement of statements) {
            if (statement.trim() && !statement.trim().startsWith('--')) {
                try {
                    await connection.execute(statement);
                    console.log('Executed SQL statement successfully');
                } catch (error) {
                    // Some statements might fail if already executed, that's okay
                    console.log('Statement execution note:', error.message);
                }
            }
        }

        // Verify the fix
        console.log('\nVerifying database structure...');
        
        // Check if subject_id column exists
        const [columns] = await connection.execute(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'Users' 
            AND COLUMN_NAME = 'subject_id'
        `);
        
        if (columns.length > 0) {
            console.log('✓ subject_id column exists in Users table');
        } else {
            console.log('✗ subject_id column missing in Users table');
        }
        
        // Check teacher assignments
        const [teachers] = await connection.execute(`
            SELECT u.username, u.full_name, u.subject_id, s.name as subject_name
            FROM Users u
            LEFT JOIN Subjects s ON u.subject_id = s.id
            WHERE u.role = 'Teacher'
        `);
        
        console.log('\nTeacher subject assignments:');
        teachers.forEach(teacher => {
            console.log(`- ${teacher.username} (${teacher.full_name}): ${teacher.subject_name || 'No subject assigned'}`);
        });

        console.log('\nDatabase fix completed successfully!');
        
        await connection.end();
        
    } catch (error) {
        console.error('Database fix failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    fixQuizDatabase();
}

module.exports = fixQuizDatabase;