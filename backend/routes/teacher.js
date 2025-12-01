const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get teacher's students
router.get('/students', authenticateToken, authorizeRoles(['Teacher']), async (req, res) => {
    try {
        const teacherId = req.user.id;
        
        // Get teacher info first
        const [teacher] = await db.execute(`
            SELECT username, stream_id FROM Users WHERE id = ? AND role = 'Teacher'
        `, [teacherId]);
        
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
        
        let query = `
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
            WHERE s.role = 'Student' AND s.stream_id = ?
        `;
        
        let params = [teacherStreamId];
        
        if (targetGrade) {
            query += ` AND s.grade = ?`;
            params.push(targetGrade);
        }
        
        query += ` ORDER BY s.full_name`;
        
        const [students] = await db.execute(query, params);
        
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Database error', message: error.message });
    }
});

module.exports = router;