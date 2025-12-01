const db = require('./config/database');

async function insertParents() {
  const parents = [
    ['parent_student1', 'student1.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aanya Sharma'],
    ['parent_student2', 'student2.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aarav Kapoor'],
    ['parent_student3', 'student3.parent@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Parent', 'Parent of Aditi Singh']
  ];

  try {
    for (const parent of parents) {
      await db.execute('INSERT IGNORE INTO Users (username, email, password, role, full_name) VALUES (?, ?, ?, ?, ?)', parent);
    }
    console.log('Parents inserted. Test login: parent_student1 / password');
  } catch (error) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

insertParents();