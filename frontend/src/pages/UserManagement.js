import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filterRole, setFilterRole] = useState('Students & Teachers');
  const [filterStream, setFilterStream] = useState('All');
  const [filterGrade, setFilterGrade] = useState('All');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Student',
    full_name: '',
    grade: '',
    stream_id: ''
  });

  useEffect(() => {
    fetchUsers();
    fetchStreams();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching users with token:', token ? 'Present' : 'Missing');
      
      const response = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Users response:', response.data);
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      console.error('Error response:', error.response?.data);
      alert(`Error fetching users: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchStreams = async () => {
    try {
      const response = await axios.get('/api/streams');
      setStreams(response.data);
    } catch (error) {
      console.error('Error fetching streams:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (editingUser) {
        await axios.put(`/api/admin/users/${editingUser.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/admin/users', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      fetchUsers();
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      role: user.role,
      full_name: user.full_name,
      grade: user.grade || '',
      stream_id: user.stream_id || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (window.confirm(`Are you sure you want to delete ${user?.full_name || 'this user'}?`)) {
      try {
        const token = localStorage.getItem('token');
        console.log(`Deleting user ID: ${userId}`);
        
        const response = await axios.delete(`/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Delete response:', response.data);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Delete error:', error);
        const errorMessage = error.response?.data?.message || 'Error deleting user';
        alert(errorMessage);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'Student',
      full_name: '',
      grade: '',
      stream_id: ''
    });
    setEditingUser(null);
    setShowForm(false);
  };

  const filteredUsers = users.filter(user => {
    if (filterRole !== 'All' && user.role !== filterRole) return false;
    if (filterGrade !== 'All' && user.grade != filterGrade) return false;
    if (filterStream !== 'All' && user.stream_name !== filterStream) return false;
    return true;
  });

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
          >
            <option value="Students & Teachers">Students & Teachers</option>
            <option value="All">All Roles</option>
            <option value="Student">Students Only</option>
            <option value="Teacher">Teachers Only</option>
            <option value="Parent">Parents</option>
            <option value="Admin">Admins</option>
          </select>
          
          <select 
            value={filterGrade} 
            onChange={(e) => setFilterGrade(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
          >
            <option value="All">All Grades</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
          
          <select 
            value={filterStream} 
            onChange={(e) => setFilterStream(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
          >
            <option value="All">All Streams</option>
            {streams.map(stream => (
              <option key={stream.id} value={stream.name}>{stream.name}</option>
            ))}
          </select>
          
          <button 
            onClick={() => setShowForm(true)}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add New User
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            background: 'white', 
            padding: '30px', 
            borderRadius: '10px', 
            width: '500px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label>Username:</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label>Password:</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required={!editingUser}
                  placeholder={editingUser ? 'Leave blank to keep current password' : ''}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label>Full Name:</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label>Role:</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Parent">Parent</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              {(formData.role === 'Student' || formData.role === 'Teacher') && (
                <>
                  <div style={{ marginBottom: '15px' }}>
                    <label>Grade:</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                      style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                      <option value="">Select Grade</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label>Stream:</label>
                    <select
                      value={formData.stream_id}
                      onChange={(e) => setFormData({...formData, stream_id: e.target.value})}
                      style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                      <option value="">Select Stream</option>
                      {streams.map(stream => (
                        <option key={stream.id} value={stream.id}>{stream.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={resetForm}
                  style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading users...</div>
      ) : (
        <>
          <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Summary</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <span>Total Users: <strong>{users.length}</strong></span>
              <span>Students: <strong>{users.filter(u => u.role === 'Student').length}</strong></span>
              <span>Teachers: <strong>{users.filter(u => u.role === 'Teacher').length}</strong></span>
              <span>Parents: <strong>{users.filter(u => u.role === 'Parent').length}</strong></span>
              <span>Admins: <strong>{users.filter(u => u.role === 'Admin').length}</strong></span>
            </div>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Username</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Role</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Grade/Stream</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Joined</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(user => {
                    if (filterRole === 'Students & Teachers' && !['Student', 'Teacher'].includes(user.role)) return false;
                    if (filterRole !== 'All' && filterRole !== 'Students & Teachers' && user.role !== filterRole) return false;
                    if (filterGrade !== 'All' && user.grade != filterGrade) return false;
                    if (filterStream !== 'All' && user.stream_name !== filterStream) return false;
                    return true;
                  })
                  .map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f1f3f4' }}>
                    <td style={{ padding: '15px' }}>
                      <div style={{ fontWeight: 'bold' }}>{user.full_name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {user.role === 'Student' ? `Student ID: ${user.id}` : 
                         user.role === 'Teacher' ? `Teacher ID: ${user.id}` : `ID: ${user.id}`}
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>{user.username}</td>
                    <td style={{ padding: '15px' }}>{user.email}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        background: user.role === 'Admin' ? '#dc3545' : 
                                   user.role === 'Teacher' ? '#28a745' : 
                                   user.role === 'Student' ? '#007bff' : '#6c757d',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      {user.grade && user.stream_name ? (
                        <div>
                          <div style={{ fontWeight: 'bold' }}>Grade {user.grade}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{user.stream_name} Stream</div>
                          {user.role === 'Teacher' && (
                            <div style={{ fontSize: '10px', color: '#28a745', fontWeight: 'bold' }}>Teaching</div>
                          )}
                        </div>
                      ) : (
                        user.role === 'Teacher' ? (
                          <div style={{ fontSize: '12px', color: '#ffc107', fontStyle: 'italic' }}>No assignment</div>
                        ) : '-'
                      )}
                    </td>
                    <td style={{ padding: '15px', fontSize: '12px', color: '#666' }}>
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleEdit(user)}
                        style={{ 
                          background: '#ffc107', 
                          color: 'white', 
                          border: 'none', 
                          padding: '5px 10px', 
                          borderRadius: '3px', 
                          marginRight: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      {user.role !== 'Admin' && (
                        <button 
                          onClick={() => handleDelete(user.id)}
                          style={{ 
                            background: '#dc3545', 
                            color: 'white', 
                            border: 'none', 
                            padding: '5px 10px', 
                            borderRadius: '3px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;