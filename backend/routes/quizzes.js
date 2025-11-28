const express = require('express');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Check quiz completion status
router.get('/:quizId/completion', authenticateToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    const [reports] = await db.execute(
      'SELECT id FROM ProgressReports WHERE student_id = ? AND quiz_id = ?',
      [req.user.id, quizId]
    );
    
    res.json({ completed: reports.length > 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error checking completion', error: error.message });
  }
});

// Get individual quiz
router.get('/:quizId', authenticateToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    const [quizzes] = await db.execute(`
      SELECT q.*, s.name as subject_name, st.name as stream_name
      FROM Quizzes q
      JOIN Subjects s ON q.subject_id = s.id
      JOIN Streams st ON q.stream_id = st.id
      WHERE q.id = ?
    `, [quizId]);
    
    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.json(quizzes[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error: error.message });
  }
});

// Get quiz questions
router.get('/:quizId/questions', authenticateToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    const [questions] = await db.execute(
      'SELECT * FROM Questions WHERE quiz_id = ? ORDER BY id',
      [quizId]
    );
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
});

// Get recent scores for student
router.get('/recent-scores', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'Student') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const [scores] = await db.execute(`
      SELECT pr.*, q.title as quiz_title, s.name as subject_name,
             ROUND((pr.score / pr.total_marks) * 100) as percentage
      FROM ProgressReports pr
      JOIN Quizzes q ON pr.quiz_id = q.id
      JOIN Subjects s ON q.subject_id = s.id
      WHERE pr.student_id = ?
      ORDER BY pr.completed_at DESC
      LIMIT 5
    `, [req.user.id]);
    
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent scores', error: error.message });
  }
});

// Get all quizzes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { grade, stream_id, subject_id, student_id } = req.query;
    console.log('Quiz request params:', { grade, stream_id, subject_id, student_id });
    
    let query = `
      SELECT q.*, s.name as subject_name, st.name as stream_name, u.full_name as created_by_name,
             pr.score, pr.total_marks as attempt_total, pr.id as completed
      FROM Quizzes q
      JOIN Subjects s ON q.subject_id = s.id
      JOIN Streams st ON q.stream_id = st.id
      JOIN Users u ON q.created_by = u.id
      LEFT JOIN ProgressReports pr ON q.id = pr.quiz_id AND pr.student_id = ?
      WHERE 1=1
    `;
    const params = [student_id || 0];

    if (grade) {
      query += ' AND q.grade = ?';
      params.push(grade);
    }
    if (stream_id) {
      query += ' AND q.stream_id = ?';
      params.push(stream_id);
    }
    if (subject_id) {
      query += ' AND q.subject_id = ?';
      params.push(subject_id);
    }

    query += ' ORDER BY q.created_at DESC';

    console.log('Executing query:', query);
    console.log('With params:', params);

    const [quizzes] = await db.execute(query, params);
    
    console.log('Raw quiz results:', quizzes);
    
    const formattedQuizzes = quizzes.map(quiz => ({
      ...quiz,
      completed: !!quiz.completed,
      percentage: quiz.completed ? Math.round((quiz.score / quiz.attempt_total) * 100) : null
    }));
    
    console.log('Formatted quiz results:', formattedQuizzes);
    
    res.json(formattedQuizzes);
  } catch (error) {
    console.error('Quiz fetch error:', error);
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
});

// Create quiz
router.post('/', authenticateToken, authorizeRoles('Admin', 'Teacher'), async (req, res) => {
  try {
    const { title, description, grade, stream_id, subject_id, time_limit, questions } = req.body;
    
    const [quizResult] = await db.execute(
      'INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, grade, stream_id, subject_id, req.user.id, time_limit]
    );

    const quizId = quizResult.insertId;
    let totalMarks = 0;

    // Insert questions
    for (const question of questions) {
      await db.execute(
        'INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [quizId, question.question_text, question.option_a, question.option_b, question.option_c, question.option_d, question.correct_answer, question.marks]
      );
      totalMarks += question.marks;
    }

    // Update total marks
    await db.execute('UPDATE Quizzes SET total_marks = ? WHERE id = ?', [totalMarks, quizId]);

    res.status(201).json({ message: 'Quiz created successfully', quizId });
  } catch (error) {
    res.status(500).json({ message: 'Quiz creation failed', error: error.message });
  }
});

// Submit quiz
router.post('/:quizId/submit', authenticateToken, authorizeRoles('Student'), async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    // Get quiz questions
    const [questions] = await db.execute('SELECT * FROM Questions WHERE quiz_id = ?', [quizId]);
    
    let score = 0;
    let totalMarks = 0;

    questions.forEach(question => {
      totalMarks += question.marks;
      if (answers[question.id] === question.correct_answer) {
        score += question.marks;
      }
    });

    // Save progress report
    await db.execute(
      'INSERT INTO ProgressReports (student_id, quiz_id, score, total_marks) VALUES (?, ?, ?, ?)',
      [req.user.id, quizId, score, totalMarks]
    );

    res.json({ score, totalMarks, percentage: Math.round((score / totalMarks) * 100) });
  } catch (error) {
    res.status(500).json({ message: 'Quiz submission failed', error: error.message });
  }
});

module.exports = router;