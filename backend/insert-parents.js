const db = require('./config/database');

async function insertParents() {
  try {
    console.log('Starting parent data insertion...');
    
    const parentData = [
      ['parent_student1', 'student1.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aanya Sharma'],
      ['parent_student2', 'student2.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aarav Kapoor'],
      ['parent_student3', 'student3.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aditi Singh'],
      ['parent_student4', 'student4.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Ahan Patel'],
      ['parent_student5', 'student5.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Akshara Nair']
    ];

    for (const parent of parentData) {
      try {
        await db.execute(
          'INSERT IGNORE INTO Users (username, email, password, role, full_name) VALUES (?, ?, ?, ?, ?)',
          parent
        );
        console.log(`Inserted parent: ${parent[0]}`);
      } catch (error) {
        console.log(`Parent ${parent[0]} already exists or error:`, error.message);
      }
    }

    // Test login with first parent
    console.log('\nTesting parent login...');
    const [users] = await db.execute(
      'SELECT * FROM Users WHERE username = ?',
      ['parent_student1']
    );

    if (users.length > 0) {
      console.log('Parent login test successful!');
      console.log('Test credentials:');
      console.log('Username: parent_student1');
      console.log('Password: password');
      console.log('User data:', {
        id: users[0].id,
        username: users[0].username,
        email: users[0].email,
        role: users[0].role,
        full_name: users[0].full_name
      });
    } else {
      console.log('Parent not found in database');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
}

insertParents();