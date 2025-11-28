import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const Materials = ({ user }) => {
  const [materials, setMaterials] = useState([]);
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState({
    grade: user.role === 'Student' ? user.grade : '',
    stream_id: user.role === 'Student' ? user.stream_id : '',
    subject_id: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreams();
    fetchMaterials();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (filters.stream_id) {
      fetchSubjects(filters.stream_id);
    }
  }, [filters.stream_id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchStreams = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/streams', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStreams(response.data);
    } catch (error) {
      console.error('Error fetching streams:', error);
    }
  };

  const fetchSubjects = async (streamId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/streams/${streamId}/subjects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      
      if (filters.grade) params.append('grade', filters.grade);
      if (filters.stream_id) params.append('stream_id', filters.stream_id);
      if (filters.subject_id) params.append('subject_id', filters.subject_id);

      const response = await axios.get(`/api/materials?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'stream_id' && { subject_id: '' })
    }));
  };

  const applyFilters = () => {
    setLoading(true);
    fetchMaterials();
  };

  const handleDelete = async (materialId, title) => {
    if (!window.confirm(`⚠️ Delete "${title}"?\n\nThis will permanently remove the file from the server. This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/materials/${materialId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh materials list
      setLoading(true);
      fetchMaterials();
      
      // Show success message
      setTimeout(() => {
        alert('✅ Material and file deleted successfully!');
      }, 500);
    } catch (error) {
      alert('❌ Error deleting material: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'PDF': return '#e3f2fd';
      case 'Video': return '#f3e5f5';
      case 'Notes': return '#e8f5e8';
      default: return '#f5f5f5';
    }
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      <div className="page-header">
        <h1 className="page-title">Study Materials</h1>
        <p>Access learning resources for your subjects</p>
        
        <div className="filters">
          <div className="filter-group">
            <label>Grade</label>
            <select name="grade" value={filters.grade} onChange={handleFilterChange} disabled={user.role === 'Student'}>
              <option value="">All Grades</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Stream</label>
            <select name="stream_id" value={filters.stream_id} onChange={handleFilterChange} disabled={user.role === 'Student'}>
              <option value="">All Streams</option>
              {streams.map(stream => (
                <option key={stream.id} value={stream.id}>{stream.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Subject</label>
            <select name="subject_id" value={filters.subject_id} onChange={handleFilterChange}>
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>&nbsp;</label>
            <button className="download-btn" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          Loading materials...
        </div>
      ) : (
        <div className="materials-grid">
          {materials.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#666' }}>
              No materials found. Try adjusting your filters.
            </div>
          ) : (
            materials.map(material => (
              <div key={material.id} className="material-card">
                <div 
                  className="material-type" 
                  style={{ backgroundColor: getTypeColor(material.type) }}
                >
                  {material.type}
                </div>
                <h3 className="material-title">{material.title}</h3>
                <div className="material-meta">
                  Grade {material.grade} • {material.stream_name} • {material.subject_name}
                  <br />
                  <small>Uploaded by: {material.uploaded_by_name}</small>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <a 
                    href={`http://localhost:5000/${material.file_path}`} 
                    className="download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, textAlign: 'center' }}
                  >
                    View
                  </a>
                  <a 
                    href={`http://localhost:5000/${material.file_path}`} 
                    className="download-btn"
                    download
                    style={{ flex: 1, textAlign: 'center', background: '#28a745' }}
                  >
                    Download
                  </a>
                  {user.role === 'Admin' && (
                    <button
                      onClick={() => handleDelete(material.id, material.title)}
                      style={{
                        flex: 1,
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Materials;