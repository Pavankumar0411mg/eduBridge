import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI study assistant on eduBridge. I can help explain concepts, guide you through the platform, provide study tips, and answer questions about any subject. What would you like to learn about today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const simulateTyping = (text, callback) => {
    setIsTyping(true);
    // Faster typing simulation
    const typingDelay = Math.min(text.length * 5, 800);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, typingDelay);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { 
      text: input, 
      sender: 'user', 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/chatbot/chat', 
        { message: currentInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botResponse = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(response.data.timestamp)
      };

      simulateTyping(botResponse.text, () => {
        setMessages(prev => [...prev, botResponse]);
      });

    } catch (error) {
      console.error('Chat error:', error);
      const errorResponse = {
        text: "I'm having trouble connecting right now. Please try again in a moment, or contact support if the issue persists.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('/api/chatbot/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages([
        { text: "Hi! I'm your AI study assistant on eduBridge. I can help explain concepts, guide you through the platform, provide study tips, and answer questions about any subject. What would you like to learn about today?", sender: 'bot', timestamp: new Date() }
      ]);
    } catch (error) {
      console.error('Clear history error:', error);
    }
  };

  const formatMessage = (text) => {
    // Convert markdown-like formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  const getMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          background: isOpen ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 1000,
          color: 'white',
          fontSize: '24px',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      >
        {isOpen ? '✕' : '🤖'}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '380px',
          height: '500px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '16px 16px 0 0',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '16px'
          }}>
            <span>🤖 AI Study Assistant</span>
            <button
              onClick={clearHistory}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
              title="Clear conversation"
            >
              🗑️
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#fafafa'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div
                  style={{
                    background: msg.sender === 'user' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : msg.isError 
                        ? '#ffebee' 
                        : 'white',
                    color: msg.sender === 'user' ? 'white' : msg.isError ? '#c62828' : '#333',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: msg.isError ? '1px solid #ffcdd2' : 'none'
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
                <div style={{
                  fontSize: '11px',
                  color: '#999',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginLeft: msg.sender === 'user' ? '0' : '16px',
                  marginRight: msg.sender === 'user' ? '16px' : '0'
                }}>
                  {getMessageTime(msg.timestamp)}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {(isTyping || isLoading) && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'white',
                padding: '12px 16px',
                borderRadius: '18px 18px 18px 4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '4px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#667eea',
                    animation: 'bounce 1.4s infinite ease-in-out'
                  }} />
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#667eea',
                    animation: 'bounce 1.4s infinite ease-in-out 0.16s'
                  }} />
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#667eea',
                    animation: 'bounce 1.4s infinite ease-in-out 0.32s'
                  }} />
                </div>
                <span style={{ fontSize: '12px', color: '#666' }}>AI is thinking...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #eee',
            background: 'white',
            borderRadius: '0 0 16px 16px'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-end'
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about quiz scores, assignments, progress, or any subject..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '20px',
                  outline: 'none',
                  fontSize: '14px',
                  resize: 'none',
                  minHeight: '20px',
                  maxHeight: '80px',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s ease',
                  background: isLoading ? '#f5f5f5' : 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                style={{
                  background: (isLoading || !input.trim()) ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  transform: (isLoading || !input.trim()) ? 'scale(0.95)' : 'scale(1)'
                }}
                title="Send message"
              >
                {isLoading ? '⏳' : '➤'}
              </button>
            </div>
            
            {/* Quick suggestions */}
            <div style={{
              marginTop: '8px',
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap'
            }}>
              {['Show my quiz scores', 'My assignments', 'Study tips', 'Platform guide'].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInput(suggestion)}
                  style={{
                    background: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;