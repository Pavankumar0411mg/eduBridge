const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const { authenticateToken, authorizeRoles } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware to log request body
app.use('/api/teachers/create-quiz', (req, res, next) => {
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  console.log('Request headers:', req.headers);
  next();
});

// Simplified quiz creation for debugging
app.post('/api/teachers/create-quiz', authenticateToken, authorizeRoles('Teacher'), async (req, res) => {
  try {
    console.log('User from token:', req.user);
    console.log('Raw request body:', req.body);
    
    const { title, description, time_limit, questions } = req.body;
    
    console.log('Extracted values:');
    console.log('- title:', title, typeof title);
    console.log('- description:', description, typeof description);
    console.log('- time_limit:', time_limit, typeof time_limit);
    console.log('- questions:', questions, typeof questions);
    
    if (questions && questions.length > 0) {
      console.log('First question:', questions[0]);
      Object.keys(questions[0]).forEach(key => {
        console.log(`- ${key}:`, questions[0][key], typeof questions[0][key]);
      });
    }
    
    res.json({ message: 'Debug successful', received: { title, description, time_limit, questions } });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ message: 'Debug error', error: error.message });
  }
});

app.listen(5001, () => {
  console.log('Debug server running on port 5001');
});