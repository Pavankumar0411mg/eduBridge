import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

const TakeQuiz = ({ user }) => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft]);

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [quizResponse, questionsResponse] = await Promise.all([
        axios.get(`/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`/api/quizzes/${quizId}/questions`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setQuiz(quizResponse.data);
      setQuestions(questionsResponse.data);
      setTimeLeft(quizResponse.data.time_limit * 60); // Convert to seconds
    } catch (error) {
      console.error('Error fetching quiz:', error);
      navigate('/quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/quizzes/${quizId}/submit`, 
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setQuizResult(response.data);
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="materials-page">
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          Loading quiz...
        </div>
      </div>
    );
  }

  if (quizCompleted && quizResult) {
    return (
      <div className="materials-page">
        <BackButton to="/quizzes" />
        <div style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          margin: '50px auto'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ color: '#28a745', marginBottom: '20px' }}>Quiz Completed!</h2>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Your Score</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              {quizResult.score} / {quizResult.totalMarks}
            </div>
            <div style={{ fontSize: '18px', color: '#666', marginTop: '5px' }}>
              ({quizResult.percentage}%)
            </div>
          </div>
          <button 
            onClick={() => navigate('/quizzes')}
            className="login-btn"
            style={{ width: 'auto', padding: '12px 30px' }}
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="materials-page">
      <BackButton to="/quizzes" />
      
      {/* Quiz Header */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">{quiz.title}</h1>
            <p>{quiz.subject_name} • Grade {quiz.grade}</p>
          </div>
          <div style={{ 
            background: timeLeft < 300 ? '#dc3545' : '#28a745', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Time: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Questions */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        {questions.map((question, index) => (
          <div key={question.id} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              {index + 1}. {question.question_text}
            </h3>
            
            <div style={{ display: 'grid', gap: '10px' }}>
              {['A', 'B', 'C', 'D'].map(option => (
                <label 
                  key={option}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    padding: '10px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: answers[question.id] === option ? '#e3f2fd' : 'white'
                  }}
                >
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                  <span>{option}. {question[`option_${option.toLowerCase()}`]}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="login-btn"
            style={{ width: 'auto', padding: '12px 30px' }}
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;