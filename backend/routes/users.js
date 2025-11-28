const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [users] = await db.execute(`
      SELECT u.id, u.username, u.email, u.role, u.full_name, u.grade, u.created_at,
             s.name as stream_name
      FROM Users u
      LEFT JOIN Streams s ON u.stream_id = s.id
      ORDER BY u.created_at DESC
    `);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.execute(`
      SELECT u.id, u.username, u.email, u.role, u.full_name, u.grade, u.created_at,
             s.name as stream_name
      FROM Users u
      LEFT JOIN Streams s ON u.stream_id = s.id
      WHERE u.id = ?
    `, [req.user.id]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { full_name, email } = req.body;
    
    await db.execute(
      'UPDATE Users SET full_name = ?, email = ? WHERE id = ?',
      [full_name, email, req.user.id]
    );
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Profile update failed', error: error.message });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Verify current password
    const [users] = await db.execute('SELECT password FROM Users WHERE id = ?', [req.user.id]);
    const validPassword = await bcrypt.compare(currentPassword, users[0].password);
    
    if (!validPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await db.execute('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Password change failed', error: error.message });
  }
});

// Get student progress (for parents and students)
router.get('/:userId/progress', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user can access this data
    if (req.user.role === 'Student' && req.user.id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (req.user.role === 'Parent') {
      // Check if this is their child
      const [children] = await db.execute('SELECT id FROM Users WHERE parent_id = ?', [req.user.id]);
      const childIds = children.map(child => child.id);
      if (!childIds.includes(parseInt(userId))) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    const [progress] = await db.execute(`
      SELECT pr.*, q.title as quiz_title, s.name as subject_name
      FROM ProgressReports pr
      JOIN Quizzes q ON pr.quiz_id = q.id
      JOIN Subjects s ON q.subject_id = s.id
      WHERE pr.student_id = ?
      ORDER BY pr.completed_at DESC
    `, [userId]);
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
});

module.exports = router;