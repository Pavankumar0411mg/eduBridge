import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm eduBot. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const faqs = {
    // Menu Navigation Help
    'dashboard': '🏠 Dashboard: Your main hub showing welcome message, quick access cards, and recent activity. Access all features from here.',
    'study materials': '📚 Study Materials: Browse and download PDFs, videos, and notes for your subjects. Materials are filtered by your grade and stream.',
    'take quizzes': '📝 Take Quizzes: Test your knowledge with subject-specific quizzes. View your scores and track progress.',
    'settings': '⚙️ Settings: Customize font size, theme, and display preferences for better learning experience.',
    'upload materials': '📤 Upload Materials: (Teachers/Admin) Upload study materials for students in your assigned subjects.',
    'create quiz': '📝 Create Quiz: (Teachers) Create quizzes with multiple choice questions for your students.',
    'my students': '👨🎓 My Students: (Teachers) View your students and their quiz performance.',
    'quiz scores': '📊 Quiz Scores: (Admin) View all student quiz performance across the platform.',
    
    // Navigation Help
    'menu': 'Use the hamburger menu (☰) in top-left to navigate. Main sections: Dashboard, Study Materials, Quizzes, Settings. Teachers have additional options for uploading and creating content.',
    'sidebar': 'The sidebar shows all available options based on your role. Students see materials and quizzes, Teachers see creation tools, Admins see management options.',
    'logout': 'Logout button is in the top-right corner of the header and also at the bottom of the sidebar.',
    
    // General Platform Info
    'what is edubridge': 'eduBridge is a platform designed to enhance education in rural areas for 11th and 12th standard students across Science, Commerce, and Arts streams.',
    'how to register': 'Click the "Register" button on the homepage, fill in your details, select your grade and stream, then submit the form.',
    'what streams available': 'We offer three streams: Science (Physics, Chemistry, Biology, Math, Computer Science), Commerce (Accountancy, Business Studies, Economics, Math, English), and Arts (History, Political Science, Geography, Sociology, Literature).',
    'how to login': 'Click the "Login" button and enter your username/email and password. New users need to register first.',
    'what materials available': 'We provide PDFs, videos, and notes for all subjects in each stream, uploaded by qualified teachers.',
    'is it free': 'Yes, eduBridge is completely free for students in rural areas.',
    'technical requirements': 'You need a basic internet connection (2G/3G works), any web browser, and a device (computer, tablet, or smartphone).',
    'contact support': 'You can reach our support team through the contact form or email us at support@edubridge.com',
    'grades supported': 'We currently support Grade 11 and Grade 12 students.',
    'languages supported': 'Content is available in English, Hindi, and regional languages.'
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Navigation requests
    if (message.includes('take me to') || message.includes('go to') || message.includes('navigate to')) {
      if (message.includes('quiz')) {
        return "To access quizzes:\n\n1️⃣ Click the hamburger menu (☰) in top-left\n2️⃣ Select 'Take Quizzes' from the sidebar\n\nOr click 'Take Quizzes' card on your Dashboard!";
      }
      if (message.includes('material') || message.includes('study')) {
        return "To access study materials:\n\n1️⃣ Click the hamburger menu (☰)\n2️⃣ Select 'Study Materials'\n\nOr use the 'Study Materials' card on Dashboard!";
      }
      if (message.includes('dashboard')) {
        return "To go to Dashboard:\n\n1️⃣ Click the hamburger menu (☰)\n2️⃣ Select 'Dashboard'\n\nDashboard is your main hub with quick access to all features!";
      }
      if (message.includes('setting')) {
        return "To access Settings:\n\n1️⃣ Click the hamburger menu (☰)\n2️⃣ Scroll down and select 'Settings'\n\nCustomize your learning experience there!";
      }
    }
    
    // Direct quiz questions
    if (message.includes('quiz') && !message.includes('create')) {
      return "🎯 For Quizzes:\n\n📍 Location: Sidebar menu → 'Take Quizzes'\n📝 Features: Test knowledge, view scores, track progress\n✅ After completion: Shows score and marks as completed\n\nClick the ☰ menu and select 'Take Quizzes'!";
    }
    
    for (const [key, response] of Object.entries(faqs)) {
      if (message.includes(key) || key.includes(message)) {
        return response;
      }
    }
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! Welcome to eduBridge. I can help you with information about our platform, registration, streams, and more. What would you like to know?";
    }
    
    if (message.includes('help') || message.includes('navigation') || message.includes('how to use')) {
      return "I can help you with:\n\n📱 Navigation:\n• Dashboard - Main hub\n• Study Materials - Learning resources\n• Take Quizzes - Test knowledge\n• Settings - Customize experience\n\n❓ General Info:\n• Registration and login\n• Available streams and subjects\n• Technical requirements\n\nJust ask about any menu item or feature!";
    }
    
    if (message.includes('where') || message.includes('find') || message.includes('access')) {
      return "To find features:\n\n🔍 Use the sidebar menu (☰ button)\n📚 Study Materials - for learning resources\n📝 Quizzes - for testing knowledge\n⚙️ Settings - for preferences\n🚪 Logout - top-right corner\n\nWhat specific feature are you looking for?";
    }
    
    return "I'm not sure about that. You can ask me about registration, streams, study materials, login process, or general information about eduBridge. You can also contact our support team for detailed assistance.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' };
    const botResponse = { text: getBotResponse(input), sender: 'bot' };
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 1000,
          color: 'white',
          fontSize: '24px'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '450px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '15px',
            borderRadius: '12px 12px 0 0',
            fontWeight: 'bold'
          }}>
            🤖 eduBot - Ask me anything!
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? '#667eea' : '#f1f3f4',
                  color: msg.sender === 'user' ? 'white' : '#333',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;