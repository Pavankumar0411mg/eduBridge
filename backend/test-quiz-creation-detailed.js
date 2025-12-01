const mysql = require('mysql2/promise');
require('dotenv').config();

async function testQuizCreationDetailed() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edubridgedb',
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connected successfully');

    // Simulate the exact quiz creation process
    const teacherId = 128; // physics_teacher1
    const title = 'Test Physics Quiz';
    const description = 'Test Description';
    const time_limit = 60;
    const questions = [
      {
        question_text: 'What is the speed of light?',
        option_a: '3x10^8 m/s',
        option_b: '2x10^8 m/s',
        option_c: '4x10^8 m/s',
        option_d: '5x10^8 m/s',
        correct_answer: 'A',
        marks: 1
      }
    ];

    // Get teacher info
    const [teacher] = await connection.execute(
      'SELECT stream_id, grade, username FROM Users WHERE id = ? AND role = "Teacher"',
      [teacherId]
    );
    
    console.log('Teacher info:', teacher[0]);

    if (teacher.length === 0) {
      console.log('Teacher not found');
      return;
    }

    const { stream_id: tStreamId, grade: tGrade, username } = teacher[0];
    
    let finalStreamId = tStreamId || 1;
    let finalGrade = tGrade || 11;
    let finalSubjectId = 1; // Physics

    // Determine subject_id based on teacher username
    if (username.includes('physics')) finalSubjectId = 1;
    else if (username.includes('chemistry')) finalSubjectId = 2;
    else if (username.includes('biology')) finalSubjectId = 3;
    else if (username.includes('math')) finalSubjectId = 4;
    else if (username.includes('cs')) finalSubjectId = 5;

    console.log('Final values:', { finalGrade, finalStreamId, finalSubjectId });

    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);
    console.log('Total marks:', totalMarks);

    // Create quiz
    try {
      const [quizResult] = await connection.execute(
        'INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, finalGrade, finalStreamId, finalSubjectId, teacherId, time_limit, totalMarks]
      );
      
      const quizId = quizResult.insertId;
      console.log('Quiz created with ID:', quizId);

      // Add questions
      for (const question of questions) {
        try {
          await connection.execute(
            'INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [quizId, question.question_text, question.option_a, question.option_b, question.option_c, question.option_d, question.correct_answer, question.marks || 1]
          );
          console.log('Question added successfully');
        } catch (error) {
          console.error('Question insertion error:', error.message);
        }
      }

      console.log('Quiz creation completed successfully');

      // Clean up
      await connection.execute('DELETE FROM Questions WHERE quiz_id = ?', [quizId]);
      await connection.execute('DELETE FROM Quizzes WHERE id = ?', [quizId]);
      console.log('Test data cleaned up');

    } catch (error) {
      console.error('Quiz creation error:', error.message);
      console.error('Error details:', error);
    }

    await connection.end();
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

testQuizCreationDetailed();