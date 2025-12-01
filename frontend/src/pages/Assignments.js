import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const Assignments = ({ user }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionFile, setSubmissionFile] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [grading, setGrading] = useState({});

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = user.role === 'Teacher' 
        ? 'http://localhost:5000/api/assignments/teacher' 
        : 'http://localhost:5000/api/assignments/student';
      
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      alert('Error fetching assignments: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (assignmentId, file) => {
    setSubmissionFile({
      ...submissionFile,
      [assignmentId]: file
    });
  };

  const submitAssignment = async (assignmentId) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('submissionFile', submissionFile[assignmentId]);

      const response = await axios.post(`http://localhost:5000/api/assignments/submit/${assignmentId}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Assignment submitted successfully!');
      fetchAssignments();
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Network error';
      alert('Error submitting assignment: ' + errorMessage);
    }
  };

  const viewSubmissions = async (assignmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/assignments/${assignmentId}/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(response.data);
      setSelectedAssignment(assignmentId);
    } catch (error) {
      console.error('Submissions error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Network error';
      alert('Error fetching submissions: ' + errorMessage);
    }
  };

  const gradeSubmission = async (submissionId) => {
    try {
      const token = localStorage.getItem('token');
      const { grade, feedback } = grading[submissionId] || {};
      
      await axios.put(`http://localhost:5000/api/assignments/grade/${submissionId}`, { grade, feedback }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('Assignment graded successfully!');
      viewSubmissions(selectedAssignment);
    } catch (error) {
      alert('Error grading assignment: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleGradingChange = (submissionId, field, value) => {
    setGrading({
      ...grading,
      [submissionId]: {
        ...grading[submissionId],
        [field]: value
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading assignments...</div>;
  }

  if (selectedAssignment && user.role === 'Teacher') {
    return (
      <div className="materials-page">
        <button onClick={() => setSelectedAssignment(null)} className="btn btn-secondary" style={{ marginBottom: '20px' }}>
          ← Back to Assignments
        </button>
        
        <div className="page-header">
          <h1 className="page-title">Assignment Submissions</h1>
          <p>Grade student submissions</p>
        </div>

        {submissions.length === 0 ? (
          <div className="no-materials">
            <p>No submissions yet.</p>
          </div>
        ) : (
          <div className="materials-grid">
            {submissions.map((submission) => (
              <div key={submission.id} className="material-card">
                <div className="material-header">
                  <h3>{submission.student_name}</h3>
                  <span className="material-type">Submission</span>
                </div>
                
                <div className="material-info">
                  <p><strong>Submitted:</strong> {formatDate(submission.submitted_at)}</p>
                  {submission.grade_received && (
                    <p><strong>Grade:</strong> {submission.grade_received}</p>
                  )}
                </div>

                <div className="material-actions">
                  <a 
                    href={`http://localhost:5000/${submission.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginBottom: '10px' }}
                  >
                    View Submission
                  </a>
                  
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="number"
                      placeholder="Grade (0-100)"
                      value={grading[submission.id]?.grade || ''}
                      onChange={(e) => handleGradingChange(submission.id, 'grade', e.target.value)}
                      style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
                    />
                    <textarea
                      placeholder="Feedback (optional)"
                      value={grading[submission.id]?.feedback || ''}
                      onChange={(e) => handleGradingChange(submission.id, 'feedback', e.target.value)}
                      rows="2"
                      style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
                    />
                    <button
                      onClick={() => gradeSubmission(submission.id)}
                      className="btn btn-success"
                      style={{ width: '100%' }}
                    >
                      Grade Assignment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">
          {user.role === 'Teacher' ? 'My Assignments' : 'Assignments'}
        </h1>
        <p>
          {user.role === 'Teacher' 
            ? 'Manage your created assignments' 
            : 'View and submit your assignments'
          }
        </p>
      </div>

      {assignments.length === 0 ? (
        <div className="no-materials">
          <p>No assignments available.</p>
        </div>
      ) : (
        <div className="materials-grid">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="material-card">
              <div className="material-header">
                <h3>{assignment.title}</h3>
                <span className="material-type">Assignment</span>
              </div>
              
              <div className="material-info">
                <p><strong>Subject:</strong> {assignment.subject_name}</p>
                {user.role === 'Student' && (
                  <p><strong>Teacher:</strong> {assignment.teacher_name}</p>
                )}
                {user.role === 'Teacher' && (
                  <p><strong>Submissions:</strong> {assignment.submissions_count}</p>
                )}
                <p><strong>Due Date:</strong> {formatDate(assignment.due_date)}</p>
                <p><strong>Created:</strong> {formatDate(assignment.created_at)}</p>
              </div>

              {assignment.description && (
                <div className="material-description">
                  <p>{assignment.description}</p>
                </div>
              )}

              <div className="material-actions">
                <a 
                  href={`http://localhost:5000/${assignment.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download Assignment
                </a>
                
                {user.role === 'Teacher' && (
                  <button
                    onClick={() => viewSubmissions(assignment.id)}
                    className="btn btn-secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    View Submissions ({assignment.submissions_count || 0})
                  </button>
                )}

                {user.role === 'Student' && (
                  <div style={{ marginTop: '10px' }}>
                    {assignment.submission_id ? (
                      <div className="submission-status">
                        <span style={{ color: 'green', fontWeight: 'bold' }}>
                          ✓ Completed Assignment
                        </span>
                        <p style={{ fontSize: '12px', color: '#666' }}>Submitted on {formatDate(assignment.submitted_at)}</p>
                        {assignment.grade_received && (
                          <div>
                            <p><strong>Grade:</strong> {assignment.grade_received}/100</p>
                            {assignment.feedback && (
                              <p><strong>Feedback:</strong> {assignment.feedback}</p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="submission-form">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.png"
                          onChange={(e) => handleFileChange(assignment.id, e.target.files[0])}
                          style={{ marginBottom: '10px' }}
                        />
                        <button
                          onClick={() => submitAssignment(assignment.id)}
                          disabled={!submissionFile[assignment.id]}
                          className="btn btn-success"
                          style={{ width: '100%' }}
                        >
                          Submit Assignment
                        </button>
                      </div>
                    )}
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

export default Assignments;