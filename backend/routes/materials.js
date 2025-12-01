const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all materials
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { grade, stream_id, subject_id } = req.query;
    let query = `
      SELECT sm.*, s.name as subject_name, st.name as stream_name, u.full_name as uploaded_by_name
      FROM StudyMaterials sm
      JOIN Subjects s ON sm.subject_id = s.id
      JOIN Streams st ON sm.stream_id = st.id
      JOIN Users u ON sm.uploaded_by = u.id
      WHERE 1=1
    `;
    const params = [];

    if (grade) {
      query += ' AND sm.grade = ?';
      params.push(grade);
    }
    if (stream_id) {
      query += ' AND sm.stream_id = ?';
      params.push(stream_id);
    }
    if (subject_id) {
      query += ' AND sm.subject_id = ?';
      params.push(subject_id);
    }

    query += ' ORDER BY sm.created_at DESC';

    const [materials] = await db.execute(query, params);
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching materials', error: error.message });
  }
});

// Delete material
router.delete('/:materialId', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const { materialId } = req.params;
    
    // Get file path before deleting
    const [materials] = await db.execute('SELECT file_path FROM StudyMaterials WHERE id = ?', [materialId]);
    
    if (materials.length === 0) {
      return res.status(404).json({ message: 'Material not found' });
    }
    
    const filePath = materials[0].file_path;
    
    // Delete from database first
    await db.execute('DELETE FROM StudyMaterials WHERE id = ?', [materialId]);
    
    // Delete physical file
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fileError) {
      console.log('File deletion error:', fileError.message);
      // Continue even if file deletion fails
    }
    
    res.json({ message: 'Material and file deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

// Get teacher's auto-populate data
router.get('/teacher-data', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;
    const [teacher] = await db.execute(`
      SELECT u.stream_id, u.subject_id, s.name as subject_name, st.name as stream_name
      FROM Users u
      LEFT JOIN Subjects s ON u.subject_id = s.id
      LEFT JOIN Streams st ON u.stream_id = st.id
      WHERE u.id = ? AND u.role = 'Teacher'
    `, [teacherId]);
    
    if (teacher.length === 0) {
      return res.status(404).json({ message: 'Teacher data not found' });
    }
    
    res.json({
      stream_id: teacher[0].stream_id,
      subject_id: teacher[0].subject_id,
      stream_name: teacher[0].stream_name,
      subject_name: teacher[0].subject_name
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher data', error: error.message });
  }
});

// Get teacher's assigned subjects
router.get('/teacher-subjects', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;
    const [teacher] = await db.execute(`
      SELECT u.grade, u.stream_id, u.subject_id, s.name as subject_name, st.name as stream_name
      FROM Users u
      LEFT JOIN Subjects s ON u.subject_id = s.id
      LEFT JOIN Streams st ON u.stream_id = st.id
      WHERE u.id = ? AND u.role = 'Teacher'
    `, [teacherId]);
    
    if (teacher.length === 0) {
      return res.json({ auto_populate: false, subjects: [] });
    }
    
    // Return teacher info for auto-population and both grades
    const response = {
      auto_populate: true,
      teacher_stream_id: teacher[0].stream_id,
      teacher_subject_id: teacher[0].subject_id,
      teacher_stream_name: teacher[0].stream_name,
      teacher_subject_name: teacher[0].subject_name,
      subjects: [
        {
          teacher_id: teacherId,
          grade: 11,
          stream_id: teacher[0].stream_id,
          subject_id: teacher[0].subject_id,
          subject_name: teacher[0].subject_name,
          stream_name: teacher[0].stream_name
        },
        {
          teacher_id: teacherId,
          grade: 12,
          stream_id: teacher[0].stream_id,
          subject_id: teacher[0].subject_id,
          subject_name: teacher[0].subject_name,
          stream_name: teacher[0].stream_name
        }
      ]
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher subjects', error: error.message });
  }
});

// Upload material
router.post('/upload', authenticateToken, authorizeRoles('Admin', 'Teacher'), upload.single('file'), async (req, res) => {
  try {
    let { title, type, grade, stream_id, subject_id, language } = req.body;
    const file_path = req.file.path;
    
    console.log('Upload request:', { title, type, grade, stream_id, subject_id, user_role: req.user.role, user_id: req.user.id });
    
    // Auto-populate stream and subject for teachers
    if (req.user.role === 'Teacher') {
      const [teacher] = await db.execute(
        'SELECT subject_id, stream_id FROM Users WHERE id = ? AND role = "Teacher"',
        [req.user.id]
      );
      
      console.log('Teacher data:', teacher);
      
      if (teacher.length > 0) {
        stream_id = teacher[0].stream_id;
        subject_id = teacher[0].subject_id;
      }
      
      if (!grade) grade = 11;
    }

    console.log('Final values:', { grade, stream_id, subject_id });

    const [result] = await db.execute(
      'INSERT INTO StudyMaterials (title, type, file_path, uploaded_by, grade, stream_id, subject_id, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, type, file_path, req.user.id, grade, stream_id, subject_id, language || 'English']
    );

    res.status(201).json({ message: 'Material uploaded successfully', materialId: result.insertId });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;