import axios from 'axios';

const isDevelopment = import.meta.env.DEV;
const apiUrl = isDevelopment 
  ? 'http://localhost:3000/api'
  : 'https://reminder-media.vercel.app/api';

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor for JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure headers object exists
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor with better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the full error details for debugging
    const errorDetails = {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers
    };
    console.error('API Error:', errorDetails);

    // Show error message to user
    if (error.response?.data?.message) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.response?.status === 400) {
      alert('Bad Request: Please check your input data');
    } else if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      alert('Forbidden: You do not have permission to perform this action');
    } else if (error.response?.status === 404) {
      alert('Resource not found');
    } else if (error.response?.status === 500) {
      alert('Server error: Please try again later');
    } else {
      alert('An unexpected error occurred');
    }

    return Promise.reject(error);
  }
); 