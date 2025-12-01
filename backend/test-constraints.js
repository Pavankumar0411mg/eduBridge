const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConstraints() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edubridgedb',
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connected successfully');

    // Check foreign key constraints
    const [constraints] = await connection.execute(`
      SELECT 
        CONSTRAINT_NAME,
        TABLE_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
      FROM information_schema.KEY_COLUMN_USAGE 
      WHERE REFERENCED_TABLE_SCHEMA = 'edubridgedb'
      AND TABLE_NAME IN ('quizzes', 'questions')
    `);
    console.log('Foreign key constraints:', constraints);

    // Check if referenced data exists
    const [streams] = await connection.execute('SELECT id, name FROM Streams');
    console.log('Available streams:', streams);

    const [subjects] = await connection.execute('SELECT id, name, stream_id FROM Subjects');
    console.log('Available subjects:', subjects);

    const [teachers] = await connection.execute('SELECT id, username, role FROM Users WHERE role = "Teacher" LIMIT 5');
    console.log('Available teachers:', teachers);

    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testConstraints();