import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

/*
  This is an interceptor. It runs before every request.
  It gets the token from localStorage and adds it to the request headers.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;