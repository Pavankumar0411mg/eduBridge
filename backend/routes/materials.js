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

// Get teacher's assigned subjects
router.get('/teacher-subjects', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    const teacherId = req.user.id;
    const [subjects] = await db.execute(`
      SELECT ts.*, s.name as subject_name, st.name as stream_name
      FROM TeacherSubjects ts
      JOIN Subjects s ON ts.subject_id = s.id
      JOIN Streams st ON ts.stream_id = st.id
      WHERE ts.teacher_id = ?
    `, [teacherId]);
    
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher subjects', error: error.message });
  }
});

// Upload material
router.post('/upload', authenticateToken, authorizeRoles('Admin', 'Teacher'), upload.single('file'), async (req, res) => {
  try {
    const { title, type, grade, stream_id, subject_id, language } = req.body;
    const file_path = req.file.path;
    
    // Check if teacher is authorized for this subject (only for teachers)
    if (req.user.role === 'Teacher') {
      const [teacherSubjects] = await db.execute(
        'SELECT * FROM TeacherSubjects WHERE teacher_id = ? AND subject_id = ? AND grade = ? AND stream_id = ?',
        [req.user.id, subject_id, grade, stream_id]
      );
      
      if (teacherSubjects.length === 0) {
        return res.status(403).json({ message: 'You are not authorized to upload materials for this subject/grade/stream' });
      }
    }

    const [result] = await db.execute(
      'INSERT INTO StudyMaterials (title, type, file_path, uploaded_by, grade, stream_id, subject_id, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, type, file_path, req.user.id, grade, stream_id, subject_id, language || 'English']
    );

    res.status(201).json({ message: 'Material uploaded successfully', materialId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;