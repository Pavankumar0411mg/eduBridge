const express = require('express');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get students in teacher's classes
router.get('/my-students', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;
    
    // Get teacher info first
    const [teacher] = await db.execute(`
      SELECT username, stream_id FROM Users WHERE id = ? AND role = 'Teacher'
    `, [teacherId]);
    
    console.log('Teacher data:', teacher[0]);
    
    if (!teacher.length) {
      return res.json([]);
    }
    
    const teacherUsername = teacher[0].username;
    const teacherStreamId = teacher[0].stream_id;
    
    // Determine grade based on teacher username ending
    let targetGrade;
    if (teacherUsername.endsWith('1')) {
      targetGrade = 11;
    } else if (teacherUsername.endsWith('2')) {
      targetGrade = 12;
    } else {
      targetGrade = null; // Show all grades if no pattern
    }
    
    console.log('Query params:', { teacherStreamId, targetGrade });
    
    let query = `
      SELECT 
        s.id,
        s.username,
        s.full_name,
        s.email,
        s.grade,
        st.name as stream_name,
        s.created_at as enrolled_date
      FROM Users s
      JOIN Streams st ON s.stream_id = st.id
      WHERE s.role = 'Student' AND s.stream_id = ?
    `;
    
    let params = [teacherStreamId];
    
    if (targetGrade) {
      query += ` AND s.grade = ?`;
      params.push(targetGrade);
    }
    
    query += ` ORDER BY s.grade, s.full_name`;
    
    console.log('Final query:', query);
    console.log('Final params:', params);
    
    const [students] = await db.execute(query, params);
    
    console.log('Students found:', students.length);
    
    res.json(students);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
});

// Create quiz (Teacher only)
router.post('/create-quiz', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const { title, description, time_limit, questions } = req.body;
    const teacherId = req.user.id;
    
    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Title and questions are required' });
    }
    
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);
    
    // Create quiz with default values
    const [quizResult] = await db.execute(
      'INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title || 'Untitled Quiz', description || null, 11, 1, 1, teacherId, time_limit || 60, totalMarks]
    );
    
    const quizId = quizResult.insertId;
    
    // Add questions
    for (const question of questions) {
      await db.execute(
        'INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          quizId, 
          question.question_text || 'Question text missing', 
          question.option_a || null, 
          question.option_b || null, 
          question.option_c || null, 
          question.option_d || null, 
          question.correct_answer || 'A', 
          question.marks || 1
        ]
      );
    }
    
    res.status(201).json({ message: 'Quiz created successfully', quizId });
  } catch (error) {
    console.error('Quiz creation error:', error);
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