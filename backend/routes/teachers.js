const express = require('express');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get students in teacher's classes
router.get('/my-students', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;
    
    // Get students based on same stream and grade as teacher
    const [students] = await db.execute(`
      SELECT DISTINCT s.id, s.full_name, s.grade, s.stream_id, st.name as stream_name
      FROM Users s
      JOIN Streams st ON s.stream_id = st.id
      JOIN Users t ON s.stream_id = t.stream_id AND s.grade = t.grade
      WHERE t.id = ? AND t.role = 'Teacher' AND s.role = 'Student'
      ORDER BY s.grade, s.full_name
    `, [teacherId]);
    
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
});

// Create quiz (Teacher only)
router.post('/create-quiz', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const { title, description, time_limit, total_marks, questions } = req.body;
    const teacherId = req.user.id;
    
    // Get teacher's stream, grade, and subject from their profile
    const [teacher] = await db.execute(
      'SELECT stream_id, grade, username FROM Users WHERE id = ? AND role = "Teacher"',
      [teacherId]
    );
    
    if (teacher.length === 0) {
      return res.status(403).json({ message: 'Teacher not found' });
    }
    
    const { stream_id, grade, username } = teacher[0];
    
    // Determine subject_id based on teacher username
    let subject_id = 1; // Default to Physics
    if (username.includes('physics')) subject_id = 1;
    else if (username.includes('chemistry')) subject_id = 2;
    else if (username.includes('biology')) subject_id = 3;
    else if (username.includes('math')) subject_id = 4;
    else if (username.includes('cs')) subject_id = 5;
    else if (username.includes('accounts')) subject_id = 6;
    else if (username.includes('business')) subject_id = 7;
    else if (username.includes('economics')) subject_id = 8;
    else if (username.includes('english')) subject_id = 10;
    else if (username.includes('history')) subject_id = 11;
    else if (username.includes('polsci')) subject_id = 12;
    else if (username.includes('geography')) subject_id = 13;
    else if (username.includes('sociology')) subject_id = 14;
    else if (username.includes('literature')) subject_id = 15;
    
    // Create quiz
    const [quizResult] = await db.execute(
      'INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, grade, stream_id, subject_id, teacherId, time_limit, total_marks]
    );
    
    const quizId = quizResult.insertId;
    
    // Add questions
    for (const question of questions) {
      await db.execute(
        'INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [quizId, question.question_text, question.option_a, question.option_b, question.option_c, question.option_d, question.correct_answer, question.marks]
      );
    }
    
    res.status(201).json({ message: 'Quiz created successfully', quizId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
});

// Get quiz scores for teacher's students in their subjects
router.get('/student-scores', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;
    
    const [scores] = await db.execute(`
      SELECT 
        pr.id,
        pr.student_id,
        pr.score,
        pr.total_marks,
        ROUND((pr.score / pr.total_marks) * 100) as percentage,
        pr.completed_at,
        q.title as quiz_title,
        s.name as subject_name,
        u.full_name as student_name
      FROM ProgressReports pr
      JOIN Quizzes q ON pr.quiz_id = q.id
      JOIN Subjects s ON q.subject_id = s.id
      JOIN Users u ON pr.student_id = u.id
      JOIN Users t ON q.grade = t.grade AND q.stream_id = t.stream_id
      WHERE t.id = ? AND t.role = 'Teacher'
      ORDER BY pr.completed_at DESC
    `, [teacherId]);
    
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student scores', error: error.message });
  }
});

module.exports = router;