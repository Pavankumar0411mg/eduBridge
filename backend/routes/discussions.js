const express = require('express');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Get all discussions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [discussions] = await db.execute(`
      SELECT 
        d.id, d.title, d.content, d.status, d.created_at,
        u.full_name as author_name, u.role as author_role,
        COUNT(dr.id) as reply_count
      FROM Discussions d
      JOIN Users u ON d.author_id = u.id
      LEFT JOIN DiscussionReplies dr ON d.id = dr.discussion_id
      GROUP BY d.id
      ORDER BY d.created_at DESC
    `);
    
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discussions', error: error.message });
  }
});

// Get single discussion with replies
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get discussion
    const [discussions] = await db.execute(`
      SELECT 
        d.id, d.title, d.content, d.status, d.created_at,
        u.full_name as author_name, u.role as author_role
      FROM Discussions d
      JOIN Users u ON d.author_id = u.id
      WHERE d.id = ?
    `, [id]);
    
    if (discussions.length === 0) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    // Get replies
    const [replies] = await db.execute(`
      SELECT 
        dr.id, dr.content, dr.is_admin_reply, dr.created_at,
        u.full_name as author_name, u.role as author_role
      FROM DiscussionReplies dr
      JOIN Users u ON dr.author_id = u.id
      WHERE dr.discussion_id = ?
      ORDER BY dr.created_at ASC
    `, [id]);
    
    res.json({ discussion: discussions[0], replies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discussion', error: error.message });
  }
});

// Create new discussion
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    const authorId = req.user.id;
    
    // Check if tables exist first
    await db.execute('CREATE TABLE IF NOT EXISTS Discussions (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, author_id INT NOT NULL, status ENUM("Open", "Answered", "Closed") DEFAULT "Open", created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE CASCADE)');
    
    const [result] = await db.execute(
      'INSERT INTO Discussions (title, content, author_id) VALUES (?, ?, ?)',
      [title, content, authorId]
    );
    
    res.status(201).json({ message: 'Discussion created successfully', discussionId: result.insertId });
  } catch (error) {
    console.error('Discussion creation error:', error);
    res.status(500).json({ message: 'Error creating discussion', error: error.message });
  }
});

// Add reply to discussion
router.post('/:id/reply', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const authorId = req.user.id;
    const isAdminReply = req.user.role === 'Admin';
    
    const [result] = await db.execute(
      'INSERT INTO DiscussionReplies (discussion_id, author_id, content, is_admin_reply) VALUES (?, ?, ?, ?)',
      [id, authorId, content, isAdminReply]
    );
    
    // Update discussion status if admin replied
    if (isAdminReply) {
      await db.execute(
        'UPDATE Discussions SET status = "Answered" WHERE id = ?',
        [id]
      );
    }
    
    res.status(201).json({ message: 'Reply added successfully', replyId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error: error.message });
  }
});

// Update discussion status (Admin only)
router.put('/:id/status', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await db.execute('UPDATE Discussions SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Discussion status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating discussion status', error: error.message });
  }
});

module.exports = router;