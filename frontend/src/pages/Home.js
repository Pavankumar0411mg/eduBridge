import React from 'react';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';

const Home = ({ user }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>


      {/* Hero Section */}
      <div style={{ padding: '80px 20px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>Welcome to eduBridge</h1>
          <p style={{ fontSize: '24px', marginBottom: '40px', opacity: 0.9 }}>Enhancing education in rural areas</p>
          <p style={{ fontSize: '18px', marginBottom: '50px', lineHeight: 1.6 }}>
            Bridging the educational gap with quality learning resources for 11th and 12th standard students across Science, Commerce, and Arts streams.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/dashboard" style={{ background: 'white', color: '#667eea', padding: '15px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" style={{ background: 'white', color: '#667eea', padding: '15px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
                  Get Started
                </Link>
                <Link to="/login" style={{ background: 'transparent', color: 'white', padding: '15px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', border: '2px solid white' }}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ background: 'white', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '50px', color: '#333' }}>Why Choose eduBridge?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            
            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📚</div>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>Quality Content</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>Access comprehensive study materials, videos, and notes for all subjects across Science, Commerce, and Arts streams.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>Stream-Specific Learning</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>Tailored content for your chosen stream with subject-wise organization and grade-level filtering.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📱</div>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>Rural-Friendly Design</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>Optimized for low-bandwidth connections and mobile devices, perfect for rural internet conditions.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>👨‍🏫</div>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>Expert Teachers</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>Learn from qualified teachers who upload and manage high-quality educational content.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>Progress Tracking</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>Monitor your academic progress with quizzes, assessments, and detailed performance reports.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>👨‍👩‍👧‍👦</div>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>Parent Involvement</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>Parents can monitor their child's progress and stay updated with academic performance.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Streams Section */}
      <div style={{ background: '#f8f9fa', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '50px', color: '#333' }}>Academic Streams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginBottom: '15px' }}>Science Stream</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ padding: '5px 0' }}>Physics</li>
                <li style={{ padding: '5px 0' }}>Chemistry</li>
                <li style={{ padding: '5px 0' }}>Biology</li>
                <li style={{ padding: '5px 0' }}>Mathematics</li>
                <li style={{ padding: '5px 0' }}>Computer Science</li>
              </ul>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#764ba2', marginBottom: '15px' }}>Commerce Stream</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ padding: '5px 0' }}>Accountancy</li>
                <li style={{ padding: '5px 0' }}>Business Studies</li>
                <li style={{ padding: '5px 0' }}>Economics</li>
                <li style={{ padding: '5px 0' }}>Mathematics</li>
                <li style={{ padding: '5px 0' }}>English</li>
              </ul>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#28a745', marginBottom: '15px' }}>Arts Stream</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ padding: '5px 0' }}>History</li>
                <li style={{ padding: '5px 0' }}>Political Science</li>
                <li style={{ padding: '5px 0' }}>Geography</li>
                <li style={{ padding: '5px 0' }}>Sociology</li>
                <li style={{ padding: '5px 0' }}>Literature</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#333', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px' }}>eB</div>
            <h3>eduBridge</h3>
          </div>
          <p style={{ marginBottom: '20px', opacity: 0.8 }}>Bridging the educational gap in rural areas through technology</p>
          <p style={{ opacity: 0.6 }}>© 2024 eduBridge. Enhancing rural education for a better tomorrow.</p>
        </div>
      </footer>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;