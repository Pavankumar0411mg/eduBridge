const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get teacher's students
router.get('/students', authenticateToken, authorizeRoles(['Teacher']), async (req, res) => {
    try {
        const teacherId = req.user.id;
        
        const [students] = await db.execute(`
            SELECT 
                s.id,
                s.username,
                s.full_name,
                s.email,
                s.grade,
                st.name as stream,
                s.created_at as enrolled_date
            FROM Users s
            JOIN Streams st ON s.stream_id = st.id
            JOIN Users t ON s.stream_id = t.stream_id AND s.grade = t.grade
            WHERE t.id = ? AND t.role = 'Teacher' AND s.role = 'Student'
            ORDER BY s.full_name
        `, [teacherId]);
        
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Database error', message: error.message });
    }
});

module.exports = router;