const bcrypt = require('bcrypt');
const db = require('./config/database');

async function testParentLogin() {
  try {
    // Check if any parent users exist
    const [parents] = await db.execute(
      "SELECT username, email, role FROM Users WHERE role = 'Parent' LIMIT 5"
    );
    
    console.log('Existing parent users:', parents);
    
    if (parents.length === 0) {
      console.log('No parent users found. Creating test parent...');
      
      // Create a test parent user
      const hashedPassword = await bcrypt.hash('password', 10);
      
      await db.execute(
        'INSERT INTO Users (username, email, password, role, full_name) VALUES (?, ?, ?, ?, ?)',
        ['parent_test', 'parent.test@gmail.com', hashedPassword, 'Parent', 'Test Parent']
      );
      
      console.log('Test parent created successfully!');
      console.log('Login credentials:');
      console.log('Username: parent_test');
      console.log('Password: password');
    }
    
    // Test login functionality
    const [testUser] = await db.execute(
      'SELECT * FROM Users WHERE username = ? OR email = ?',
      ['parent_test', 'parent_test']
    );
    
    if (testUser.length > 0) {
      const user = testUser[0];
      const validPassword = await bcrypt.compare('password', user.password);
      console.log('Password validation result:', validPassword);
      console.log('User found:', {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        full_name: user.full_name
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
}

testParentLogin();