const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const materialsRoutes = require('./routes/materials');
const streamsRoutes = require('./routes/streams');
const quizzesRoutes = require('./routes/quizzes');
const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const teacherRoutes = require('./routes/teachers');
const parentRoutes = require('./routes/parents');
const parentProgressRoutes = require('./routes/parent');
const discussionRoutes = require('./routes/discussions');
const progressRoutes = require('./routes/progress');
const assignmentRoutes = require('./routes/assignments');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/streams', streamsRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/parent', parentProgressRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'eduBridge API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});