const axios = require('axios');

async function testDebugEndpoint() {
  try {
    // Test login to get token
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      username: 'physics_teacher1',
      password: 'password'
    });
    
    const token = loginResponse.data.token;
    console.log('Token obtained');

    // Test quiz creation with debug server
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

    const debugResponse = await axios.post('http://localhost:5001/api/teachers/create-quiz', quizData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Debug response:', debugResponse.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testDebugEndpoint();