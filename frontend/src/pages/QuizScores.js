import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const QuizScores = ({ user }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/quiz-scores', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScores(response.data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      <div className="page-header">
        <h1 className="page-title">Quiz Scores</h1>
        <p>View all student quiz performance</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          Loading scores...
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Quiz</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Subject</th>
                <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Score</th>
                <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Percentage</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
                    No quiz scores available
                  </td>
                </tr>
              ) : (
                scores.map(score => (
                  <tr key={score.id} style={{ borderBottom: '1px solid #f1f3f4' }}>
                    <td style={{ padding: '15px' }}>{score.student_name}</td>
                    <td style={{ padding: '15px' }}>{score.quiz_title}</td>
                    <td style={{ padding: '15px' }}>{score.subject_name}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{ 
                        background: score.percentage >= 70 ? '#d4edda' : score.percentage >= 50 ? '#fff3cd' : '#f8d7da',
                        color: score.percentage >= 70 ? '#155724' : score.percentage >= 50 ? '#856404' : '#721c24',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}>
                        {score.score}/{score.total_marks}
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <strong style={{ 
                        color: score.percentage >= 70 ? '#28a745' : score.percentage >= 50 ? '#ffc107' : '#dc3545'
                      }}>
                        {score.percentage}%
                      </strong>
                    </td>
                    <td style={{ padding: '15px', color: '#666', fontSize: '14px' }}>
                      {new Date(score.completed_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuizScores;