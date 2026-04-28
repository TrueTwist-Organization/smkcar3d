import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const carService = {
  getAll: async () => {
    try {
      const response = await api.get('/cars');
      return response.data;
    } catch (error) {
      console.warn('Backend not detected. Operating in Local Snapshot Mode.');
      return []; // Fallback handled in components
    }
  },
  getOne: async (id) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
       return null; // Fallback to local data in components
    }
  },
  create: async (carData) => {
    try {
      const response = await api.post('/cars', carData);
      return response.data;
    } catch (error) {
      console.warn('Sync failed. Asset stored in local instance.');
      return carData;
    }
  },
  update: async (id, carData) => {
    try {
      const response = await api.put(`/cars/${id}`, carData);
      return response.data;
    } catch (error) {
      return carData;
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return { success: true, localOnly: true };
    }
  }
};

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  seedAdmin: async () => {
    const response = await api.post('/auth/seed');
    return response.data;
  }
};

export default api;
