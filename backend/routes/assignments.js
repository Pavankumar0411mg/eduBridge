const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/assignments/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'image/png';
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, Word documents, and PNG images are allowed'));
    }
  }
});

// Create assignment (Teacher only)
router.post('/create', authenticateToken, authorizeRoles('Teacher'), upload.single('assignmentFile'), async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const teacherId = req.user.id;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Assignment file is required' });
    }

    // Get teacher's stream, grade, and subject
    const [teacher] = await db.execute(
      'SELECT stream_id, grade, username FROM Users WHERE id = ? AND role = "Teacher"',
      [teacherId]
    );
    
    if (teacher.length === 0) {
      return res.status(403).json({ message: 'Teacher not found' });
    }
    
    const { stream_id, grade, username } = teacher[0];
    
    // Determine subject_id based on teacher username
    let subject_id = 1;
    if (username.includes('physics')) subject_id = 1;
    else if (username.includes('chemistry')) subject_id = 2;
    else if (username.includes('biology')) subject_id = 3;
    else if (username.includes('math')) subject_id = 4;
    else if (username.includes('cs')) subject_id = 5;
    else if (username.includes('accounts')) subject_id = 6;
    else if (username.includes('business')) subject_id = 7;
    else if (username.includes('economics')) subject_id = 8;
    else if (username.includes('english')) subject_id = 10;
    else if (username.includes('history')) subject_id = 11;
    else if (username.includes('polsci')) subject_id = 12;
    else if (username.includes('geography')) subject_id = 13;
    else if (username.includes('sociology')) subject_id = 14;
    else if (username.includes('literature')) subject_id = 15;

    // Create assignment
    const [result] = await db.execute(
      'INSERT INTO Assignments (title, description, file_path, grade, stream_id, subject_id, created_by, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, req.file.path, grade, stream_id, subject_id, teacherId, due_date]
    );
    
    res.status(201).json({ message: 'Assignment created successfully', assignmentId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error: error.message });
  }
});

// Test route without role restriction
router.get('/test', authenticateToken, async (req, res) => {
  try {
    const [assignments] = await db.execute('SELECT * FROM Assignments');
    res.json({ count: assignments.length, assignments });
  } catch (error) {
    res.status(500).json({ message: 'Test error', error: error.message });
  }
});

