const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Create quiz with automatic subject assignment
router.post('/create', authenticateToken, authorizeRoles(['Teacher']), (req, res) => {
    const { title, description, time_limit, questions } = req.body;
    const teacherId = req.user.id;
    
    // Get teacher's subject, grade, and stream
    const teacherQuery = `
        SELECT subject_id, grade, stream_id 
        FROM Users 
        WHERE id = ? AND role = 'Teacher'
    `;
    
    db.query(teacherQuery, [teacherId], (err, teacherResult) => {
        if (err || teacherResult.length === 0) {
            return res.status(400).json({ error: 'Teacher not found or invalid' });
        }
        
        const { subject_id, grade, stream_id } = teacherResult[0];
        
        if (!subject_id) {
            return res.status(400).json({ error: 'Teacher subject not assigned' });
        }
        
        // Create quiz with teacher's subject
        const quizQuery = `
            INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);
        
        db.query(quizQuery, [title, description, grade, stream_id, subject_id, teacherId, time_limit, totalMarks], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create quiz' });
            }
            
            const quizId = result.insertId;
            
            // Insert questions
            const questionPromises = questions.map(q => {
                return new Promise((resolve, reject) => {
                    const questionQuery = `
                        INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `;
                    db.query(questionQuery, [quizId, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer, q.marks || 1], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            });
            
            Promise.all(questionPromises)
                .then(() => {
                    res.json({ 
                        message: 'Quiz created successfully', 
                        quizId,
                        subject_id,
                        grade,
                        stream_id
                    });
                })
                .catch(() => {
                    res.status(500).json({ error: 'Failed to create questions' });
                });
        });
    });
});

// Get teacher's subject info for quiz form
router.get('/teacher-info', authenticateToken, authorizeRoles(['Teacher']), (req, res) => {
    const teacherId = req.user.id;
    
    const query = `
        SELECT u.grade, u.stream_id, u.subject_id, s.name as subject_name, st.name as stream_name
        FROM Users u
        LEFT JOIN Subjects s ON u.subject_id = s.id
        LEFT JOIN Streams st ON u.stream_id = st.id
        WHERE u.id = ? AND u.role = 'Teacher'
    `;
    
    db.query(query, [teacherId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(400).json({ error: 'Teacher info not found' });
        }
        
        res.json(result[0]);
    });
});

module.exports = router;