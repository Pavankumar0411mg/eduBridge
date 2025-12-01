import React, { useState, useEffect } from 'react';

const NotificationBell = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    if (user && user.role === 'Student') {
      fetchNotifications();
      fetchNotificationCount();
      
      // Refresh every 5 minutes
      const interval = setInterval(() => {
        fetchNotifications();
        fetchNotificationCount();
      }, 300000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchNotificationCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notifications/count', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  const formatTimeRemaining = (daysRemaining) => {
    if (daysRemaining === 0) return 'Due today';
    if (daysRemaining === 1) return 'Due tomorrow';
    if (daysRemaining > 0) return `${daysRemaining} days left`;
    return 'Overdue';
  };

  const getNotificationIcon = (type) => {
    return type === 'assignment' ? '📝' : '📊';
  };

  const getNotificationColor = (daysRemaining) => {
    if (daysRemaining <= 1) return '#dc3545';
    if (daysRemaining <= 3) return '#fd7e14';
    return '#28a745';
  };

  // Don't show if notifications are disabled or user is not a student
  if (!user || user.role !== 'Student' || 
      (!settings.assignmentReminders && !settings.quizReminders)) {
    return null;
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          padding: '8px',
          borderRadius: '50%',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        🔔
        {count > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          width: '320px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #eee',
            fontWeight: '600',
            color: '#333'
          }}>
            Notifications ({count})
          </div>
          
          {notifications.length === 0 ? (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              color: '#666'
            }}>
              No new notifications
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={index}
                style={{
                  padding: '12px 16px',
                  borderBottom: index < notifications.length - 1 ? '1px solid #f0f0f0' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '4px'
                    }}>
                      {notification.title}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '4px'
                    }}>
                      {notification.subject_name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: getNotificationColor(notification.days_remaining),
                      fontWeight: '500'
                    }}>
                      {notification.type === 'assignment' 
                        ? formatTimeRemaining(notification.days_remaining)
                        : 'New quiz available'
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {notifications.length > 0 && (
            <div style={{
              padding: '8px 16px',
              textAlign: 'center',
              borderTop: '1px solid #eee'
            }}>
              <button
                onClick={() => setShowDropdown(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;