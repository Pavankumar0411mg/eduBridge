const mysql = require('mysql2/promise');

async function createAssignmentTables() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'edubridgedb'
    });

    // Create Assignments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Assignments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        file_path VARCHAR(500),
        grade INT NOT NULL,
        stream_id INT NOT NULL,
        subject_id INT NOT NULL,
        created_by INT NOT NULL,
        due_date DATETIME,
        max_marks INT DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES Users(id),
        FOREIGN KEY (stream_id) REFERENCES Streams(id),
        FOREIGN KEY (subject_id) REFERENCES Subjects(id)
      )
    `);

    // Create Assignment Submissions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS AssignmentSubmissions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        assignment_id INT NOT NULL,
        student_id INT NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        grade_received INT DEFAULT NULL,
        feedback TEXT DEFAULT NULL,
        graded_at TIMESTAMP NULL,
        graded_by INT DEFAULT NULL,
        FOREIGN KEY (assignment_id) REFERENCES Assignments(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES Users(id),
        FOREIGN KEY (graded_by) REFERENCES Users(id),
        UNIQUE KEY unique_submission (assignment_id, student_id)
      )
    `);

    console.log('Assignment tables created successfully!');
    await connection.end();
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createAssignmentTables();