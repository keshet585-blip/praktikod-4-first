import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = apiUrl;

// request interceptor – מוסיף את ה-token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

// response interceptor – מזהה 401
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // אפשר רק לנקות את הטוקן
      localStorage.removeItem("token");
      // לא מבצעים ניווט אוטומטי
    }
    return Promise.reject(err);
  }
);


export default {
  getTasks: async () => {
    const result = await axios.get("/items");
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post("/items", { name });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const result = await axios.put(`/items/${id}`, { isComplete });
    return result.data;
  },

  deleteTask: async (id) => {
    await axios.delete(`/items/${id}`);
  }
};
