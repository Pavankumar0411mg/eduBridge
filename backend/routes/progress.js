const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get student progress data
router.get('/student', authenticateToken, async (req, res) => {
  try {
    const studentId = req.user.id;
    
    // Get quiz attempts with scores from ProgressReports
    const [attempts] = await db.execute(`
      SELECT 
        pr.id,
        pr.score,
        pr.total_marks,
        ROUND((pr.score / pr.total_marks) * 100) as percentage,
        pr.completed_at,
        q.title as quiz_title,
        COALESCE(s.name, 'General') as subject_name
      FROM ProgressReports pr
      JOIN Quizzes q ON pr.quiz_id = q.id
      LEFT JOIN Subjects s ON q.subject_id = s.id
      WHERE pr.student_id = ?
      ORDER BY pr.completed_at DESC
    `, [studentId]);

    // Get total quiz count
    const totalQuizzes = attempts.length;

    // Get average score
    const avgScore = attempts.length > 0 
      ? attempts.reduce((sum, attempt) => sum + parseFloat(attempt.percentage), 0) / attempts.length
      : 0;

    // Get subject-wise performance
    const subjectPerformance = {};
    attempts.forEach(attempt => {
      if (!subjectPerformance[attempt.subject_name]) {
        subjectPerformance[attempt.subject_name] = {
          total: 0,
          scores: [],
          average: 0
        };
      }
      subjectPerformance[attempt.subject_name].total++;
      subjectPerformance[attempt.subject_name].scores.push(parseFloat(attempt.percentage));
    });

    // Calculate subject averages
    Object.keys(subjectPerformance).forEach(subject => {
      const scores = subjectPerformance[subject].scores;
      subjectPerformance[subject].average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    });

    res.json({
      totalQuizzes,
      averageScore: Math.round(avgScore * 100) / 100,
      attempts,
      subjectPerformance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress data', error: error.message });
  }
});

module.exports = router;