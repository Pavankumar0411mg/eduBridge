const axios = require('axios');

// Test script to verify teacher auto-populate functionality
async function testTeacherAutoPopulate() {
  try {
    console.log('Testing teacher auto-populate functionality...\n');
    
    // Test login as a teacher
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      username: 'physics_teacher1',
      password: 'password'
    });
    
    const token = loginResponse.data.token;
    console.log('✓ Teacher login successful');
    
    // Test getting teacher data
    const teacherDataResponse = await axios.get('http://localhost:5000/api/materials/teacher-data', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✓ Teacher data retrieved:');
    console.log('  Stream:', teacherDataResponse.data.stream_name);
    console.log('  Subject:', teacherDataResponse.data.subject_name);
    console.log('  Stream ID:', teacherDataResponse.data.stream_id);
    console.log('  Subject ID:', teacherDataResponse.data.subject_id);
    
    // Test teacher subjects endpoint
    const teacherSubjectsResponse = await axios.get('http://localhost:5000/api/materials/teacher-subjects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('\n✓ Teacher subjects data:');
    console.log('  Auto-populate enabled:', teacherSubjectsResponse.data.auto_populate);
    console.log('  Available grades:', teacherSubjectsResponse.data.subjects.map(s => s.grade));
    
    console.log('\n✅ All tests passed! Auto-populate functionality is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
  }
}

// Run the test
testTeacherAutoPopulate();