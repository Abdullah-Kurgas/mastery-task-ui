import axios from 'axios';

const apiManager = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
    responseType: 'json'
});

export default apiManager;