import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const DiscussionForum = ({ user }) => {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/discussions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDiscussions(response.data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiscussion = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/discussions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedDiscussion(response.data.discussion);
      setReplies(response.data.replies);
    } catch (error) {
      console.error('Error fetching discussion:', error);
    }
  };

  const createDiscussion = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/discussions', newDiscussion, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setNewDiscussion({ title: '', content: '' });
      setShowNewDiscussion(false);
      fetchDiscussions();
    } catch (error) {
      console.error('Error creating discussion:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error creating discussion');
    }
  };

  const addReply = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/discussions/${selectedDiscussion.id}/reply`, 
        { content: replyContent }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReplyContent('');
      fetchDiscussion(selectedDiscussion.id);
      fetchDiscussions();
    } catch (error) {
      alert('Error adding reply');
    }
  };

  return (
    <div className="materials-page">
      <BackButton to="/dashboard" />
      
      <div className="page-header">
        <h1 className="page-title">💬 Discussion Forum</h1>
        <button 
          onClick={() => setShowNewDiscussion(true)}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          New Discussion
        </button>
      </div>

      {showNewDiscussion && (
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
            width: '500px'
          }}>
            <h3>Start New Discussion</h3>
            <form onSubmit={createDiscussion}>
              <div style={{ marginBottom: '15px' }}>
                <label>Title:</label>
                <input
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Question/Content:</label>
                <textarea
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => setShowNewDiscussion(false)}
                  style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: selectedDiscussion ? '1fr 2fr' : '1fr', gap: '20px' }}>
        
        {/* Discussions List */}
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ background: '#f8f9fa', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
            <h3 style={{ margin: 0 }}>All Discussions</h3>
          </div>
          
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
            ) : discussions.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No discussions yet. Start the first one!
              </div>
            ) : (
              discussions.map(discussion => (
                <div 
                  key={discussion.id}
                  onClick={() => fetchDiscussion(discussion.id)}
                  style={{ 
                    padding: '15px', 
                    borderBottom: '1px solid #f1f3f4',
                    cursor: 'pointer',
                    background: selectedDiscussion?.id === discussion.id ? '#e3f2fd' : 'white'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {discussion.title}
                    {discussion.author_role === 'Parent' && (
                      <span style={{ 
                        background: '#ffc107', 
                        color: '#212529', 
                        padding: '2px 6px', 
                        borderRadius: '3px', 
                        fontSize: '10px', 
                        marginLeft: '8px' 
                      }}>
                        PARENT QUESTION
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                    By {discussion.author_name} ({discussion.author_role})
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      background: discussion.status === 'Answered' ? '#d4edda' : 
                                 discussion.status === 'Closed' ? '#f8d7da' : '#fff3cd',
                      color: discussion.status === 'Answered' ? '#155724' : 
                            discussion.status === 'Closed' ? '#721c24' : '#856404',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '10px'
                    }}>
                      {discussion.status}
                    </span>
                    <span style={{ fontSize: '12px', color: '#888' }}>
                      {discussion.reply_count} replies
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Discussion Detail */}
        {selectedDiscussion && (
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#f8f9fa', padding: '20px', borderBottom: '1px solid #dee2e6' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{selectedDiscussion.title}</h3>
              <div style={{ fontSize: '12px', color: '#666' }}>
                By {selectedDiscussion.author_name} • {new Date(selectedDiscussion.created_at).toLocaleDateString()}
              </div>
            </div>
            
            <div style={{ padding: '20px', borderBottom: '1px solid #dee2e6' }}>
              <p>{selectedDiscussion.content}</p>
            </div>

            {/* Replies */}
            <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '20px' }}>
              {replies.length === 0 ? (
                <p style={{ color: '#666', textAlign: 'center' }}>No replies yet.</p>
              ) : (
                replies.map(reply => (
                  <div key={reply.id} style={{ 
                    marginBottom: '15px', 
                    padding: '10px',
                    background: reply.is_admin_reply ? '#e8f5e8' : '#f8f9fa',
                    borderRadius: '8px',
                    borderLeft: reply.is_admin_reply ? '4px solid #28a745' : '4px solid #6c757d'
                  }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                      {reply.author_name} ({reply.author_role}) • {new Date(reply.created_at).toLocaleDateString()}
                      {reply.is_admin_reply && <span style={{ color: '#28a745', fontWeight: 'bold' }}> • ADMIN RESPONSE</span>}
                    </div>
                    <p style={{ margin: 0 }}>{reply.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Reply Form */}
            <div style={{ padding: '20px', borderTop: '1px solid #dee2e6' }}>
              <form onSubmit={addReply}>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  required
                  rows="3"
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button 
                  type="submit"
                  style={{ 
                    background: user.role === 'Admin' ? '#28a745' : '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 16px', 
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {user.role === 'Admin' ? 'Post Admin Reply' : 'Post Reply'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionForum;