import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const MyStudents = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchMyStudents();
    fetchQuizScores();
  }, []);

  const fetchMyStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/teachers/my-students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizScores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/teachers/student-scores', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizScores(response.data);
    } catch (error) {
      console.error('Error fetching quiz scores:', error);
    }
  };

  const getStudentScores = (studentId) => {
    return quizScores.filter(score => score.student_id === studentId);
  };

  const getAverageScore = (studentId) => {
    const scores = getStudentScores(studentId);
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum, score) => sum + parseFloat(score.percentage), 0);
    return Math.round(total / scores.length);
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">My Students</h1>
        <p>View students in your classes and their quiz performance</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          Loading students...
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          
          {/* Students List */}
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#f8f9fa', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
              <h3 style={{ margin: 0 }}>Students in Your Classes</h3>
            </div>
            
            <div style={{ padding: '20px' }}>
              {students.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>No students found in your assigned classes.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                  {students.map(student => (
                    <div 
                      key={student.id} 
                      style={{ 
                        border: '1px solid #e1e5e9', 
                        borderRadius: '8px', 
                        padding: '15px',
                        cursor: 'pointer',
                        background: selectedStudent?.id === student.id ? '#e3f2fd' : 'white'
                      }}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        {student.full_name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        Grade {student.grade} • {student.stream_name}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#888' }}>
                          {getStudentScores(student.id).length} quiz(es) taken
                        </span>
                        <span style={{ 
                          background: getAverageScore(student.id) >= 70 ? '#d4edda' : 
                                     getAverageScore(student.id) >= 50 ? '#fff3cd' : '#f8d7da',
                          color: getAverageScore(student.id) >= 70 ? '#155724' : 
                                getAverageScore(student.id) >= 50 ? '#856404' : '#721c24',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          Avg: {getAverageScore(student.id)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected Student Quiz Scores */}
          {selectedStudent && (
            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
                <h3 style={{ margin: 0 }}>Quiz Scores - {selectedStudent.full_name}</h3>
              </div>
              
              <div style={{ padding: '20px' }}>
                {getStudentScores(selectedStudent.id).length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666' }}>No quiz scores available for this student.</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Quiz</th>
                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Score</th>
                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Percentage</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getStudentScores(selectedStudent.id).map(score => (
                        <tr key={score.id} style={{ borderBottom: '1px solid #f1f3f4' }}>
                          <td style={{ padding: '12px' }}>{score.quiz_title}</td>
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
          )}
        </div>
      )}
    </div>
  );
};

export default MyStudents;