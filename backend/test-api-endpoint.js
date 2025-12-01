const axios = require('axios');

async function testAPI() {
  try {
    // First, login as physics_teacher1 to get a token
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      username: 'physics_teacher1',
      password: 'password'
    });
    
    console.log('Login successful:', loginResponse.data.user.full_name);
    const token = loginResponse.data.token;
    
    // Now test the my-students endpoint
    const studentsResponse = await axios.get('http://localhost:5000/api/teachers/my-students', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log(`\nAPI Response: Found ${studentsResponse.data.length} students`);
    studentsResponse.data.slice(0, 3).forEach(student => {
      console.log(`- ${student.full_name} (Grade ${student.grade}, ${student.stream_name})`);
    });
    
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
  }
}

testAPI();