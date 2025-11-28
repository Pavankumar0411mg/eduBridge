import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const StudentProgress = ({ user }) => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/progress/student', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProgressData(response.data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBarChart = (data, title) => {
    if (!data || data.length === 0) return null;
    
    const maxScore = Math.max(...data.map(item => item.percentage));
    
    return (
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'end', gap: '10px', height: '200px' }}>
          {data.slice(0, 10).map((attempt, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  width: '100%',
                  height: `${(attempt.percentage / maxScore) * 150}px`,
                  background: attempt.percentage >= 80 ? '#28a745' : 
                            attempt.percentage >= 60 ? '#ffc107' : '#dc3545',
                  borderRadius: '4px 4px 0 0',
                  minHeight: '20px',
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                {Math.round(attempt.percentage)}%
              </div>
              <div style={{ fontSize: '10px', marginTop: '5px', textAlign: 'center' }}>
                Quiz {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSubjectChart = (subjectData) => {
    const subjects = Object.keys(subjectData);
    if (subjects.length === 0) return null;

    return (
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Subject-wise Performance</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {subjects.map(subject => (
            <div key={subject} style={{ 
              flex: '1', 
              minWidth: '150px',
              textAlign: 'center',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                {subject}
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: subjectData[subject].average >= 80 ? '#28a745' : 
                       subjectData[subject].average >= 60 ? '#ffc107' : '#dc3545'
              }}>
                {Math.round(subjectData[subject].average)}%
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {subjectData[subject].total} quizzes
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="materials-page">
        <BackButton to="/dashboard" />
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading progress data...</div>
      </div>
    );
  }

  if (!progressData) {
    return (
      <div className="materials-page">
        <BackButton to="/dashboard" />
        <div style={{ textAlign: 'center', padding: '50px' }}>No progress data available</div>
      </div>
    );
  }

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">📊 My Progress</h1>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
            {progressData.totalQuizzes}
          </div>
          <div style={{ color: '#666' }}>Total Quizzes Attended</div>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold',
            color: progressData.averageScore >= 80 ? '#28a745' : 
                   progressData.averageScore >= 60 ? '#ffc107' : '#dc3545'
          }}>
            {progressData.averageScore}%
          </div>
          <div style={{ color: '#666' }}>Average Score</div>
        </div>
      </div>

      {/* Subject Performance */}
      {renderSubjectChart(progressData.subjectPerformance)}

      {/* Quiz Performance Chart */}
      {renderBarChart(progressData.attempts, 'Recent Quiz Performance')}

      {/* Recent Quiz Attempts */}
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: '#f8f9fa', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
          <h3 style={{ margin: 0 }}>Recent Quiz Attempts</h3>
        </div>
        
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {progressData.attempts.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              No quiz attempts yet
            </div>
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
                {progressData.attempts.map((attempt, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f4' }}>
                      {attempt.quiz_title}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f4' }}>
                      {attempt.subject_name}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #f1f3f4' }}>
                      {attempt.score}/{attempt.total_marks}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'center', 
                      borderBottom: '1px solid #f1f3f4',
                      color: attempt.percentage >= 80 ? '#28a745' : 
                             attempt.percentage >= 60 ? '#ffc107' : '#dc3545',
                      fontWeight: 'bold'
                    }}>
                      {attempt.percentage}%
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f1f3f4' }}>
                      {new Date(attempt.completed_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;