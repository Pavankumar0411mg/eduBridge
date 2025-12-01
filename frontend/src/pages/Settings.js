import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';

const Settings = ({ user }) => {
  const [settings, setSettings] = useState({
    // Display Settings
    fontSize: 'medium',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    // Notification Settings
    emailNotifications: true,
    assignmentReminders: true,
    quizReminders: true,
    discussionUpdates: false,
    // Privacy Settings
    profileVisibility: 'public',
    showProgress: true,
    // Learning Preferences
    language: 'english',
    autoSave: true,
    confirmBeforeSubmit: true
  });

  const [activeTab, setActiveTab] = useState('display');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(prev => ({ ...prev, ...parsed }));
      applyDisplaySettings(parsed);
    }
  };

  const applyDisplaySettings = (newSettings) => {
    const root = document.documentElement;
    
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px',
      xxlarge: '22px'
    };
    
    const fontWeights = {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    };
    
    const letterSpacings = {
      tight: '-0.5px',
      normal: '0px',
      wide: '0.5px',
      wider: '1px'
    };
    
    const lineHeights = {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.7',
      loose: '2'
    };
    
    // Apply font settings globally
    root.style.setProperty('--base-font-size', fontSizes[newSettings.fontSize]);
    root.style.setProperty('--font-family', newSettings.fontFamily);
    root.style.setProperty('--font-weight', fontWeights[newSettings.fontWeight]);
    root.style.setProperty('--letter-spacing', letterSpacings[newSettings.letterSpacing]);
    root.style.setProperty('--line-height', lineHeights[newSettings.lineHeight]);
    
    // Apply to body and all elements
    document.body.style.fontSize = fontSizes[newSettings.fontSize];
    document.body.style.fontFamily = newSettings.fontFamily;
    document.body.style.fontWeight = fontWeights[newSettings.fontWeight];
    document.body.style.fontStyle = newSettings.fontStyle;
    document.body.style.letterSpacing = letterSpacings[newSettings.letterSpacing];
    document.body.style.lineHeight = lineHeights[newSettings.lineHeight];
    
    // Apply to all text elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && element.tagName !== 'SELECT') {
        element.style.fontSize = fontSizes[newSettings.fontSize];
        element.style.fontFamily = newSettings.fontFamily;
        element.style.fontWeight = fontWeights[newSettings.fontWeight];
        element.style.fontStyle = newSettings.fontStyle;
        element.style.letterSpacing = letterSpacings[newSettings.letterSpacing];
        element.style.lineHeight = lineHeights[newSettings.lineHeight];
      }
    });
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    
    if (['fontSize', 'fontFamily', 'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight'].includes(key)) {
      applyDisplaySettings(newSettings);
    }
    
    // Handle notification settings
    if (['assignmentReminders', 'quizReminders'].includes(key)) {
      if (value) {
        setSaveStatus(`${key === 'assignmentReminders' ? 'Assignment' : 'Quiz'} reminders enabled!`);
      } else {
        setSaveStatus(`${key === 'assignmentReminders' ? 'Assignment' : 'Quiz'} reminders disabled!`);
      }
    } else {
      setSaveStatus('Settings saved successfully!');
    }
    
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 'medium',
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      lineHeight: 'normal',
      emailNotifications: true,
      assignmentReminders: true,
      quizReminders: true,
      discussionUpdates: false,
      profileVisibility: 'public',
      showProgress: true,
      language: 'english',
      autoSave: true,
      confirmBeforeSubmit: true
    };
    setSettings(defaultSettings);
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
    applyDisplaySettings(defaultSettings);
    setSaveStatus('Settings reset to default!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const tabStyle = (tabName) => ({
    padding: '12px 24px',
    border: 'none',
    background: activeTab === tabName ? '#667eea' : 'transparent',
    color: activeTab === tabName ? 'white' : '#666',
    cursor: 'pointer',
    borderRadius: '8px',
    fontWeight: activeTab === tabName ? '600' : '400',
    transition: 'all 0.3s ease'
  });

  const sectionStyle = {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    marginBottom: '20px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '14px'
  };

  return (
    <div className="materials-page" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <BackButton to="/dashboard" />
      
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h1 className="page-title" style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>Account Settings</h1>
        <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>Manage your preferences and account configuration</p>
      </div>

      {saveStatus && (
        <div style={{
          background: '#d4edda',
          color: '#155724',
          padding: '12px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb'
        }}>
          {saveStatus}
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ 
        background: 'white', 
        padding: '8px', 
        borderRadius: '12px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        marginBottom: '25px',
        display: 'flex',
        gap: '4px'
      }}>
        <button onClick={() => setActiveTab('display')} style={tabStyle('display')}>🔤 Display</button>
        <button onClick={() => setActiveTab('notifications')} style={tabStyle('notifications')}>🔔 Notifications</button>
        <button onClick={() => setActiveTab('privacy')} style={tabStyle('privacy')}>🔒 Privacy</button>
        <button onClick={() => setActiveTab('learning')} style={tabStyle('learning')}>📚 Learning</button>
      </div>

      {/* Display Settings */}
      {activeTab === 'display' && (
        <div style={sectionStyle}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>Display Preferences</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Font Size</label>
              <select value={settings.fontSize} onChange={(e) => handleSettingChange('fontSize', e.target.value)} style={inputStyle}>
                <option value="small">Small (14px)</option>
                <option value="medium">Medium (16px)</option>
                <option value="large">Large (18px)</option>
                <option value="xlarge">Extra Large (20px)</option>
                <option value="xxlarge">XXL (22px)</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Font Family</label>
              <select value={settings.fontFamily} onChange={(e) => handleSettingChange('fontFamily', e.target.value)} style={inputStyle}>
                <optgroup label="📖 Reading Fonts">
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Book Antiqua">Book Antiqua</option>
                  <option value="Palatino">Palatino</option>
                  <option value="Garamond">Garamond</option>
                </optgroup>
                <optgroup label="💻 Modern Sans-Serif">
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Segoe UI">Segoe UI</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Source Sans Pro">Source Sans Pro</option>
                </optgroup>
                <optgroup label="🎨 Display Fonts">
                  <option value="Impact">Impact</option>
                  <option value="Arial Black">Arial Black</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                  <option value="Century Gothic">Century Gothic</option>
                  <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                </optgroup>
                <optgroup label="⌨️ Monospace">
                  <option value="Courier New">Courier New</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Fira Code">Fira Code</option>
                  <option value="Source Code Pro">Source Code Pro</option>
                </optgroup>
                <optgroup label="✏️ Handwriting Style">
                  <option value="Comic Sans MS">Comic Sans MS</option>
                  <option value="Brush Script MT">Brush Script MT</option>
                  <option value="Lucida Handwriting">Lucida Handwriting</option>
                </optgroup>
                <optgroup label="🌍 International">
                  <option value="Noto Sans">Noto Sans</option>
                  <option value="DejaVu Sans">DejaVu Sans</option>
                  <option value="Liberation Sans">Liberation Sans</option>
                  <option value="Droid Sans">Droid Sans</option>
                </optgroup>
                <optgroup label="📚 Academic">
                  <option value="Cambria">Cambria</option>
                  <option value="Constantia">Constantia</option>
                  <option value="Minion Pro">Minion Pro</option>
                  <option value="Crimson Text">Crimson Text</option>
                </optgroup>
              </select>
            </div>
            
            <div>
              <label style={labelStyle}>Font Weight</label>
              <select value={settings.fontWeight} onChange={(e) => handleSettingChange('fontWeight', e.target.value)} style={inputStyle}>
                <option value="light">Light (300)</option>
                <option value="normal">Normal (400)</option>
                <option value="medium">Medium (500)</option>
                <option value="semibold">Semi Bold (600)</option>
                <option value="bold">Bold (700)</option>
              </select>
            </div>
            
            <div>
              <label style={labelStyle}>Font Style</label>
              <select value={settings.fontStyle} onChange={(e) => handleSettingChange('fontStyle', e.target.value)} style={inputStyle}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
            </div>
            
            <div>
              <label style={labelStyle}>Letter Spacing</label>
              <select value={settings.letterSpacing} onChange={(e) => handleSettingChange('letterSpacing', e.target.value)} style={inputStyle}>
                <option value="tight">Tight (-0.5px)</option>
                <option value="normal">Normal (0px)</option>
                <option value="wide">Wide (0.5px)</option>
                <option value="wider">Wider (1px)</option>
              </select>
            </div>
            
            <div>
              <label style={labelStyle}>Line Height</label>
              <select value={settings.lineHeight} onChange={(e) => handleSettingChange('lineHeight', e.target.value)} style={inputStyle}>
                <option value="tight">Tight (1.2)</option>
                <option value="normal">Normal (1.5)</option>
                <option value="relaxed">Relaxed (1.7)</option>
                <option value="loose">Loose (2.0)</option>
              </select>
            </div>
          </div>


        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div style={sectionStyle}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>Notification Preferences</h2>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive general updates via email' },
              { key: 'assignmentReminders', label: 'Assignment Reminders', desc: 'Get notified about upcoming assignment deadlines' },
              { key: 'quizReminders', label: 'Quiz Reminders', desc: 'Receive reminders for scheduled quizzes' },
              { key: 'discussionUpdates', label: 'Discussion Updates', desc: 'Get notified about new discussion forum posts' }
            ].map(item => (
              <div key={item.key} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px',
                border: '1px solid #e1e5e9',
                borderRadius: '8px',
                background: '#fafbfc'
              }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{item.desc}</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: settings[item.key] ? '#667eea' : '#ccc',
                    transition: '0.4s',
                    borderRadius: '24px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '18px',
                      width: '18px',
                      left: settings[item.key] ? '26px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.4s',
                      borderRadius: '50%'
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Settings */}
      {activeTab === 'privacy' && (
        <div style={sectionStyle}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>Privacy Settings</h2>
          
          <div style={{ display: 'grid', gap: '25px' }}>
            <div>
              <label style={labelStyle}>Profile Visibility</label>
              <select value={settings.profileVisibility} onChange={(e) => handleSettingChange('profileVisibility', e.target.value)} style={inputStyle}>
                <option value="public">Public - Visible to all users</option>
                <option value="students">Students Only - Visible to fellow students</option>
                <option value="teachers">Teachers Only - Visible to teachers</option>
                <option value="private">Private - Only visible to you</option>
              </select>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px',
              border: '1px solid #e1e5e9',
              borderRadius: '8px',
              background: '#fafbfc'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>Show Progress to Others</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Allow others to see your learning progress and achievements</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                <input
                  type="checkbox"
                  checked={settings.showProgress}
                  onChange={(e) => handleSettingChange('showProgress', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.showProgress ? '#667eea' : '#ccc',
                  transition: '0.4s',
                  borderRadius: '24px'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '18px',
                    width: '18px',
                    left: settings.showProgress ? '26px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    transition: '0.4s',
                    borderRadius: '50%'
                  }} />
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Learning Preferences */}
      {activeTab === 'learning' && (
        <div style={sectionStyle}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '20px', fontWeight: '600' }}>Learning Preferences</h2>
          
          <div style={{ display: 'grid', gap: '25px' }}>
            <div>
              <label style={labelStyle}>Preferred Language</label>
              <select value={settings.language} onChange={(e) => handleSettingChange('language', e.target.value)} style={inputStyle}>
                <option value="english">English</option>
                <option value="hindi">हिंदी (Hindi)</option>
                <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="tamil">தமிழ் (Tamil)</option>
                <option value="telugu">తెలుగు (Telugu)</option>
              </select>
            </div>

            {[
              { key: 'autoSave', label: 'Auto-save Progress', desc: 'Automatically save your progress while studying' },
              { key: 'confirmBeforeSubmit', label: 'Confirm Before Submit', desc: 'Show confirmation dialog before submitting quizzes and assignments' }
            ].map(item => (
              <div key={item.key} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px',
                border: '1px solid #e1e5e9',
                borderRadius: '8px',
                background: '#fafbfc'
              }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{item.desc}</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: settings[item.key] ? '#667eea' : '#ccc',
                    transition: '0.4s',
                    borderRadius: '24px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '',
                      height: '18px',
                      width: '18px',
                      left: settings[item.key] ? '26px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.4s',
                      borderRadius: '50%'
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        justifyContent: 'center',
        marginTop: '30px',
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <button
          onClick={resetSettings}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#c82333'}
          onMouseOut={(e) => e.target.style.background = '#dc3545'}
        >
          🔄 Reset All Settings
        </button>
      </div>

      {/* Preview Section */}
      <div style={{ 
        marginTop: '25px', 
        padding: '25px', 
        border: '2px dashed #e1e5e9', 
        borderRadius: '12px',
        background: 'var(--card-bg, white)',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>🎨 Live Preview</h3>
        <p style={{ marginBottom: '10px' }}>This text demonstrates your current display settings.</p>
        <div style={{ 
          fontSize: '14px', 
          color: '#666',
          fontFamily: 'monospace',
          background: '#f8f9fa',
          padding: '10px',
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          Font: {settings.fontFamily} | Size: {settings.fontSize} | Weight: {settings.fontWeight} | Style: {settings.fontStyle}
        </div>
      </div>
    </div>
  );
};

export default Settings;