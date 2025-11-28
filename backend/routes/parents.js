const express = require('express');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get child's information and quiz scores (Parent only)
router.get('/child-progress', authenticateToken, authorizeRoles('Parent'), async (req, res) => {
  try {
    const parentId = req.user.id;
    
    // Get child information
    const [children] = await db.execute(`
      SELECT u.id, u.full_name, u.grade, u.stream_id, s.name as stream_name
      FROM Users u
      LEFT JOIN Streams s ON u.stream_id = s.id
      WHERE u.parent_id = ? AND u.role = 'Student'
    `, [parentId]);
    
    if (children.length === 0) {
      return res.json({ child: null, scores: [] });
    }
    
    const child = children[0];
    
    // Get child's quiz scores
    const [scores] = await db.execute(`
      SELECT 
        pr.id,
        pr.score,
        pr.total_marks,
        ROUND((pr.score / pr.total_marks) * 100) as percentage,
        pr.completed_at,
        q.title as quiz_title,
        sub.name as subject_name
      FROM ProgressReports pr
      JOIN Quizzes q ON pr.quiz_id = q.id
      JOIN Subjects sub ON q.subject_id = sub.id
      WHERE pr.student_id = ?
      ORDER BY pr.completed_at DESC
    `, [child.id]);
    
    res.json({ child, scores });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching child progress', error: error.message });
  }
});

module.exports = router;