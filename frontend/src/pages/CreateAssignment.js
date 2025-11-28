import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const CreateAssignment = () => {
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    due_date: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAssignmentData({
      ...assignmentData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('title', assignmentData.title);
      formData.append('description', assignmentData.description);
      formData.append('due_date', assignmentData.due_date);
      formData.append('assignmentFile', file);

      await axios.post('/api/assignments/create', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Assignment created successfully!');
      
      // Reset form
      setAssignmentData({
        title: '',
        description: '',
        due_date: ''
      });
      setFile(null);
    } catch (error) {
      alert('Error creating assignment: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">Create Assignment</h1>
        <p>Upload assignments for your students</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        
        <div className="form-group">
          <label>Assignment Title</label>
          <input
            type="text"
            name="title"
            value={assignmentData.title}
            onChange={handleChange}
            placeholder="e.g., Physics Chapter 1 Assignment"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={assignmentData.description}
            onChange={handleChange}
            placeholder="Brief description of the assignment"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="datetime-local"
            name="due_date"
            value={assignmentData.due_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Assignment File (PDF/Word)</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            disabled={loading}
            className="login-btn"
            style={{ width: 'auto', padding: '12px 30px' }}
          >
            {loading ? 'Creating Assignment...' : 'Create Assignment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;