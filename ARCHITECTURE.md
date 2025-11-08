# EduBridge - Architectural Map

## System Overview
EduBridge is a full-stack educational management system built with React frontend, Node.js/Express backend, and MySQL database.

## Architecture Layers

### 1. Frontend (React)
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BackButton.js
│   │   ├── Chatbot.js
│   │   ├── Header.js
│   │   └── Sidebar.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Materials.js
│   │   ├── Settings.js
│   │   ├── CreateQuiz.js
│   │   ├── TakeQuiz.js
│   │   └── UploadMaterial.js
│   ├── App.js
│   └── index.js
```

### 2. Backend (Node.js/Express)
```
backend/
├── config/
│   └── database.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth.js
│   ├── materials.js
│   ├── quizzes.js
│   ├── streams.js
│   └── users.js
├── uploads/
└── server.js
```

### 3. Database (MySQL)
```
Database: edubridgedb
├── Users (Admin, Teacher, Student, Parent)
├── Streams (Science, Commerce, Arts)
├── Subjects (Physics, Chemistry, Biology, etc.)
├── StudyMaterials
├── Quizzes
├── QuizQuestions
├── QuizAttempts
└── TeacherSubjects
```

## Data Flow

### Authentication Flow
1. User → Login Page → Backend Auth
2. JWT Token → Local Storage
3. Protected Routes → Token Validation

### Material Management Flow
1. Teacher/Admin → Upload Material → Backend Validation
2. File Storage → Database Record
3. Student → View Materials → Filtered by Grade/Stream

### Quiz System Flow
1. Teacher → Create Quiz → Questions Storage
2. Student → Take Quiz → Attempt Recording
3. Results → Score Calculation → Progress Tracking

## User Roles & Permissions

### Admin
- Full system access
- User management
- Content oversight
- System configuration

### Teacher
- Subject-specific material upload
- Quiz creation for assigned subjects
- Student progress monitoring
- Grade/stream restricted access

### Student
- Material access (filtered by grade/stream)
- Quiz participation
- Progress viewing
- Settings customization

### Parent
- Child progress monitoring
- Notification access

## Key Features

### Role-Based Access Control
- JWT authentication
- Route protection
- Resource authorization

### Stream-Based Organization
- Science (Physics, Chemistry, Biology, Math, CS)
- Commerce (Accounts, Business, Economics, Math, English)
- Arts (History, Political Science, Geography, Sociology, Literature)

### Grade Management
- Grade 11 & 12 support
- Grade-specific content filtering

### File Management
- Multer file upload
- Physical file storage
- Database metadata

## Security Features
- Password hashing (bcrypt)
- JWT token authentication
- Role-based authorization
- Input validation
- File type restrictions

## Technology Stack
- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, Multer
- **Database**: MySQL
- **Authentication**: JWT, bcrypt
- **Styling**: CSS3, Responsive Design