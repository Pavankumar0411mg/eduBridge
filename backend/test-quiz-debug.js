const mysql = require('mysql2/promise');
require('dotenv').config();

async function testQuizCreation() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edubridgedb',
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connected successfully');

    // Check if tables exist
    const [tables] = await connection.execute("SHOW TABLES");
    console.log('Available tables:', tables.map(t => Object.values(t)[0]));

    // Check Quizzes table structure
    try {
      const [quizStructure] = await connection.execute("DESCRIBE Quizzes");
      console.log('Quizzes table structure:', quizStructure);
    } catch (error) {
      console.log('Quizzes table does not exist:', error.message);
    }

    // Check Questions table structure
    try {
      const [questionStructure] = await connection.execute("DESCRIBE Questions");
      console.log('Questions table structure:', questionStructure);
    } catch (error) {
      console.log('Questions table does not exist:', error.message);
    }

    // Test a simple quiz insertion
    try {
      const [result] = await connection.execute(
        'INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        ['Test Quiz', 'Test Description', 11, 1, 1, 1, 60, 10]
      );
      console.log('Quiz insertion successful:', result.insertId);
      
      // Clean up test data
      await connection.execute('DELETE FROM Quizzes WHERE id = ?', [result.insertId]);
      console.log('Test quiz cleaned up');
    } catch (error) {
      console.log('Quiz insertion failed:', error.message);
    }

    await connection.end();
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

testQuizCreation();