import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const CreateQuiz = ({ user }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    time_limit: 30
  });
  const [questions, setQuestions] = useState([{
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A',
    marks: 1
  }]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeacherSubjects();
  }, []);

  const fetchTeacherSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/materials/teacher-subjects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeacherSubjects(response.data);
      

    } catch (error) {
      console.error('Error fetching teacher subjects:', error);
    }
  };

  const handleQuizChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 'A',
      marks: 1
    }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Calculate total marks
      const totalMarks = questions.reduce((sum, q) => sum + parseInt(q.marks), 0);
      
      const quizPayload = {
        ...quizData,
        total_marks: totalMarks,
        questions: questions
      };

      await axios.post('/api/teachers/create-quiz', quizPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Quiz created successfully!');
      
      // Reset form
      setQuizData({
        title: '',
        description: '',
        time_limit: 30
      });
      setQuestions([{
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'A',
        marks: 1
      }]);
    } catch (error) {
      alert('Error creating quiz: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const getSubjectOptions = () => {
    return [...new Set(teacherSubjects.map(ts => ({
      id: ts.subject_id,
      name: ts.subject_name,
      grade: ts.grade,
      stream_id: ts.stream_id
    })))];
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">Create Quiz</h1>
        <p>Create and manage assessments for your students</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        
        {/* Quiz Details */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Quiz Details</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label>Quiz Title</label>
              <input
                type="text"
                name="title"
                value={quizData.title}
                onChange={handleQuizChange}
                placeholder="e.g., Physics Chapter 1 Test"
                required
              />
            </div>

            <div className="form-group">
              <label>Time Limit (minutes)</label>
              <input
                type="number"
                name="time_limit"
                value={quizData.time_limit}
                onChange={handleQuizChange}
                min="5"
                max="180"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={quizData.description}
              onChange={handleQuizChange}
              placeholder="Brief description of the quiz content"
              rows="3"
            />
          </div>


        </div>

        {/* Questions */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Questions ({questions.length})</h3>
            <button
              type="button"
              onClick={addQuestion}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              + Add Question
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={index} style={{ 
              border: '1px solid #e1e5e9', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fafbfc'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ margin: 0 }}>Question {index + 1}</h4>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-group">
                <label>Question Text</label>
                <textarea
                  value={question.question_text}
                  onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)}
                  placeholder="Enter your question here..."
                  rows="2"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                <div className="form-group">
                  <label>Option A</label>
                  <input
                    type="text"
                    value={question.option_a}
                    onChange={(e) => handleQuestionChange(index, 'option_a', e.target.value)}
                    placeholder="Option A"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Option B</label>
                  <input
                    type="text"
                    value={question.option_b}
                    onChange={(e) => handleQuestionChange(index, 'option_b', e.target.value)}
                    placeholder="Option B"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Option C</label>
                  <input
                    type="text"
                    value={question.option_c}
                    onChange={(e) => handleQuestionChange(index, 'option_c', e.target.value)}
                    placeholder="Option C"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Option D</label>
                  <input
                    type="text"
                    value={question.option_d}
                    onChange={(e) => handleQuestionChange(index, 'option_d', e.target.value)}
                    placeholder="Option D"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Correct Answer</label>
                  <select
                    value={question.correct_answer}
                    onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                    required
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Marks</label>
                  <input
                    type="number"
                    value={question.marks}
                    onChange={(e) => handleQuestionChange(index, 'marks', parseInt(e.target.value))}
                    min="1"
                    max="10"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            disabled={loading}
            className="login-btn"
            style={{ width: 'auto', padding: '12px 30px' }}
          >
            {loading ? 'Creating Quiz...' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;