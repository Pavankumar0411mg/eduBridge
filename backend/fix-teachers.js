const db = require('./config/database');

async function fixTeachers() {
  try {
    console.log('Updating teacher data...');
    
    // Add subject_id column if not exists
    try {
      await db.execute('ALTER TABLE Users ADD COLUMN subject_id INT NULL');
    } catch (e) {
      console.log('subject_id column already exists');
    }
    
    // Update subject_id for teachers
    await db.execute("UPDATE Users SET subject_id = 1 WHERE username IN ('physics_teacher1', 'physics_teacher2')");
    await db.execute("UPDATE Users SET subject_id = 2 WHERE username IN ('chemistry_teacher1', 'chemistry_teacher2')");
    await db.execute("UPDATE Users SET subject_id = 3 WHERE username IN ('biology_teacher1', 'biology_teacher2')");
    await db.execute("UPDATE Users SET subject_id = 4 WHERE username IN ('math_science_teacher1', 'math_science_teacher2')");
    await db.execute("UPDATE Users SET subject_id = 5 WHERE username IN ('cs_teacher1', 'cs_teacher2')");
    
    // Set grade for all teachers
    await db.execute("UPDATE Users SET grade = 11 WHERE role = 'Teacher' AND grade IS NULL");
    
    console.log('✓ Teacher data updated successfully');
    
    // Verify
    const [teachers] = await db.execute('SELECT username, grade, stream_id, subject_id FROM Users WHERE role = "Teacher" LIMIT 5');
    console.log('Sample teachers after update:');
    teachers.forEach(t => console.log(`  ${t.username}: grade=${t.grade}, stream=${t.stream_id}, subject=${t.subject_id}`));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
}

fixTeachers();