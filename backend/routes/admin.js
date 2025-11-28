const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get all users (Admin only)
router.get('/users', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    console.log('Fetching users for admin...');
    const [users] = await db.execute(`
      SELECT 
        u.id, u.username, u.email, u.role, u.full_name, u.grade, u.created_at, u.stream_id,
        s.name as stream_name
      FROM Users u
      LEFT JOIN Streams s ON u.stream_id = s.id
      ORDER BY u.created_at DESC
    `);
    
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Create new user (Admin only)
router.post('/users', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const { username, email, password, role, full_name, grade, stream_id } = req.body;
    
    // Check if username or email already exists
    const [existing] = await db.execute(
      'SELECT id FROM Users WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    const [result] = await db.execute(
      'INSERT INTO Users (username, email, password, role, full_name, grade, stream_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, role, full_name, grade || null, stream_id || null]
    );
    
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Update user (Admin only)
router.put('/users/:id', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, full_name, grade, stream_id } = req.body;
    
    // Check if username or email already exists for other users
    const [existing] = await db.execute(
      'SELECT id FROM Users WHERE (username = ? OR email = ?) AND id != ?',
      [username, email, id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    // Update user
    await db.execute(
      'UPDATE Users SET username = ?, email = ?, role = ?, full_name = ?, grade = ?, stream_id = ? WHERE id = ?',
      [username, email, role, full_name, grade || null, stream_id || null, id]
    );
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete user with ID: ${id}`);
    
    // Check if user exists
    const [user] = await db.execute('SELECT id, role, full_name FROM Users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log(`Found user: ${user[0].full_name} (${user[0].role})`);
    
    // Don't allow deleting admin user
    if (user[0].role === 'Admin') {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }
    
    // Delete related records first (if any)
    await db.execute('DELETE FROM TeacherSubjects WHERE teacher_id = ?', [id]);
    await db.execute('DELETE FROM ProgressReports WHERE student_id = ?', [id]);
    
    // Delete the user
    const [result] = await db.execute('DELETE FROM Users WHERE id = ?', [id]);
    console.log(`Delete result:`, result);
    
    if (result.affectedRows > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete user' });
    }
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Get all quiz scores (Admin only)
router.get('/quiz-scores', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [scores] = await db.execute(`
      SELECT 
        pr.id,
        pr.score,
        pr.total_marks,
        ROUND((pr.score / pr.total_marks) * 100) as percentage,
        pr.completed_at,
        u.full_name as student_name,
        q.title as quiz_title,
        s.name as subject_name
      FROM ProgressReports pr
      JOIN Users u ON pr.student_id = u.id
      JOIN Quizzes q ON pr.quiz_id = q.id
      JOIN Subjects s ON q.subject_id = s.id
      ORDER BY pr.completed_at DESC
    `);
    
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz scores', error: error.message });
  }
});

// Get user statistics (Admin only)
router.get('/stats', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [userStats] = await db.execute(`
      SELECT 
        role,
        COUNT(*) as count
      FROM Users 
      GROUP BY role
    `);
    
    const [materialStats] = await db.execute(`
      SELECT 
        type,
        COUNT(*) as count
      FROM StudyMaterials 
      GROUP BY type
    `);
    
    const [quizStats] = await db.execute(`
      SELECT 
        COUNT(DISTINCT q.id) as total_quizzes,
        COUNT(pr.id) as total_attempts,
        AVG(pr.score / pr.total_marks * 100) as average_score
      FROM Quizzes q
      LEFT JOIN ProgressReports pr ON q.id = pr.quiz_id
    `);
    
    res.json({
      users: userStats,
      materials: materialStats,
      quizzes: quizStats[0]
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

module.exports = router;