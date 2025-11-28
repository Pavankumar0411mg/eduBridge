import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [recentScores, setRecentScores] = useState([]);
  const [pendingAssignments, setPendingAssignments] = useState(0);

  useEffect(() => {
    if (user.role === 'Student') {
      fetchRecentScores();
      fetchPendingAssignments();
    }
  }, [user.role]);

  const fetchRecentScores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/quizzes/recent-scores', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecentScores(response.data);
    } catch (error) {
      console.error('Error fetching recent scores:', error);
    }
  };

  const fetchPendingAssignments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/assignments/student', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const pending = response.data.filter(assignment => !assignment.submission_id).length;
      setPendingAssignments(pending);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };
  const getDashboardCards = () => {
    const commonCards = [
      {
        title: 'Study Materials',
        description: 'Access PDFs, videos, and notes for your subjects',
        icon: '📚',
        link: '/materials'
      },
      {
        title: 'Online Classes',
        description: 'Join live classes and watch recorded sessions',
        icon: '🎥',
        link: '#'
      },
      {
        title: 'Discussion Forum',
        description: 'Ask questions and participate in discussions',
        icon: '💬',
        link: '/discussions'
      }
    ];

    const roleSpecificCards = {
      Admin: [
        {
          title: 'User Management',
          description: 'Manage teachers, students, and parents',
          icon: '👥',
          link: '/user-management'
        },
        {
          title: 'Content Management',
          description: 'Upload and organize study materials',
          icon: '📁',
          link: '/upload'
        },
        {
          title: 'Quiz Scores',
          description: 'View all student quiz performance',
          icon: '📊',
          link: '/quiz-scores'
        }
      ],
      Teacher: [
        {
          title: 'Create Quiz',
          description: 'Create and manage assessments',
          icon: '📝',
          link: '/create-quiz'
        },
        {
          title: 'Upload Materials',
          description: 'Upload study materials for students',
          icon: '📤',
          link: '/upload'
        },
        {
          title: 'Create Assignment',
          description: 'Create assignments for your students',
          icon: '📋',
          link: '/create-assignment'
        },
        {
          title: 'My Students',
          description: 'View students and their quiz scores',
          icon: '👨🎓',
          link: '/my-students'
        },
        {
          title: 'Assignments',
          description: 'View your created assignments',
          icon: '📄',
          link: '/assignments'
        }
      ],
      Student: [
        {
          title: 'Take Quizzes',
          description: 'Test your knowledge with subject quizzes',
          icon: '📝',
          link: '/quizzes'
        },
        {
          title: 'My Progress',
          description: 'View your academic progress and scores',
          icon: '📊',
          link: '/my-progress'
        },
        {
          title: 'Assignments',
          description: 'View and submit your assignments',
          icon: '📋',
          link: '/assignments'
        }
      ],
      Parent: [
        {
          title: 'Child Progress',
          description: 'Monitor your child\'s academic progress',
          icon: '👨‍👩‍👧‍👦',
          link: '#'
        },
        {
          title: 'Notifications',
          description: 'View important updates and announcements',
          icon: '🔔',
          link: '#'
        }
      ]
    };

    return [...commonCards, ...(roleSpecificCards[user.role] || [])];
  };

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back, {user.full_name}!</h1>
        <p className="welcome-subtitle">
          {user.role === 'Student' && user.grade && `Grade ${user.grade} • `}
          {user.role} Dashboard
        </p>
      </div>

      <div className="dashboard-grid">
        {getDashboardCards().map((card, index) => (
          <div key={index} className="dashboard-card">
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
            {card.link !== '#' && (
              <Link to={card.link} style={{ textDecoration: 'none' }}>
                <button className="download-btn" style={{ marginTop: '15px' }}>
                  Access
                </button>
              </Link>
            )}
          </div>
        ))}
      </div>

      {user.role === 'Student' && (
        <div style={{ marginTop: '30px', background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Quick Access</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>Pending Assignments</strong>
              <p style={{ margin: '5px 0 0 0', color: '#666' }}>{pendingAssignments} assignments due</p>
            </div>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <strong>Recent Scores</strong>
              {recentScores.length > 0 ? (
                <div style={{ margin: '5px 0 0 0' }}>
                  {recentScores.slice(0, 3).map((score, index) => (
                    <p key={index} style={{ margin: '2px 0', color: '#666', fontSize: '14px' }}>
                      {score.quiz_title}: {score.score}/{score.total_marks} ({score.percentage}%)
                    </p>
                  ))}
                </div>
              ) : (
                <p style={{ margin: '5px 0 0 0', color: '#666' }}>No recent quizzes</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;