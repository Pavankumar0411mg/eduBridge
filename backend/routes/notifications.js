const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get notifications for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    let notifications = [];
    
    if (userRole === 'Student') {
      // Get assignment reminders
      const [assignments] = await db.execute(`
        SELECT 
          a.id, a.title, a.due_date, s.name as subject_name,
          'assignment' as type,
          DATEDIFF(a.due_date, NOW()) as days_remaining
        FROM Assignments a
        JOIN Subjects s ON a.subject_id = s.id
        JOIN Users u ON u.id = ?
        LEFT JOIN AssignmentSubmissions asub ON a.id = asub.assignment_id AND asub.student_id = ?
        WHERE a.grade = u.grade AND a.stream_id = u.stream_id 
        AND asub.id IS NULL 
        AND a.due_date > NOW()
        AND DATEDIFF(a.due_date, NOW()) <= 7
      `, [userId, userId]);
      
      // Get quiz reminders (upcoming quizzes)
      const [quizzes] = await db.execute(`
        SELECT 
          q.id, q.title, q.created_at, s.name as subject_name,
          'quiz' as type,
          DATEDIFF(DATE_ADD(q.created_at, INTERVAL 7 DAY), NOW()) as days_remaining
        FROM Quizzes q
        JOIN Subjects s ON q.subject_id = s.id
        JOIN Users u ON u.id = ?
        LEFT JOIN ProgressReports pr ON q.id = pr.quiz_id AND pr.student_id = ?
        WHERE q.grade = u.grade AND q.stream_id = u.stream_id 
        AND pr.id IS NULL
        AND q.created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
      `, [userId, userId]);
      
      notifications = [...assignments, ...quizzes];
    }
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    // For now, just return success since we're not storing read status
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification as read', error: error.message });
  }
});

// Get notification count
router.get('/count', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    let count = 0;
    
    if (userRole === 'Student') {
      // Count pending assignments
      const [assignmentCount] = await db.execute(`
        SELECT COUNT(*) as count
        FROM Assignments a
        JOIN Users u ON u.id = ?
        LEFT JOIN AssignmentSubmissions asub ON a.id = asub.assignment_id AND asub.student_id = ?
        WHERE a.grade = u.grade AND a.stream_id = u.stream_id 
        AND asub.id IS NULL 
        AND a.due_date > NOW()
        AND DATEDIFF(a.due_date, NOW()) <= 7
      `, [userId, userId]);
      
      // Count available quizzes
      const [quizCount] = await db.execute(`
        SELECT COUNT(*) as count
        FROM Quizzes q
        JOIN Users u ON u.id = ?
        LEFT JOIN ProgressReports pr ON q.id = pr.quiz_id AND pr.student_id = ?
        WHERE q.grade = u.grade AND q.stream_id = u.stream_id 
        AND pr.id IS NULL
        AND q.created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
      `, [userId, userId]);
      
      count = assignmentCount[0].count + quizCount[0].count;
    }
    
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notification count', error: error.message });
  }
});

module.exports = router;