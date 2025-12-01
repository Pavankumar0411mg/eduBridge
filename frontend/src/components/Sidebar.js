import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user, onLogout, onToggle }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) onToggle(newState);
  };

  const menuItems = {
    Student: [
      { icon: '🏠', label: 'Home', path: '/' },
      { icon: '📊', label: 'Dashboard', path: '/dashboard' },
      { icon: '📚', label: 'Study Materials', path: '/materials' },
      { icon: '📝', label: 'Take Quizzes', path: '/quizzes' },
      { icon: '📋', label: 'Assignments', path: '/assignments' },
      { icon: '🎯', label: 'My Grades', path: '/assignment-grades' },
      { icon: '💬', label: 'Discussion Forum', path: '/discussions' },
      { icon: '📈', label: 'My Progress', path: '/my-progress' },
      { icon: '⚙️', label: 'Settings', path: '/settings' }
    ],
    Admin: [
      { icon: '🏠', label: 'Home', path: '/' },
      { icon: '📊', label: 'Dashboard', path: '/dashboard' },
      { icon: '📤', label: 'Upload Materials', path: '/upload' },
      { icon: '📈', label: 'Quiz Scores', path: '/quiz-scores' },
      { icon: '👥', label: 'User Management', path: '/user-management' },
      { icon: '💬', label: 'Discussion Forum', path: '/discussions' },
      { icon: '⚙️', label: 'Settings', path: '/settings' }
    ],
    Teacher: [
      { icon: '🏠', label: 'Home', path: '/' },
      { icon: '📊', label: 'Dashboard', path: '/dashboard' },
      { icon: '📤', label: 'Upload Materials', path: '/upload' },
      { icon: '📚', label: 'Study Materials', path: '/materials' },
      { icon: '📝', label: 'Create Quiz', path: '/create-quiz' },
      { icon: '📋', label: 'Create Assignment', path: '/create-assignment' },
      { icon: '📄', label: 'Assignments', path: '/assignments' },
      { icon: '👨🎓', label: 'My Students', path: '/my-students' },
      { icon: '💬', label: 'Discussion Forum', path: '/discussions' },
      { icon: '⚙️', label: 'Settings', path: '/settings' }
    ],
    Parent: [
      { icon: '🏠', label: 'Home', path: '/' },
      { icon: '📊', label: 'Dashboard', path: '/dashboard' },
      { icon: '👶', label: 'Child Progress', path: '/child-progress' },
      { icon: '💬', label: 'Discussion Forum', path: '/discussions' },
      { icon: '📈', label: 'Academic Reports', path: '#' },
      { icon: '⚙️', label: 'Settings', path: '/settings' }
    ]
  };

  const currentMenuItems = menuItems[user?.role] || menuItems.Student;

  return (
    <>
      {/* Logo behind menu when collapsed */}
      {isCollapsed && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '70px',
          zIndex: 1000,
          color: '#667eea',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          eduBridge
        </div>
      )}
      
      {/* Hamburger Menu Button */}
      <button
        onClick={handleToggle}
        style={{
          position: 'fixed',
          top: '20px',
          left: isCollapsed ? '20px' : '270px',
          zIndex: 1001,
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px',
          cursor: 'pointer',
          fontSize: '18px',
          transition: 'left 0.3s ease'
        }}
      >
        {isCollapsed ? '☰' : '✕'}
      </button>

      {/* Sidebar */}
      <div style={{
        width: isCollapsed ? '0' : '250px',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        transition: 'width 0.3s ease',
        visibility: isCollapsed ? 'hidden' : 'visible',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
      className="sidebar-scroll">
      {/* Logo Section */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 10px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          eB
        </div>
        <h2 style={{ margin: 0, fontSize: '18px' }}>eduBridge</h2>
      </div>

      {/* User Info */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
          {user?.full_name}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>
          {user?.role}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{ flex: 1, padding: '20px 0' }}>
        {currentMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '12px 20px',
              color: 'white',
              textDecoration: 'none',
              background: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid white' : '4px solid transparent',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== item.path) {
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== item.path) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ fontSize: '14px' }}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          🚪 Logout
        </button>
      </div>
      </div>
    </>
  );
};

export default Sidebar;