const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Create quiz with improved error handling
router.post('/create', authenticateToken, authorizeRoles(['Teacher']), (req, res) => {
    const { title, description, time_limit, questions, grade, stream_id, subject_id } = req.body;
    const teacherId = req.user.id;
    
    // Validate required fields
    if (!title || !questions || questions.length === 0) {
        return res.status(400).json({ error: 'Title and questions are required' });
    }
    
    // If subject_id is provided in request, use it; otherwise get from teacher profile
    if (subject_id && grade && stream_id) {
        createQuizWithSubject(res, {
            title, description, grade, stream_id, subject_id, 
            teacherId, time_limit, questions
        });
    } else {
        // Get teacher's subject, grade, and stream from profile
        const teacherQuery = `
            SELECT subject_id, grade, stream_id 
            FROM Users 
            WHERE id = ? AND role = 'Teacher'
        `;
        
        db.query(teacherQuery, [teacherId], (err, teacherResult) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error occurred' });
            }
            
            if (teacherResult.length === 0) {
                return res.status(400).json({ error: 'Teacher not found' });
            }
            
            const teacher = teacherResult[0];
            
            // Use provided values or fall back to teacher's profile
            const finalGrade = grade || teacher.grade;
            const finalStreamId = stream_id || teacher.stream_id;
            const finalSubjectId = subject_id || teacher.subject_id;
            
            if (!finalSubjectId) {
                return res.status(400).json({ 
                    error: 'Subject not assigned to teacher. Please contact admin to assign a subject.',
                    code: 'SUBJECT_NOT_ASSIGNED'
                });
            }
            
            if (!finalGrade || !finalStreamId) {
                return res.status(400).json({ 
                    error: 'Grade and stream must be specified for quiz creation',
                    code: 'GRADE_STREAM_REQUIRED'
                });
            }
            
            createQuizWithSubject(res, {
                title, description, 
                grade: finalGrade, 
                stream_id: finalStreamId, 
                subject_id: finalSubjectId,
                teacherId, time_limit, questions
            });
        });
    }
});

function createQuizWithSubject(res, params) {
    const { title, description, grade, stream_id, subject_id, teacherId, time_limit, questions } = params;
    
    // Create quiz
    const quizQuery = `
        INSERT INTO Quizzes (title, description, grade, stream_id, subject_id, created_by, time_limit, total_marks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);
    
    db.query(quizQuery, [title, description, grade, stream_id, subject_id, teacherId, time_limit || 60, totalMarks], (err, result) => {
        if (err) {
            console.error('Quiz creation error:', err);
            return res.status(500).json({ error: 'Failed to create quiz', details: err.message });
        }
        
        const quizId = result.insertId;
        
        // Insert questions
        const questionPromises = questions.map(q => {
            return new Promise((resolve, reject) => {
                const questionQuery = `
                    INSERT INTO Questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;
                db.query(questionQuery, [
                    quizId, 
                    q.question_text, 
                    q.option_a, 
                    q.option_b, 
                    q.option_c, 
                    q.option_d, 
                    q.correct_answer, 
                    q.marks || 1
                ], (err) => {
                    if (err) {
                        console.error('Question creation error:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
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
                    stream_id,
                    total_marks: totalMarks
                });
            })
            .catch((err) => {
                console.error('Questions creation error:', err);
                res.status(500).json({ error: 'Failed to create questions', details: err.message });
            });
    });
}

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
        if (err) {
            console.error('Teacher info error:', err);
            return res.status(500).json({ error: 'Database error occurred' });
        }
        
        if (result.length === 0) {
            return res.status(400).json({ error: 'Teacher info not found' });
        }
        
        res.json(result[0]);
    });
});

// Get all subjects for dropdown (for manual selection)
router.get('/subjects', authenticateToken, authorizeRoles(['Teacher', 'Admin']), (req, res) => {
    const { stream_id } = req.query;
    
    let query = 'SELECT s.*, st.name as stream_name FROM Subjects s JOIN Streams st ON s.stream_id = st.id';
    const params = [];
    
    if (stream_id) {
        query += ' WHERE s.stream_id = ?';
        params.push(stream_id);
    }
    
    query += ' ORDER BY st.name, s.name';
    
    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Subjects fetch error:', err);
            return res.status(500).json({ error: 'Failed to fetch subjects' });
        }
        
        res.json(result);
    });
});

module.exports = router;