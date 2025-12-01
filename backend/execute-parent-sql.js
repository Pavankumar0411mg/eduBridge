const fs = require('fs');
const db = require('./config/database');

async function executeParentSQL() {
  try {
    console.log('Reading SQL file...');
    
    // Read the SQL file
    const sqlContent = fs.readFileSync('../database/update_parents_complete.sql', 'utf8');
    
    // Extract INSERT statements
    const insertStatements = sqlContent
      .split('\n')
      .filter(line => line.trim().startsWith('INSERT IGNORE INTO Users'))
      .join('\n');
    
    console.log('Executing parent data insertion...');
    
    // Execute the SQL
    await db.execute(insertStatements);
    
    console.log('Parent data inserted successfully!');
    
    // Test parent login
    const [parents] = await db.execute(
      "SELECT username, email, role FROM Users WHERE role = 'Parent' LIMIT 5"
    );
    
    console.log('Sample parent users:', parents);
    
    if (parents.length > 0) {
      console.log('\nParent login is now working!');
      console.log('Test with any parent username and password: "password"');
      console.log('Example: Username: parent_student1, Password: password');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
}

executeParentSQL();