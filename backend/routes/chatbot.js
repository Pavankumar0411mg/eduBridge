const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/database');

// AI-like response generator for educational content
class EduBridgeAI {
  constructor() {
    this.conversationHistory = new Map();
  }

  async generateResponse(message, userId, userRole, userInfo = {}) {
    const msg = message.toLowerCase();
    
    // Handle quick suggestions
    if (msg === 'show my quiz scores') {
      return await this.getQuizScores(userId, userRole, userInfo);
    }
    if (msg === 'my assignments') {
      return await this.getAssignments(userId, userRole, userInfo);
    }
    if (msg === 'study tips') {
      return this.getStudyTips();
    }
    if (msg === 'platform guide') {
      return this.getPlatformGuide(userRole);
    }
    
    if (this.isDataQuery(message)) {
      return await this.handleDataQuery(message, userRole, userId, userInfo);
    }
    return this.getAcademicResponse(message);
  }

  getStudyTips() {
    return `📚 **Study Tips for Success:**\n\n**📅 Time Management:**\n• Create a daily study schedule\n• Use Pomodoro Technique (25min study, 5min break)\n• Prioritize difficult subjects when fresh\n\n**🧠 Memory Techniques:**\n• Active recall - test yourself regularly\n• Spaced repetition - review at intervals\n• Create visual mind maps\n• Teach concepts to others\n\n**📖 Effective Study Methods:**\n• Take handwritten notes\n• Practice past papers\n• Form study groups\n• Use platform quizzes for self-assessment\n\n**💡 Exam Preparation:**\n• Start early, don't cram\n• Focus on understanding, not memorizing\n• Take regular breaks\n• Stay hydrated and get enough sleep\n\n**Need subject-specific tips?** Just ask about any subject!`;
  }

  getPlatformGuide(userRole) {
    return `🗺️ **eduBridge Platform Guide:**\n\n**🏠 Dashboard:**\n• Quick access to all features\n• Recent activity overview\n• Progress summary\n\n**📚 Study Materials:**\n• PDF notes and textbooks\n• Video lectures\n• Filter by subject/grade/stream\n\n**🎯 Quizzes:**\n• Practice tests for all subjects\n• Instant scoring and feedback\n• Progress tracking\n\n**📝 Assignments:**\n• View and submit assignments\n• Track deadlines\n• Check grades and feedback\n\n**📈 Progress Tracking:**\n• Quiz performance analytics\n• Assignment completion status\n• Overall academic progress\n\n**💬 Discussion Forum:**\n• Ask questions\n• Help classmates\n• Connect with teachers\n\n**⚙️ Settings:**\n• Customize display preferences\n• Notification settings\n• Account management\n\n${userRole === 'Teacher' ? '**👨🏫 Teacher Features:**\n• Upload study materials\n• Create quizzes and assignments\n• Monitor student progress\n• Grade submissions' : ''}\n\n**Need help with a specific feature?** Just ask!`;
  }

  getAcademicResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi')) {
      return "Hello! Ask me about your studies - physics, chemistry, biology, math, or check your progress.";
    }
    
    if (msg.includes('physics')) {
      return "Physics topics: Motion (F=ma), Energy (KE=½mv²), Waves, Electricity. What do you need help with?";
    }
    
    if (msg.includes('chemistry')) {
      return "Chemistry topics: Atomic structure, Periodic table, Chemical bonding, Reactions. What would you like to know?";
    }
    
    if (msg.includes('biology')) {
      return "Biology topics: Cell structure, DNA/Genetics, Evolution, Ecology. Which topic interests you?";
    }
    
    if (msg.includes('math')) {
      return "Math topics: Algebra, Calculus (derivatives/integrals), Geometry, Trigonometry. What do you need help with?";
    }
    
    if (msg.includes('study') || msg.includes('exam')) {
      return "Study tips: Make a schedule, practice regularly, take breaks, use active recall. Which subject are you preparing for?";
    }
    
    return "I can help with: Physics, Chemistry, Biology, Math, Study tips, or show your quiz scores/progress. What do you need?";
  }



  isDataQuery(message) {
    const dataKeywords = ['quiz marks', 'quiz scores', 'my marks', 'my scores', 'assignments', 'my assignments', 'progress', 'my progress', 'performance', 'results', 'grades', 'submissions'];
    return dataKeywords.some(keyword => message.includes(keyword));
  }



  handleNavigationQuery(message, userRole) {
    if (message.includes('quiz')) {
      return `🎯 **Quiz Navigation:**\n\n**For ${userRole}s:**\n• **Take Quizzes:** Sidebar → Take Quizzes\n• **View Scores:** Ask me "show my quiz scores"\n• **Track Progress:** Sidebar → My Progress\n\n${userRole === 'Teacher' ? '**Teacher Options:**\n• Create Quiz: Sidebar → Create Quiz\n• View Student Scores: Sidebar → Quiz Scores' : ''}${userRole === 'Parent' ? '**Parent Access:**\n• Child Progress: Sidebar → Child Progress' : ''}`;
    }
    
    if (message.includes('assignment')) {
      return `📝 **Assignment Navigation:**\n\n**For ${userRole}s:**\n• **View Assignments:** Sidebar → Assignments\n• **Check Status:** Ask me "show my assignments"\n• **Submit Work:** Assignments → Upload File\n\n${userRole === 'Teacher' ? '**Teacher Options:**\n• Create Assignment: Sidebar → Create Assignment\n• Review Submissions: Sidebar → My Students' : ''}`;
    }
    
    if (message.includes('materials') || message.includes('study')) {
      return `📚 **Study Materials Navigation:**\n\n**Access:** Sidebar → Study Materials\n\n**Features:**\n• 📄 PDF notes and textbooks\n• 🎥 Video lectures\n• 📝 Practice worksheets\n• 🔍 Filter by subject/grade\n\n${userRole === 'Teacher' ? '**Upload Materials:** Sidebar → Upload Materials' : ''}`;
    }
    
    if (message.includes('progress') || message.includes('performance')) {
      return `📈 **Progress Navigation:**\n\n**For ${userRole}s:**\n• **My Progress:** Sidebar → My Progress\n• **Quick Check:** Ask me "show my progress"\n• **Quiz Analytics:** Sidebar → Take Quizzes → View History\n\n${userRole === 'Parent' ? '**Child Progress:** Sidebar → Child Progress' : ''}${userRole === 'Teacher' ? '**Student Analytics:** Sidebar → My Students' : ''}`;
    }
    
    if (message.includes('dashboard')) {
      return `🏠 **Dashboard Navigation:**\n\n**Quick Access Cards:**\n• Study Materials\n• Take Quizzes\n• View Assignments\n• Check Progress\n\n**Sidebar Menu:**\n• All platform features\n• Role-specific options\n• Settings & logout`;
    }
    
    if (message.includes('settings')) {
      return `⚙️ **Settings Navigation:**\n\n**Access:** Sidebar → Settings\n\n**Customize:**\n• Font size preferences\n• Theme selection\n• Display options\n• Account information`;
    }
    
    if (message.includes('discussion') || message.includes('forum')) {
      return `💬 **Discussion Forum:**\n\n**Access:** Sidebar → Discussions\n\n**Features:**\n• Ask questions\n• Share knowledge\n• Connect with peers\n• Get help from teachers`;
    }
    
    return `🗺️ **Platform Navigation Help:**\n\n**Main Sections:**\n• 🏠 Dashboard - Main hub\n• 📚 Study Materials - Learning resources\n• 🎯 Quizzes - Test knowledge\n• 📝 Assignments - Submit work\n• 📈 Progress - Track performance\n• 💬 Discussions - Community help\n• ⚙️ Settings - Preferences\n\n**Quick Tips:**\n• Use sidebar menu (☰) for navigation\n• Ask me about specific features\n• Check dashboard for quick access\n\nWhat specific section would you like help with?`;
  }

  handleStudyHelpQuery(message, userRole) {
    if (message.includes('exam') || message.includes('preparation')) {
      return `📖 **Exam Preparation Strategy:**\n\n**1. Study Plan:**\n• Review syllabus for each subject\n• Create a timetable with regular breaks\n• Focus on weak areas first\n\n**2. Use Platform Resources:**\n• Study materials for concept clarity\n• Practice quizzes for self-assessment\n• Track progress to identify gaps\n\n**3. Effective Techniques:**\n• Active recall and spaced repetition\n• Make summary notes\n• Solve previous year questions\n• Form study groups with classmates\n\n**Need subject-specific tips?** Just ask about any particular subject!`;
    }
    
    if (message.includes('time management') || message.includes('schedule')) {
      return `⏰ **Time Management for Students:**\n\n**Daily Schedule:**\n• 6-8 AM: Morning revision\n• School hours: Active participation\n• 4-6 PM: Homework and assignments\n• 7-9 PM: New topic study\n• 9-10 PM: Quick review\n\n**Weekly Plan:**\n• Monday-Friday: Regular subjects\n• Saturday: Weak subject focus\n• Sunday: Revision and practice tests\n\n**Tips:**\n• Use the Pomodoro Technique (25 min study, 5 min break)\n• Prioritize difficult subjects when fresh\n• Take regular breaks to avoid burnout`;
    }
    
    return `🎓 **Study Tips:**\n\n**Effective Learning:**\n• Break complex topics into smaller parts\n• Use visual aids and diagrams\n• Practice regularly with quizzes\n• Teach concepts to others\n\n**Platform Features to Use:**\n• Study materials for comprehensive learning\n• Quizzes for regular practice\n• Progress tracking to monitor improvement\n\nWhat specific study challenge can I help you with?`;
  }

  handleGreeting(userRole) {
    const greetings = [
      `Hello! I'm your AI study assistant on eduBridge. How can I help you with your ${userRole === 'Student' ? 'studies' : userRole === 'Teacher' ? 'teaching' : 'educational needs'} today?`,
      `Hi there! Welcome to eduBridge AI. I'm here to assist with educational content, platform navigation, and study guidance. What would you like to explore?`,
      `Good to see you! I can help explain concepts, guide you through the platform, or provide study tips. What's on your mind?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  handleProblemSolving(message, userRole) {
    return `🤔 **Problem-Solving Approach:**\n\n**Step 1: Identify the Issue**\n• What exactly are you struggling with?\n• Is it a concept, calculation, or application?\n\n**Step 2: Break It Down**\n• Divide complex problems into smaller parts\n• Identify what you already know\n\n**Step 3: Use Resources**\n• Check relevant study materials\n• Practice similar problems in quizzes\n• Review related concepts\n\n**Step 4: Practice**\n• Solve similar problems\n• Explain the solution to someone else\n\n**Need specific help?** Tell me the subject and topic, and I'll provide targeted guidance!`;
  }

  generateContextualResponse(message, userRole, history) {
    // Analyze message for context
    const hasQuestionWords = ['what', 'how', 'why', 'when', 'where', 'which'].some(word => message.includes(word));
    const hasSubject = Object.values(this.context.subjects).flat().some(subject => 
      message.includes(subject.toLowerCase())
    );
    
    if (hasQuestionWords && hasSubject) {
      return "I'd be happy to help with that topic! Could you be more specific about what aspect you'd like me to explain? I can provide detailed explanations, examples, or study tips.";
    }
    
    if (hasQuestionWords) {
      return `That's a great question! I can help with:\n\n📚 **Educational Content:** Explanations of concepts across all subjects\n🧭 **Platform Navigation:** How to use eduBridge features\n📖 **Study Guidance:** Tips for effective learning and exam preparation\n🎯 **Problem Solving:** Step-by-step approaches to challenges\n\nWhat specific area would you like assistance with?`;
    }
    
    // Contextual response based on conversation history
    if (history.length > 0) {
      const lastTopic = this.extractTopic(history[history.length - 1].message);
      if (lastTopic) {
        return `Continuing our discussion about ${lastTopic}... Is there a specific aspect you'd like to explore further, or do you have a new question?`;
      }
    }
    
    return `I understand you're looking for help with "${message}". While I may not have a specific answer for that exact query, I can assist with:\n\n• Subject explanations and concepts\n• Platform navigation and features\n• Study strategies and tips\n• Problem-solving approaches\n\nCould you rephrase your question or let me know which area you'd like help with?`;
  }

  extractTopic(message) {
    const subjects = Object.values(this.context.subjects).flat();
    return subjects.find(subject => message.toLowerCase().includes(subject.toLowerCase()));
  }

  // Subject-specific response methods
  getPhysicsResponse(message) {
    if (message.includes('motion') || message.includes('velocity') || message.includes('acceleration')) {
      return `⚡ **Physics - Motion:**\n\n**Key Concepts:**\n• Displacement vs Distance\n• Velocity = Δx/Δt\n• Acceleration = Δv/Δt\n\n**Equations of Motion:**\n• v = u + at\n• s = ut + ½at²\n• v² = u² + 2as\n\n**Study Tip:** Practice with real-world examples like car motion, falling objects. Use graphs to visualize motion!`;
    }
    
    if (message.includes('force') || message.includes('newton')) {
      return `🔧 **Physics - Forces:**\n\n**Newton's Laws:**\n1. **Inertia:** Object at rest stays at rest\n2. **F = ma:** Force equals mass times acceleration\n3. **Action-Reaction:** Equal and opposite forces\n\n**Types of Forces:**\n• Gravitational, Normal, Friction\n• Tension, Applied, Spring forces\n\n**Problem-Solving:** Always draw free body diagrams first!`;
    }
    
    return "Physics is fascinating! I can help with mechanics, thermodynamics, waves, electricity, and modern physics. What specific topic interests you?";
  }

  getChemistryResponse(message) {
    if (message.includes('periodic table') || message.includes('elements')) {
      return `🧪 **Chemistry - Periodic Table:**\n\n**Organization:**\n• Groups (vertical) - same valence electrons\n• Periods (horizontal) - same electron shells\n\n**Trends:**\n• Atomic radius decreases across period\n• Ionization energy increases across period\n• Electronegativity increases across period\n\n**Memory Tip:** Use mnemonics for element groups!`;
    }
    
    if (message.includes('bonding') || message.includes('molecular')) {
      return `🔗 **Chemistry - Chemical Bonding:**\n\n**Types:**\n• **Ionic:** Metal + Non-metal (electron transfer)\n• **Covalent:** Non-metal + Non-metal (electron sharing)\n• **Metallic:** Metal atoms (electron sea)\n\n**VSEPR Theory:** Electron pairs repel to minimize energy\n\n**Study Approach:** Draw Lewis structures, predict shapes!`;
    }
    
    return "Chemistry connects atoms to life! I can explain atomic structure, bonding, reactions, organic chemistry, and more. What would you like to explore?";
  }

  getBiologyResponse(message) {
    if (message.includes('cell') || message.includes('cellular')) {
      return `🔬 **Biology - Cell Biology:**\n\n**Cell Theory:**\n• All living things are made of cells\n• Cell is the basic unit of life\n• All cells come from pre-existing cells\n\n**Organelles:**\n• Nucleus (control center)\n• Mitochondria (powerhouse)\n• Ribosomes (protein synthesis)\n• ER, Golgi (transport system)\n\n**Study Tip:** Use diagrams and compare plant vs animal cells!`;
    }
    
    if (message.includes('genetics') || message.includes('dna')) {
      return `🧬 **Biology - Genetics:**\n\n**DNA Structure:**\n• Double helix with complementary base pairs\n• A-T and G-C pairing\n• Sugar-phosphate backbone\n\n**Central Dogma:**\nDNA → RNA → Protein\n\n**Inheritance:**\n• Mendel's laws of inheritance\n• Dominant vs recessive alleles\n• Punnett squares for predictions`;
    }
    
    return "Biology is the study of life! I can help with cell biology, genetics, evolution, ecology, human physiology, and more. What aspect interests you?";
  }

  getMathResponse(message) {
    if (message.includes('calculus') || message.includes('derivative') || message.includes('integral')) {
      return `📐 **Mathematics - Calculus:**\n\n**Derivatives (Rate of Change):**\n• d/dx(xⁿ) = nxⁿ⁻¹\n• Product rule: (uv)' = u'v + uv'\n• Chain rule: (f(g(x)))' = f'(g(x))·g'(x)\n\n**Integrals (Area Under Curve):**\n• ∫xⁿdx = xⁿ⁺¹/(n+1) + C\n• Fundamental theorem connects derivatives and integrals\n\n**Applications:** Optimization, area, volume calculations`;
    }
    
    if (message.includes('algebra') || message.includes('equation')) {
      return `🔢 **Mathematics - Algebra:**\n\n**Solving Equations:**\n• Linear: ax + b = 0\n• Quadratic: ax² + bx + c = 0\n• Use quadratic formula: x = (-b ± √(b²-4ac))/2a\n\n**Functions:**\n• Domain and range\n• Composition of functions\n• Inverse functions\n\n**Tip:** Always check your solutions by substituting back!`;
    }
    
    return "Mathematics is the language of patterns! I can help with algebra, geometry, trigonometry, calculus, statistics, and more. What topic needs clarification?";
  }

  getComputerScienceResponse(message) {
    if (message.includes('programming') || message.includes('code')) {
      return `💻 **Computer Science - Programming:**\n\n**Programming Fundamentals:**\n• Variables and data types\n• Control structures (if, loops)\n• Functions and procedures\n• Arrays and data structures\n\n**Problem-Solving Steps:**\n1. Understand the problem\n2. Plan the algorithm\n3. Write pseudocode\n4. Implement in chosen language\n5. Test and debug\n\n**Languages to Learn:** Python (beginner-friendly), Java, C++`;
    }
    
    if (message.includes('algorithm') || message.includes('data structure')) {
      return `🔄 **Computer Science - Algorithms & Data Structures:**\n\n**Common Algorithms:**\n• Searching: Linear, Binary search\n• Sorting: Bubble, Selection, Merge sort\n• Recursion and dynamic programming\n\n**Data Structures:**\n• Arrays, Linked Lists\n• Stacks, Queues\n• Trees, Graphs\n\n**Analysis:** Time and space complexity (Big O notation)`;
    }
    
    return "Computer Science opens doors to technology! I can help with programming concepts, algorithms, data structures, and computational thinking. What interests you?";
  }

  getAccountancyResponse(message) {
    return `💰 **Accountancy:**\n\n**Fundamental Equation:**\nAssets = Liabilities + Owner's Equity\n\n**Key Concepts:**\n• Double-entry bookkeeping\n• Debit and credit rules\n• Trial balance preparation\n• Financial statements\n\n**Study Approach:**\n• Practice journal entries daily\n• Understand the logic behind each transaction\n• Use T-accounts for visualization\n\nWhat specific accounting topic can I help clarify?`;
  }

  getEconomicsResponse(message) {
    return `📊 **Economics:**\n\n**Microeconomics:**\n• Supply and demand\n• Market structures\n• Consumer behavior\n• Production and costs\n\n**Macroeconomics:**\n• GDP, inflation, unemployment\n• Monetary and fiscal policy\n• International trade\n\n**Study Tips:**\n• Use graphs to understand relationships\n• Connect theory to real-world examples\n• Follow current economic news\n\nWhich economic concept would you like to explore?`;
  }

  getHistoryResponse(message) {
    return `📜 **History:**\n\n**Study Approach:**\n• Create timelines for chronological understanding\n• Understand cause and effect relationships\n• Analyze primary and secondary sources\n• Connect past events to present situations\n\n**Key Skills:**\n• Critical thinking and analysis\n• Interpretation of evidence\n• Understanding different perspectives\n• Essay writing and argumentation\n\n**Memory Techniques:**\n• Use mnemonics for dates\n• Create mind maps for complex topics\n• Tell stories to remember sequences\n\nWhat historical period or topic interests you?`;
  }

  async handleDataQuery(message, userRole, userId, userInfo) {
    try {
      if (message.includes('quiz') && (message.includes('marks') || message.includes('scores'))) {
        return await this.getQuizScores(userId, userRole, userInfo);
      }
      
      if (message.includes('assignment')) {
        return await this.getAssignments(userId, userRole, userInfo);
      }
      
      if (message.includes('progress') || message.includes('performance')) {
        return await this.getProgress(userId, userRole, userInfo);
      }
      
      return "I can help you check your quiz scores, assignments, and progress. What specific information would you like to see?";
    } catch (error) {
      return "I'm having trouble accessing your data right now. Please try again or check the respective sections directly.";
    }
  }

  async getQuizScores(userId, userRole, userInfo) {
    if (userRole === 'Student') {
      try {
        const query = `SELECT q.title, qs.score, qs.total_questions, qs.completed_at FROM QuizScores qs JOIN Quizzes q ON qs.quiz_id = q.id WHERE qs.user_id = ? ORDER BY qs.completed_at DESC LIMIT 3`;
        
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve("📊 **Quiz Scores:** Use sidebar → Take Quizzes to view detailed scores"), 2000);
          
          db.query(query, [userId], (err, results) => {
            clearTimeout(timeout);
            if (err || !results?.length) {
              resolve("📊 **Quiz Scores:** No scores yet. Take quizzes to track progress!\n\n**Access:** Sidebar → Take Quizzes");
              return;
            }
            
            let response = "📊 **Recent Quiz Scores:**\n\n";
            results.slice(0, 3).forEach((quiz) => {
              const pct = Math.round((quiz.score / quiz.total_questions) * 100);
              const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
              response += `${emoji} ${quiz.title}: ${quiz.score}/${quiz.total_questions} (${pct}%)\n`;
            });
            response += "\n**View All:** Sidebar → Take Quizzes";
            resolve(response);
          });
        });
      } catch (error) {
        return "📊 **Quiz Scores:** Access via Sidebar → Take Quizzes";
      }
    }
    return userRole === 'Parent' ? "👨👩👧👦 **Child Progress:** Sidebar → Child Progress" : "📊 **Quiz Scores:** Sidebar → Quiz Scores";
  }

  async getAssignments(userId, userRole, userInfo) {
    if (userRole === 'Student') {
      try {
        const query = `SELECT a.title, a.due_date FROM Assignments a WHERE a.grade = ? OR a.grade IS NULL ORDER BY a.due_date ASC LIMIT 3`;
        
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve("📝 **Assignments:** Use sidebar → Assignments for full list"), 2000);
          
          db.query(query, [userInfo.grade || 11], (err, results) => {
            clearTimeout(timeout);
            if (err || !results?.length) {
              resolve("📝 **Assignments:** No assignments found\n\n**Access:** Sidebar → Assignments");
              return;
            }
            
            let response = "📝 **Upcoming Assignments:**\n\n";
            results.slice(0, 3).forEach((assignment) => {
              const isOverdue = new Date(assignment.due_date) < new Date();
              const emoji = isOverdue ? '⚠️' : '📋';
              response += `${emoji} ${assignment.title} - Due: ${new Date(assignment.due_date).toLocaleDateString()}\n`;
            });
            response += "\n**View All:** Sidebar → Assignments";
            resolve(response);
          });
        });
      } catch (error) {
        return "📝 **Assignments:** Access via Sidebar → Assignments";
      }
    }
    return userRole === 'Teacher' ? "👨🏫 **Create/Manage:** Sidebar → Create Assignment" : "📝 **Assignments:** Sidebar → Assignments";
  }

  async getProgress(userId, userRole, userInfo) {
    if (userRole === 'Student') {
      try {
        const query = `SELECT COUNT(DISTINCT qs.quiz_id) as quizzes, AVG(qs.score/qs.total_questions * 100) as avg_score FROM QuizScores qs WHERE qs.user_id = ?`;
        
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve("📈 **Progress:** Use sidebar → My Progress for detailed analytics"), 2000);
          
          db.query(query, [userId], (err, results) => {
            clearTimeout(timeout);
            const progress = results?.[0] || {};
            const avgScore = progress.avg_score ? Math.round(progress.avg_score) : 0;
            const quizzes = progress.quizzes || 0;
            
            let response = "📈 **Quick Progress:**\n\n";
            response += `🎯 Quizzes: ${quizzes}\n📊 Avg Score: ${avgScore}%\n\n`;
            
            if (avgScore >= 80) response += "🏆 Excellent work!";
            else if (avgScore >= 60) response += "👍 Good progress!";
            else if (avgScore > 0) response += "📚 Keep practicing!";
            else response += "🚀 Start with quizzes!";
            
            response += "\n\n**Details:** Sidebar → My Progress";
            resolve(response);
          });
        });
      } catch (error) {
        return "📈 **Progress:** Access via Sidebar → My Progress";
      }
    }
    return userRole === 'Parent' ? "👨👩👧👦 **Child Progress:** Sidebar → Child Progress" : "📈 **Progress:** Dashboard analytics";
  }
}

const eduAI = new EduBridgeAI();

// Chat endpoint
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get user info for context
    const userInfoQuery = 'SELECT grade, stream_id FROM Users WHERE id = ?';
    const userInfo = await new Promise((resolve) => {
      db.query(userInfoQuery, [userId], (err, results) => {
        resolve(results && results[0] ? results[0] : {});
      });
    });

    const response = await eduAI.generateResponse(message.trim(), userId, userRole, userInfo);

    res.json({
      response,
      timestamp: new Date().toISOString(),
      userId
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Get conversation history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const history = eduAI.conversationHistory.get(userId) || [];
    
    res.json({
      history: history.slice(-10), // Last 10 exchanges
      count: history.length
    });

  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch conversation history' });
  }
});

// Clear conversation history
router.delete('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    eduAI.conversationHistory.delete(userId);
    
    res.json({ message: 'Conversation history cleared' });

  } catch (error) {
    console.error('History clear error:', error);
    res.status(500).json({ error: 'Failed to clear conversation history' });
  }
});

module.exports = router;