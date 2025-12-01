const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateData() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edubridgedb'
  });

  try {
    console.log('Updating teacher and student data...');
    
    // Update teachers with stream assignments
    await connection.execute(`
      UPDATE Users SET stream_id = 1 WHERE username LIKE '%physics%' OR username LIKE '%chemistry%' OR username LIKE '%biology%' OR username LIKE '%math_science%' OR username LIKE '%cs%'
    `);
    
    await connection.execute(`
      UPDATE Users SET stream_id = 2 WHERE username LIKE '%business%' OR username LIKE '%economics%' OR username LIKE '%accounts%' OR username LIKE '%math_commerce%' OR username LIKE '%english_commerce%'
    `);
    
    await connection.execute(`
      UPDATE Users SET stream_id = 3 WHERE username LIKE '%history%' OR username LIKE '%polsci%' OR username LIKE '%geography%' OR username LIKE '%sociology%' OR username LIKE '%literature%'
    `);

    // Update students - Science Grade 11
    await connection.execute(`
      UPDATE Users SET grade = 11, stream_id = 1 WHERE username IN ('newstudent123', 'student1', 'student2', 'student3', 'student4', 'student5', 'student6', 'student7', 'student8', 'student9', 'student10', 'student11', 'student12', 'student13', 'student14', 'student15')
    `);
    
    // Update students - Science Grade 12
    await connection.execute(`
      UPDATE Users SET grade = 12, stream_id = 1 WHERE username IN ('student16', 'student17', 'student18', 'student19', 'student20', 'student21', 'student22', 'student23', 'student24', 'student25', 'student26', 'student27', 'student28', 'student29', 'student30', 'student63')
    `);

    console.log('Data updated successfully!');
    
    // Verify the updates
    const [teachers] = await connection.execute(`
      SELECT username, full_name, stream_id FROM Users WHERE role = 'Teacher' AND username LIKE 'physics_teacher%'
    `);
    
    const [students] = await connection.execute(`
      SELECT username, full_name, grade, stream_id FROM Users WHERE role = 'Student' AND stream_id = 1 AND grade = 11 LIMIT 5
    `);
    
    console.log('Physics Teachers:', teachers);
    console.log('Science Grade 11 Students (sample):', students);
    
  } catch (error) {
    console.error('Error updating data:', error);
  } finally {
    await connection.end();
  }
}

updateData();