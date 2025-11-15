import axios from 'axios';

const apiUrl = "http://localhost:5260";

// הגדרת כתובת ה-API כברירת מחדל
axios.defaults.baseURL = apiUrl;

// הוספת interceptor לטיפול בשגיאות
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get('/items');
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name);
    const response = await axios.post('/items', { name });
    return response.data;
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    const response = await axios.put(`/items/${id}`, { isComplete });
    return response.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    await axios.delete(`/items/${id}`);
    return {};
  }
};
