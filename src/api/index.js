import axios from 'axios';

const API = axios.create({
    baseURL: 'https://localhost:7001/api',
});

export default API;
