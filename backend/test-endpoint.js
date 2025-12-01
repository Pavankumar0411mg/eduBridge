const axios = require('axios');

async function testEndpoint() {
  try {
    // Test health endpoint first
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('Health check:', healthResponse.data);

    // Test login to get token
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      username: 'physics_teacher1',
      password: 'password'
    });
    
    console.log('Login successful:', loginResponse.data.message);
    const token = loginResponse.data.token;

    // Test quiz creation
    const quizData = {
      title: 'Test Physics Quiz',
      description: 'Test Description',
      time_limit: 60,
      questions: [
        {
          question_text: 'What is the speed of light?',
          option_a: '3x10^8 m/s',
          option_b: '2x10^8 m/s',
          option_c: '4x10^8 m/s',
          option_d: '5x10^8 m/s',
          correct_answer: 'A',
          marks: 1
        }
      ]
    };

    const quizResponse = await axios.post('http://localhost:5000/api/teachers/create-quiz', quizData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Quiz creation successful:', quizResponse.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

testEndpoint();