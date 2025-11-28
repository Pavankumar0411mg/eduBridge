import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Materials from './pages/Materials';
import UploadMaterial from './pages/UploadMaterial';
import QuizScores from './pages/QuizScores';
import Quizzes from './pages/Quizzes';
import TakeQuiz from './pages/TakeQuiz';
import Settings from './pages/Settings';
import MyStudents from './pages/MyStudents';
import CreateQuiz from './pages/CreateQuiz';
import UserManagement from './pages/UserManagement';
import ChildProgress from './pages/ChildProgress';
import DiscussionForum from './pages/DiscussionForum';
import StudentProgress from './pages/StudentProgress';
import CreateAssignment from './pages/CreateAssignment';
import Assignments from './pages/Assignments';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user && <Sidebar user={user} onLogout={handleLogout} onToggle={setSidebarCollapsed} />}
        {user && <Header user={user} onLogout={handleLogout} />}
        {user && <Chatbot />}
        
        <div style={{ 
          marginLeft: user ? (sidebarCollapsed ? '0' : '250px') : '0', 
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
          paddingTop: user ? '60px' : '0'
        }}>
          <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/materials" 
            element={user ? <Materials user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/upload" 
            element={user && (user.role === 'Admin' || user.role === 'Teacher') ? <UploadMaterial user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/quiz-scores" 
            element={user && user.role === 'Admin' ? <QuizScores user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/quizzes" 
            element={user ? <Quizzes user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/quiz/:quizId" 
            element={user ? <TakeQuiz user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/settings" 
            element={user ? <Settings user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/my-students" 
            element={user && user.role === 'Teacher' ? <MyStudents user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/create-quiz" 
            element={user && user.role === 'Teacher' ? <CreateQuiz user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/user-management" 
            element={user && user.role === 'Admin' ? <UserManagement user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/child-progress" 
            element={user && user.role === 'Parent' ? <ChildProgress user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/discussions" 
            element={user ? <DiscussionForum user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/my-progress" 
            element={user && user.role === 'Student' ? <StudentProgress user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/create-assignment" 
            element={user && user.role === 'Teacher' ? <CreateAssignment user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/assignments" 
            element={user ? <Assignments user={user} /> : <Navigate to="/" />} 
          />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;