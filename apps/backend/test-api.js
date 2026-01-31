
const axios = require('axios');

async function testApi() {
    const BASE_URL = 'http://localhost:3001';
    try {
        console.log('Testing /gallery/folders...');
        const response = await axios.get(`${BASE_URL}/gallery/folders`);
        console.log('Status:', response.status);
        console.log('Data count:', response.data.data.length);
    } catch (error) {
        console.error('API Test failed:', error.response?.data || error.message);
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log('Note: This endpoint is protected by JwtAuthGuard.');
        }
    }
}

testApi();
