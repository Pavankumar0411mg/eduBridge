// Simple test script for the chatbot functionality
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatbotRoutes = require('./routes/chatbot');

const app = express();
app.use(cors());
app.use(express.json());

// Mock authentication middleware for testing
const mockAuth = (req, res, next) => {
  req.user = {
    id: 1,
    role: 'Student',
    username: 'test_student'
  };
  next();
};

app.use('/api/chatbot', mockAuth, chatbotRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Chatbot test server running on port ${PORT}`);
  console.log('Test the chatbot with:');
  console.log(`curl -X POST http://localhost:${PORT}/api/chatbot/chat -H "Content-Type: application/json" -d '{"message":"Hello"}'`);
});

// Test cases
const testMessages = [
  "Hello",
  "Explain physics motion",
  "How to access quizzes?",
  "What is photosynthesis?",
  "Help with mathematics",
  "Study tips for exams"
];

console.log('\nSample test messages:');
testMessages.forEach((msg, index) => {
  console.log(`${index + 1}. "${msg}"`);
});