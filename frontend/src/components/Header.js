import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div></div>
      <div className="user-info">
        {window.location.pathname === '/' ? (
          <>
            <span style={{ color: '#333', padding: '8px 16px' }}>Welcome, {user.full_name}!</span>
            <a href="/dashboard" style={{ background: '#667eea', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none' }}>Dashboard</a>
          </>
        ) : (
          <>
            <div className="user-details">
              <div className="user-name">{user.full_name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;