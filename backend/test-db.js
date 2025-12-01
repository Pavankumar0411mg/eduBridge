const db = require('./config/database');

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const [rows] = await db.execute('SELECT 1 as test');
    console.log('✓ Database connection successful');
    
    // Check if Assignments table exists
    const [tables] = await db.execute("SHOW TABLES LIKE 'Assignments'");
    if (tables.length === 0) {
      console.log('✗ Assignments table does not exist');
      console.log('Creating Assignments table...');
      
      await db.execute(`
        CREATE TABLE Assignments (
          id INT PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(200) NOT NULL,
          description TEXT,
          file_path VARCHAR(500) NOT NULL,
          grade INT NOT NULL,
          stream_id INT NOT NULL,
          subject_id INT NOT NULL,
          created_by INT NOT NULL,
          due_date DATETIME,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (created_by) REFERENCES Users(id),
          FOREIGN KEY (stream_id) REFERENCES Streams(id),
          FOREIGN KEY (subject_id) REFERENCES Subjects(id)
        )
      `);
      console.log('✓ Assignments table created');
    } else {
      console.log('✓ Assignments table exists');
    }
    
    // Check if AssignmentSubmissions table exists
    const [subTables] = await db.execute("SHOW TABLES LIKE 'AssignmentSubmissions'");
    if (subTables.length === 0) {
      console.log('✗ AssignmentSubmissions table does not exist');
      console.log('Creating AssignmentSubmissions table...');
      
      await db.execute(`
        CREATE TABLE AssignmentSubmissions (
          id INT PRIMARY KEY AUTO_INCREMENT,
          assignment_id INT NOT NULL,
          student_id INT NOT NULL,
          file_path VARCHAR(500) NOT NULL,
          submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          grade_received INT DEFAULT NULL,
          feedback TEXT DEFAULT NULL,
          graded_at TIMESTAMP NULL,
          graded_by INT NULL,
          FOREIGN KEY (assignment_id) REFERENCES Assignments(id) ON DELETE CASCADE,
          FOREIGN KEY (student_id) REFERENCES Users(id),
          FOREIGN KEY (graded_by) REFERENCES Users(id),
          UNIQUE KEY unique_student_assignment (student_id, assignment_id)
        )
      `);
      console.log('✓ AssignmentSubmissions table created');
    } else {
      console.log('✓ AssignmentSubmissions table exists');
    }
    
    // Check table structure
    const [columns] = await db.execute('DESCRIBE Assignments');
    console.log('Assignments table structure:');
    columns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });
    
    // Test teacher data
    const [teachers] = await db.execute('SELECT id, username, role, stream_id, grade FROM Users WHERE role = "Teacher" LIMIT 3');
    console.log('Sample teachers:');
    teachers.forEach(teacher => {
      console.log(`  ${teacher.username}: stream_id=${teacher.stream_id}, grade=${teacher.grade}`);
    });
    
    console.log('Database test completed successfully!');
    
  } catch (error) {
    console.error('Database test failed:', error.message);
  } finally {
    process.exit(0);
  }
}

testDatabase();