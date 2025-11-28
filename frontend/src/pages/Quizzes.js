import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

const Quizzes = ({ user }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      
      if (user.grade) params.append('grade', user.grade);
      if (user.stream_id) params.append('stream_id', user.stream_id);
      if (user.role === 'Student') params.append('student_id', user.id);

      console.log('Fetching quizzes with params:', params.toString());
      console.log('User ID:', user.id, 'Role:', user.role);

      const response = await axios.get(`/api/quizzes?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Quiz response:', response.data);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      <div className="page-header">
        <h1 className="page-title">Available Quizzes</h1>
        <p>Test your knowledge with subject-specific quizzes</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          Loading quizzes...
        </div>
      ) : (
        <div className="materials-grid">
          {quizzes.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#666' }}>
              No quizzes available for your stream and grade.
            </div>
          ) : (
            quizzes.map(quiz => (
              <div key={quiz.id} className="material-card">
                <div className="material-type" style={{ backgroundColor: '#e3f2fd' }}>
                  Quiz
                </div>
                <h3 className="material-title">{quiz.title}</h3>
                <div className="material-meta">
                  {quiz.subject_name} • Grade {quiz.grade}
                  <br />
                  <small>Time: {quiz.time_limit} minutes • Marks: {quiz.total_marks}</small>
                  <br />
                  <small style={{ color: '#666' }}>{quiz.description}</small>
                </div>
                {quiz.completed ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span style={{ 
                      padding: '8px 16px', 
                      background: '#28a745', 
                      color: 'white', 
                      borderRadius: '6px', 
                      textAlign: 'center',
                      fontSize: '14px'
                    }}>
                      ✓ Completed
                    </span>
                    <small style={{ color: '#666', textAlign: 'center' }}>
                      Score: {quiz.score}/{quiz.total_marks} ({quiz.percentage}%)
                    </small>
                  </div>
                ) : (
                  <Link 
                    to={`/quiz/${quiz.id}`}
                    className="download-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    Take Quiz
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Quizzes;