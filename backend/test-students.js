const mysql = require('mysql2/promise');
require('dotenv').config();

async function testStudentsQuery() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edubridgedb'
  });

  try {
    // Simulate the query that the API endpoint uses
    const teacherUsername = 'physics_teacher1';
    const teacherStreamId = 1;
    const targetGrade = 11;
    
    const [students] = await connection.execute(`
      SELECT 
        s.id,
        s.username,
        s.full_name,
        s.email,
        s.grade,
        st.name as stream_name,
        s.created_at as enrolled_date
      FROM Users s
      JOIN Streams st ON s.stream_id = st.id
      WHERE s.role = 'Student' AND s.stream_id = ? AND s.grade = ?
      ORDER BY s.full_name
    `, [teacherStreamId, targetGrade]);
    
    console.log(`Students for ${teacherUsername} (Grade ${targetGrade}, Stream ${teacherStreamId}):`);
    console.log(`Found ${students.length} students:`);
    students.forEach(student => {
      console.log(`- ${student.full_name} (${student.username}) - Grade ${student.grade}, ${student.stream_name}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

testStudentsQuery();