// Get assignments for students with submission status
router.get('/student', authenticateToken, async (req, res) => {
  try {
    const studentId = req.user.id;
    const [student] = await db.execute('SELECT grade, stream_id FROM Users WHERE id = ?', [studentId]);
    if (student.length === 0) {
      return res.json([]);
    }
    
    const { grade, stream_id } = student[0];
    const [assignments] = await db.execute(`
      SELECT 
        a.*,
        s.name as subject_name,
        asub.id as submission_id,
        asub.submitted_at,
        asub.grade_received,
        asub.feedback
      FROM Assignments a
      JOIN Subjects s ON a.subject_id = s.id
      LEFT JOIN AssignmentSubmissions asub ON a.id = asub.assignment_id AND asub.student_id = ?
      WHERE a.grade = ? AND a.stream_id = ?
      ORDER BY a.created_at DESC
    `, [studentId, grade, stream_id]);
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
});

// Test submission route
router.post('/test-submit/:assignmentId', authenticateToken, async (req, res) => {
  try {
    res.json({ 
      message: 'Test route working', 
      user: req.user, 
      assignmentId: req.params.assignmentId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Test error', error: error.message });
  }
});

// Submit assignment (Student only)
router.post('/submit/:assignmentId', authenticateToken, upload.single('submissionFile'), async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const studentId = req.user.id;
    
    // Check if user is a student
    if (req.user.role !== 'Student') {
      return res.status(403).json({ message: 'Only students can submit assignments' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Submission file is required' });
    }

    // Check if assignment exists
    const [assignment] = await db.execute(
      'SELECT * FROM Assignments WHERE id = ?',
      [assignmentId]
    );
    
    if (assignment.length === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Check if student is eligible (same grade and stream)
    const [student] = await db.execute(
      'SELECT grade, stream_id FROM Users WHERE id = ? AND role = "Student"',
      [studentId]
    );
    
    if (student.length === 0) {
      return res.status(403).json({ message: 'Student not found' });
    }
    
    const assignmentData = assignment[0];
    const studentData = student[0];
    
    if (assignmentData.grade !== studentData.grade || assignmentData.stream_id !== studentData.stream_id) {
      return res.status(403).json({ message: 'Not eligible for this assignment' });
    }
    
    // Check if already submitted
    const [existing] = await db.execute(
      'SELECT id FROM AssignmentSubmissions WHERE assignment_id = ? AND student_id = ?',
      [assignmentId, studentId]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }
    
    // Insert submission
    await db.execute(
      'INSERT INTO AssignmentSubmissions (assignment_id, student_id, file_path) VALUES (?, ?, ?)',
      [assignmentId, studentId, req.file.path]
    );
    
    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    console.error('Assignment submission error:', error);
    res.status(500).json({ message: 'Error submitting assignment', error: error.message });
  }
});

// Get assignments for teachers
router.get('/teacher', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;
    
    const [assignments] = await db.execute(`
      SELECT 
        a.id, a.title, a.description, a.due_date, a.created_at,
        s.name as subject_name,
        COUNT(asub.id) as submissions_count
      FROM Assignments a
      JOIN Subjects s ON a.subject_id = s.id
      LEFT JOIN AssignmentSubmissions asub ON a.id = asub.assignment_id
      WHERE a.created_by = ?
      GROUP BY a.id, a.title, a.description, a.due_date, a.created_at, s.name
      ORDER BY a.created_at DESC
    `, [teacherId]);
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
});

// Get submissions for a specific assignment
router.get('/:assignmentId/submissions', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const teacherId = req.user.id;
    
    // Verify teacher owns this assignment
    const [assignment] = await db.execute('SELECT id FROM Assignments WHERE id = ? AND created_by = ?', [assignmentId, teacherId]);
    if (assignment.length === 0) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const [submissions] = await db.execute(`
      SELECT 
        asub.id, asub.file_path, asub.submitted_at, asub.grade_received, asub.feedback,
        u.full_name as student_name
      FROM AssignmentSubmissions asub
      JOIN Users u ON asub.student_id = u.id
      WHERE asub.assignment_id = ?
      ORDER BY asub.submitted_at DESC
    `, [assignmentId]);
    
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
});

// Grade assignment submission
router.put('/grade/:submissionId', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;
    const teacherId = req.user.id;
    
    // Verify teacher owns the assignment
    const [submission] = await db.execute(`
      SELECT asub.id FROM AssignmentSubmissions asub
      JOIN Assignments a ON asub.assignment_id = a.id
      WHERE asub.id = ? AND a.created_by = ?
    `, [submissionId, teacherId]);
    
    if (submission.length === 0) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await db.execute(
      'UPDATE AssignmentSubmissions SET grade_received = ?, feedback = ?, graded_at = NOW(), graded_by = ? WHERE id = ?',
      [grade, feedback, teacherId, submissionId]
    );
    
    res.json({ message: 'Assignment graded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error grading assignment', error: error.message });
  }
});

// Get student's grades for all assignments
router.get('/student/grades', authenticateToken, async (req, res) => {
  try {
    const studentId = req.user.id;
    
    const [grades] = await db.execute(`
      SELECT 
        a.title as assignment_title,
        s.name as subject_name,
        asub.grade_received,
        asub.feedback,
        asub.submitted_at,
        asub.graded_at,
        a.max_marks
      FROM AssignmentSubmissions asub
      JOIN Assignments a ON asub.assignment_id = a.id
      JOIN Subjects s ON a.subject_id = s.id
      WHERE asub.student_id = ? AND asub.grade_received IS NOT NULL
      ORDER BY asub.graded_at DESC
    `, [studentId]);
    
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades', error: error.message });
  }
});

// Debug route to check if assignments exist
router.get('/debug', authenticateToken, async (req, res) => {
  try {
    const [assignments] = await db.execute('SELECT * FROM Assignments LIMIT 5');
    const [users] = await db.execute('SELECT id, username, role, grade, stream_id FROM Users WHERE role IN ("Student", "Teacher") LIMIT 5');
    res.json({ assignments, users, user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Debug error', error: error.message });
  }
});

module.exports = router;