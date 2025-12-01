const db = require('./config/database');

async function fixAssignmentTable() {
  try {
    console.log('Adding missing columns to AssignmentSubmissions...');
    
    await db.execute('ALTER TABLE AssignmentSubmissions ADD COLUMN grade_received INT DEFAULT NULL');
    await db.execute('ALTER TABLE AssignmentSubmissions ADD COLUMN feedback TEXT DEFAULT NULL');
    await db.execute('ALTER TABLE AssignmentSubmissions ADD COLUMN graded_at TIMESTAMP NULL');
    await db.execute('ALTER TABLE AssignmentSubmissions ADD COLUMN graded_by INT NULL');
    
    console.log('✓ Columns added successfully');
    
  } catch (error) {
    if (error.message.includes('Duplicate column name')) {
      console.log('✓ Columns already exist');
    } else {
      console.error('Error:', error.message);
    }
  } finally {
    process.exit(0);
  }
}

fixAssignmentTable();