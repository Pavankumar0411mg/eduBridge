import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const AssignmentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/assignments/student/grades', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
      alert('Error fetching grades: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getGradeColor = (grade, maxMarks) => {
    const percentage = (grade / maxMarks) * 100;
    if (percentage >= 90) return '#4CAF50'; // Green
    if (percentage >= 75) return '#FF9800'; // Orange
    if (percentage >= 60) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  if (loading) {
    return <div className="loading">Loading grades...</div>;
  }

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">My Assignment Grades</h1>
        <p>View your graded assignments and feedback</p>
      </div>

      {grades.length === 0 ? (
        <div className="no-materials">
          <p>No graded assignments yet.</p>
        </div>
      ) : (
        <div className="materials-grid">
          {grades.map((grade, index) => (
            <div key={index} className="material-card">
              <div className="material-header">
                <h3>{grade.assignment_title}</h3>
                <span className="material-type">{grade.subject_name}</span>
              </div>
              
              <div className="material-info">
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: getGradeColor(grade.grade_received, grade.max_marks),
                  textAlign: 'center',
                  margin: '10px 0'
                }}>
                  {grade.grade_received}/{grade.max_marks}
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    ({Math.round((grade.grade_received / grade.max_marks) * 100)}%)
                  </div>
                </div>
                
                <p><strong>Submitted:</strong> {formatDate(grade.submitted_at)}</p>
                <p><strong>Graded:</strong> {formatDate(grade.graded_at)}</p>
                
                {grade.feedback && (
                  <div className="material-description">
                    <strong>Teacher Feedback:</strong>
                    <p style={{ 
                      backgroundColor: '#f5f5f5', 
                      padding: '10px', 
                      borderRadius: '5px',
                      marginTop: '5px'
                    }}>
                      {grade.feedback}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentGrades;