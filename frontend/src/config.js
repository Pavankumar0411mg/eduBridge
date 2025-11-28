const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.railway.app/api'  // Replace with your Railway backend URL
    : 'http://localhost:5000/api'
};

export default config;