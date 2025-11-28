import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

const Register = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    role: 'Student',
    grade: 11,
    stream_id: ''
  });
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const response = await axios.get('/api/streams');
      setStreams(response.data);
    } catch (error) {
      // Fallback streams if API fails
      setStreams([
        { id: 1, name: 'Science' },
        { id: 2, name: 'Commerce' },
        { id: 3, name: 'Arts' }
      ]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const submitData = {
        ...formData,
        grade: parseInt(formData.grade),
        stream_id: parseInt(formData.stream_id)
      };
      console.log('Submitting data:', submitData);
      const registerResponse = await axios.post('/api/auth/register', submitData);
      
      // Auto-login after successful registration
      const loginResponse = await axios.post('/api/auth/login', {
        username: formData.username,
        password: formData.password
      });
      
      // Store token and user data
      localStorage.setItem('token', loginResponse.data.token);
      
      // Call onLogin to update app state
      if (onLogin) {
        onLogin(loginResponse.data.user);
      }
      
      setSuccess(`Welcome ${formData.full_name}! Redirecting to your dashboard...`);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <BackButton to="/" />
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">eB</div>
          <h2 className="login-title">Join eduBridge</h2>
          <p className="login-subtitle">Create your student account</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div style={{background: '#d4edda', color: '#155724', padding: '10px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center'}}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              pattern=".*@gmail\.com$"
              title="Please enter a valid Gmail address (example@gmail.com)"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Grade</label>
            <select name="grade" value={formData.grade} onChange={handleChange}>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>

          <div className="form-group">
            <label>Stream</label>
            <select name="stream_id" value={formData.stream_id} onChange={handleChange} required>
              <option value="">Select Stream</option>
              {streams.map(stream => (
                <option key={stream.id} value={stream.id}>{stream.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a href="/login" style={{ color: '#667eea', textDecoration: 'none' }}>
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;