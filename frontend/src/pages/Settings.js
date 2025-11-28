import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';

const Settings = ({ user }) => {
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    fontFamily: 'Arial',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    theme: 'light'
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  const applySettings = (newSettings) => {
    const root = document.documentElement;
    
    // Apply font size
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    };
    root.style.setProperty('--base-font-size', fontSizes[newSettings.fontSize]);
    
    // Apply font family
    root.style.setProperty('--font-family', newSettings.fontFamily);
    
    // Apply theme colors
    if (newSettings.theme === 'dark') {
      root.style.setProperty('--bg-color', '#1a1a1a');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--card-bg', '#2d2d2d');
    } else if (newSettings.theme === 'blue') {
      root.style.setProperty('--bg-color', '#e3f2fd');
      root.style.setProperty('--text-color', '#0d47a1');
      root.style.setProperty('--card-bg', '#ffffff');
    } else {
      root.style.setProperty('--bg-color', newSettings.backgroundColor);
      root.style.setProperty('--text-color', newSettings.textColor);
      root.style.setProperty('--card-bg', '#ffffff');
    }
    
    // Apply to body
    document.body.style.fontSize = fontSizes[newSettings.fontSize];
    document.body.style.fontFamily = newSettings.fontFamily;
    document.body.style.backgroundColor = newSettings.theme === 'dark' ? '#1a1a1a' : 
                                         newSettings.theme === 'blue' ? '#e3f2fd' : 
                                         newSettings.backgroundColor;
    document.body.style.color = newSettings.theme === 'dark' ? '#ffffff' : 
                               newSettings.theme === 'blue' ? '#0d47a1' : 
                               newSettings.textColor;
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    
    // Apply immediately
    applySettings(newSettings);
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 'medium',
      fontFamily: 'Arial',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      theme: 'light'
    };
    setSettings(defaultSettings);
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
  };

  return (
    <div className="materials-page" style={{ padding: '20px' }}>
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p>Customize your eduBridge experience</p>
      </div>

      <div style={{ 
        background: 'var(--card-bg, white)', 
        padding: '30px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        maxWidth: '600px'
      }}>
        
        {/* Font Size */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Font Size
          </label>
          <select 
            value={settings.fontSize} 
            onChange={(e) => handleSettingChange('fontSize', e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '6px', 
              border: '1px solid #ddd',
              fontSize: 'var(--base-font-size, 16px)'
            }}
          >
            <option value="small">Small (14px)</option>
            <option value="medium">Medium (16px)</option>
            <option value="large">Large (18px)</option>
            <option value="xlarge">Extra Large (20px)</option>
          </select>
        </div>

        {/* Font Family */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Font Style
          </label>
          <select 
            value={settings.fontFamily} 
            onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px 12px', 
              borderRadius: '6px', 
              border: '1px solid #ddd',
              fontFamily: settings.fontFamily,
              fontSize: 'var(--base-font-size, 16px)'
            }}
          >
            <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
            <option value="Georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
            <option value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
            <option value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
            <option value="Helvetica" style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
            <option value="Comic Sans MS" style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
          </select>
        </div>

        {/* Theme */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Theme
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
            <button
              onClick={() => handleSettingChange('theme', 'light')}
              style={{
                padding: '10px',
                border: settings.theme === 'light' ? '2px solid #667eea' : '1px solid #ddd',
                borderRadius: '6px',
                background: 'white',
                color: 'black',
                cursor: 'pointer'
              }}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => handleSettingChange('theme', 'dark')}
              style={{
                padding: '10px',
                border: settings.theme === 'dark' ? '2px solid #667eea' : '1px solid #ddd',
                borderRadius: '6px',
                background: '#1a1a1a',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              🌙 Dark
            </button>
            <button
              onClick={() => handleSettingChange('theme', 'blue')}
              style={{
                padding: '10px',
                border: settings.theme === 'blue' ? '2px solid #667eea' : '1px solid #ddd',
                borderRadius: '6px',
                background: '#e3f2fd',
                color: '#0d47a1',
                cursor: 'pointer'
              }}
            >
              💙 Blue
            </button>
          </div>
        </div>

        {/* Custom Colors (only for light theme) */}
        {settings.theme === 'light' && (
          <>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Background Color
              </label>
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              />
              <span style={{ marginLeft: '10px' }}>{settings.backgroundColor}</span>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Text Color
              </label>
              <input
                type="color"
                value={settings.textColor}
                onChange={(e) => handleSettingChange('textColor', e.target.value)}
                style={{ width: '60px', height: '40px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              />
              <span style={{ marginLeft: '10px' }}>{settings.textColor}</span>
            </div>
          </>
        )}

        {/* Reset Button */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            onClick={resetSettings}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: 'var(--base-font-size, 16px)'
            }}
          >
            Reset to Default
          </button>
        </div>

        {/* Preview Text */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '6px',
          background: 'var(--card-bg, white)'
        }}>
          <h3>Preview</h3>
          <p>This is how your text will look with the current settings.</p>
          <p>Font: {settings.fontFamily} | Size: {settings.fontSize} | Theme: {settings.theme}</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;