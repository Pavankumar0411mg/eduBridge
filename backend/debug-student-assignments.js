const db = require('./config/database');

async function debugStudentAssignments() {
  try {
    // Check students data
    const [students] = await db.execute('SELECT id, username, grade, stream_id FROM Users WHERE role = "Student" LIMIT 3');
    console.log('Sample students:');
    students.forEach(s => console.log(`  ${s.username}: grade=${s.grade}, stream=${s.stream_id}`));
    
    // Check assignments data
    const [assignments] = await db.execute('SELECT id, title, grade, stream_id, subject_id FROM Assignments');
    console.log('\nAssignments:');
    assignments.forEach(a => console.log(`  ${a.title}: grade=${a.grade}, stream=${a.stream_id}, subject=${a.subject_id}`));
    
    // Test query for first student
    if (students.length > 0) {
      const student = students[0];
      const [matchingAssignments] = await db.execute(`
        SELECT a.*, s.name as subject_name
        FROM Assignments a
        JOIN Subjects s ON a.subject_id = s.id
        WHERE a.grade = ? AND a.stream_id = ?
      `, [student.grade, student.stream_id]);
      
      console.log(`\nMatching assignments for ${student.username}:`, matchingAssignments.length);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
}

debugStudentAssignments();