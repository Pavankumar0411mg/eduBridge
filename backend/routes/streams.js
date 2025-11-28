const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all streams (public for registration)
router.get('/', async (req, res) => {
  try {
    const [streams] = await db.execute('SELECT * FROM Streams');
    res.json(streams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching streams', error: error.message });
  }
});

// Get subjects by stream (public for registration)
router.get('/:streamId/subjects', async (req, res) => {
  try {
    const { streamId } = req.params;
    const [subjects] = await db.execute(
      'SELECT * FROM Subjects WHERE stream_id = ?',
      [streamId]
    );
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
});

module.exports = router;