const mysql = require('mysql2/promise');
require('dotenv').config();

async function debugAPI() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edubridgedb'
  });

  try {
    // Check if physics_teacher1 exists and has correct data
    const [teacher] = await connection.execute(`
      SELECT id, username, full_name, stream_id, role FROM Users WHERE username = 'physics_teacher1'
    `);
    
    console.log('Teacher data:', teacher);
    
    if (teacher.length > 0) {
      const teacherId = teacher[0].id;
      const teacherStreamId = teacher[0].stream_id;
      
      // Test the exact query from the API
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
        ORDER BY s.grade, s.full_name
      `, [teacherStreamId, 11]);
      
      console.log(`\nStudents for teacher ID ${teacherId} (stream ${teacherStreamId}, grade 11):`);
      console.log(`Found ${students.length} students`);
      students.slice(0, 3).forEach(s => console.log(`- ${s.full_name} (${s.username})`));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

debugAPI();