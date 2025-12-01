import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const UploadMaterial = ({ user }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'PDF',
    grade: 11,
    stream_id: '',
    subject_id: '',
    language: 'English'
  });
  const [file, setFile] = useState(null);
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user.role === 'Teacher') {
      fetchTeacherSubjects();
    } else {
      fetchStreams();
    }
  }, [user.role]);

  useEffect(() => {
    if (formData.stream_id) {
      fetchSubjects(formData.stream_id);
    }
  }, [formData.stream_id]);

  const fetchStreams = async () => {
    try {
      const response = await axios.get('/api/streams');
      setStreams(response.data);
    } catch (error) {
      console.error('Error fetching streams:', error);
    }
  };

  const fetchTeacherSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Get teacher's auto-populate data
      const teacherDataResponse = await axios.get('/api/materials/teacher-data', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const teacherData = teacherDataResponse.data;
      
      // Get teacher subjects for grade options
      const response = await axios.get('/api/materials/teacher-subjects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeacherSubjects(response.data.subjects || response.data);
      
      // Auto-populate form with teacher's data
      const autoFormData = {
        title: '',
        type: 'PDF',
        grade: 11, // Default to grade 11
        stream_id: teacherData.stream_id,
        subject_id: teacherData.subject_id,
        language: 'English'
      };
      
      setFormData(autoFormData);
      
      // Set streams and subjects for display
      setStreams([{ id: teacherData.stream_id, name: teacherData.stream_name }]);
      setSubjects([{ id: teacherData.subject_id, name: teacherData.subject_name }]);
      
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      // Fallback to old method if new endpoint fails
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/materials/teacher-subjects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTeacherSubjects(response.data.subjects || response.data);
        
        const subjects = response.data.subjects || response.data;
        if (subjects.length > 0) {
          const uniqueStreams = [...new Set(subjects.map(item => ({ id: item.stream_id, name: item.stream_name })))];
          setStreams(uniqueStreams);
          
          if (uniqueStreams.length === 1) {
            const streamSubjects = subjects
              .filter(item => item.stream_id === uniqueStreams[0].id)
              .map(item => ({ id: item.subject_id, name: item.subject_name }));
            setSubjects(streamSubjects);
            
            setFormData(prev => ({
              ...prev,
              stream_id: uniqueStreams[0].id,
              subject_id: streamSubjects.length === 1 ? streamSubjects[0].id : ''
            }));
          }
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
      }
    }
  };

  const fetchSubjects = async (streamId) => {
    try {
      if (user.role === 'Teacher') {
        // Filter teacher's subjects by selected stream
        const filteredSubjects = teacherSubjects
          .filter(item => item.stream_id == streamId)
          .map(item => ({ id: item.subject_id, name: item.subject_name }));
        setSubjects(filteredSubjects);
      } else {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/streams/${streamId}/subjects`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubjects(response.data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
      ...(e.target.name === 'stream_id' && { subject_id: '' })
    };
    
    setFormData(newFormData);
    
    // Auto-select subject if only one available for selected stream
    if (e.target.name === 'stream_id' && user.role === 'Teacher') {
      const streamSubjects = teacherSubjects
        .filter(item => item.stream_id == e.target.value)
        .map(item => ({ id: item.subject_id, name: item.subject_name }));
      
      if (streamSubjects.length === 1) {
        setFormData(prev => ({
          ...prev,
          stream_id: e.target.value,
          subject_id: streamSubjects[0].id
        }));
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setLoading(true);
    setMessage('');

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('title', formData.title);
    uploadData.append('type', formData.type);
    uploadData.append('grade', formData.grade);
    uploadData.append('stream_id', formData.stream_id);
    uploadData.append('subject_id', formData.subject_id);
    uploadData.append('language', formData.language);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/materials/upload', uploadData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMessage('Material uploaded successfully!');
      
      // Reset form but keep auto-populated values for teachers
      if (user.role === 'Teacher') {
        setFormData(prev => ({
          ...prev,
          title: '',
          type: 'PDF',
          language: 'English'
          // Keep stream_id, subject_id, and grade as they are auto-populated
        }));
      } else {
        setFormData({
          title: '',
          type: 'PDF',
          grade: 11,
          stream_id: '',
          subject_id: '',
          language: 'English'
        });
      }
      
      setFile(null);
      document.getElementById('fileInput').value = '';
    } catch (error) {
      setMessage('Upload failed: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      <div className="page-header">
        <h1 className="page-title">Upload Study Material</h1>
        <p>Add new learning resources for students</p>
      </div>

      {message && (
        <div style={{ 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          background: message.includes('success') ? '#d4edda' : '#f8d7da',
          color: message.includes('success') ? '#155724' : '#721c24'
        }}>
          {message}
        </div>
      )}

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter material title"
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="PDF">PDF Document</option>
              <option value="Video">Video</option>
              <option value="Notes">Notes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Grade {user.role === 'Teacher' && <span style={{color: '#28a745', fontSize: '12px'}}>(Can be changed)</span>}</label>
            <select name="grade" value={formData.grade} onChange={handleChange}>
              {user.role === 'Teacher' ? (
                // Teachers can upload for both grades
                <>
                  <option value={11}>Grade 11</option>
                  <option value={12}>Grade 12</option>
                </>
              ) : (
                // Admin can select any grade
                <>
                  <option value={11}>Grade 11</option>
                  <option value={12}>Grade 12</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Stream {user.role === 'Teacher' && <span style={{color: '#28a745', fontSize: '12px'}}>(Auto-populated from your profile)</span>}</label>
            <select name="stream_id" value={formData.stream_id} onChange={handleChange} required disabled={user.role === 'Teacher'}>
              {streams.map(stream => (
                <option key={stream.id} value={stream.id}>{stream.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subject {user.role === 'Teacher' && <span style={{color: '#28a745', fontSize: '12px'}}>(Auto-populated from your profile)</span>}</label>
            <select name="subject_id" value={formData.subject_id} onChange={handleChange} required disabled={user.role === 'Teacher'}>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>
            <select name="language" value={formData.language} onChange={handleChange}>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Regional">Regional Language</option>
            </select>
          </div>

          <div className="form-group">
            <label>File</label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.mp4,.avi,.mov,.doc,.docx,.ppt,.pptx"
              required
              style={{ padding: '10px', border: '2px solid #e1e5e9', borderRadius: '8px', width: '100%' }}
            />
            <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
              Supported formats: PDF, Video (MP4, AVI, MOV), Documents (DOC, PPT)
            </small>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Material'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterial;