import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000/api'
export const AUTH_URL = 'http://127.0.0.1:8000/api/auth';

const $api = axios.create({
    withCredentials: true,
    baseURL: AUTH_URL,
});

$api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('config - index_http.js:', config.headers.Authorization)
    }
    return config;
});

export default $api;