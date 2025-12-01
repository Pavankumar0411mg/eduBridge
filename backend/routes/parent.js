const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get child's quiz scores and progress
router.get('/child-progress/:parentId', authenticateToken, authorizeRoles(['Parent']), (req, res) => {
  const { parentId } = req.params;
  
  const query = `
    SELECT 
      qr.id,
      qr.score,
      qr.total_questions,
      qr.completed_at,
      q.title as quiz_title,
      s.name as subject_name,
      st.name as stream_name,
      u.full_name as student_name
    FROM QuizResults qr
    JOIN Quizzes q ON qr.quiz_id = q.id
    JOIN Subjects s ON q.subject_id = s.id
    JOIN Streams st ON s.stream_id = st.id
    JOIN Users u ON qr.user_id = u.id
    JOIN StudentParents sp ON u.id = sp.student_id
    WHERE sp.parent_id = ?
    ORDER BY qr.completed_at DESC
  `;
  
  db.query(query, [parentId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    const progress = results.map(result => ({
      id: result.id,
      studentName: result.student_name,
      quizTitle: result.quiz_title,
      subject: result.subject_name,
      stream: result.stream_name,
      score: result.score,
      totalQuestions: result.total_questions,
      percentage: Math.round((result.score / result.total_questions) * 100),
      completedAt: result.completed_at
    }));
    
    res.json({ progress });
  });
});

// Get child's overall statistics
router.get('/child-stats/:parentId', authenticateToken, authorizeRoles(['Parent']), (req, res) => {
  const { parentId } = req.params;
  
  const query = `
    SELECT 
      COUNT(qr.id) as total_quizzes,
      AVG(qr.score / qr.total_questions * 100) as average_percentage,
      u.full_name as student_name,
      s.name as stream_name
    FROM QuizResults qr
    JOIN Users u ON qr.user_id = u.id
    JOIN StudentParents sp ON u.id = sp.student_id
    JOIN Streams s ON u.stream_id = s.id
    WHERE sp.parent_id = ?
    GROUP BY u.id, u.full_name, s.name
  `;
  
  db.query(query, [parentId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({ stats: results });
  });
});

module.exports = router;