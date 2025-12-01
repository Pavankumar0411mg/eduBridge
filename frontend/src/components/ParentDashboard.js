import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ParentDashboard.css';

const ParentDashboard = () => {
  const [childProgress, setChildProgress] = useState([]);
  const [childStats, setChildStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildProgress();
    fetchChildStats();
  }, []);

  const fetchChildProgress = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`/api/parent/child-progress/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setChildProgress(response.data.progress);
    } catch (error) {
      console.error('Error fetching child progress:', error);
    }
  };

  const fetchChildStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`/api/parent/child-stats/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setChildStats(response.data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching child stats:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#f44336';
  };

  if (loading) {
    return <div className="loading">Loading child progress...</div>;
  }

  return (
    <div className="parent-dashboard">
      <h2>Child Progress Dashboard</h2>
      
      {/* Child Statistics */}
      <div className="stats-section">
        <h3>Overall Statistics</h3>
        {childStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h4>{stat.student_name}</h4>
            <p>Stream: {stat.stream_name}</p>
            <p>Total Quizzes: {stat.total_quizzes}</p>
            <p>Average Score: {Math.round(stat.average_percentage)}%</p>
          </div>
        ))}
      </div>

      {/* Quiz Results */}
      <div className="progress-section">
        <h3>Recent Quiz Results</h3>
        {childProgress.length === 0 ? (
          <p>No quiz results found.</p>
        ) : (
          <div className="progress-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Quiz</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {childProgress.map((result) => (
                  <tr key={result.id}>
                    <td>{formatDate(result.completedAt)}</td>
                    <td>{result.studentName}</td>
                    <td>{result.quizTitle}</td>
                    <td>{result.subject}</td>
                    <td>{result.score}/{result.totalQuestions}</td>
                    <td style={{ color: getScoreColor(result.percentage) }}>
                      {result.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;