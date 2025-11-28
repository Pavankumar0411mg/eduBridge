import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const ChildProgress = ({ user }) => {
  const [child, setChild] = useState(null);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildProgress();
  }, []);

  const fetchChildProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/parents/child-progress', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setChild(response.data.child);
      setScores(response.data.scores);
    } catch (error) {
      console.error('Error fetching child progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAverageScore = () => {
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, score) => sum + parseFloat(score.percentage), 0);
    return Math.round(total / scores.length);
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">Child Progress</h1>
        <p>Monitor your child's academic performance</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          Loading progress...
        </div>
      ) : !child ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          No child account linked to your profile.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          
          {/* Child Information */}
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#f8f9fa', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
              <h3 style={{ margin: 0 }}>Student Information</h3>
            </div>
            
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <strong>Name:</strong> {child.full_name}
                </div>
                <div>
                  <strong>Grade:</strong> {child.grade}
                </div>
                <div>
                  <strong>Stream:</strong> {child.stream_name}
                </div>
                <div>
                  <strong>Average Score:</strong> 
                  <span style={{ 
                    marginLeft: '10px',
                    background: getAverageScore() >= 70 ? '#d4edda' : 
                               getAverageScore() >= 50 ? '#fff3cd' : '#f8d7da',
                    color: getAverageScore() >= 70 ? '#155724' : 
                          getAverageScore() >= 50 ? '#856404' : '#721c24',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {getAverageScore()}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Scores */}
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#f8f9fa', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
              <h3 style={{ margin: 0 }}>Quiz Performance ({scores.length} quizzes taken)</h3>
            </div>
            
            <div style={{ padding: '20px' }}>
              {scores.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>No quiz scores available yet.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Quiz</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Subject</th>
                      <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Score</th>
                      <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Percentage</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map(score => (
                      <tr key={score.id} style={{ borderBottom: '1px solid #f1f3f4' }}>
                        <td style={{ padding: '12px' }}>{score.quiz_title}</td>
                        <td style={{ padding: '12px' }}>{score.subject_name}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          {score.score}/{score.total_marks}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <span style={{ 
                            background: score.percentage >= 70 ? '#d4edda' : 
                                       score.percentage >= 50 ? '#fff3cd' : '#f8d7da',
                            color: score.percentage >= 70 ? '#155724' : 
                                  score.percentage >= 50 ? '#856404' : '#721c24',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}>
                            {score.percentage}%
                          </span>
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#666' }}>
                          {new Date(score.completed_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildProgress;