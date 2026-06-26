import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Automatically attach JWT token
API.interceptors.request.use(
  (config) => {
    try {
      const user = JSON.parse(localStorage.getItem("shophub_user"));

      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (err) {
      console.error("Token parse error:", err);
      localStorage.removeItem("shophub_user");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired/invalid token
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("shophub_user");
      delete API.defaults.headers.common["Authorization"];

      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// ================= AUTH =================

export const register = (data) => API.post("/auth/register", data);

export const login = (data) => API.post("/auth/login", data);

export const getMe = () => API.get("/auth/me");

// ================= PRODUCTS =================

export const getProducts = (category) =>
  API.get("/products", {
    params: category ? { category } : {},
  });

export const getLiked = () => API.get("/products/liked");

export const getMyProducts = () => API.get("/products/mine");

export const createProduct = (data) => API.post("/products", data);

export const updateProduct = (id, data) => API.put(`/products/${id}`, data);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const toggleLike = (id) => API.post(`/products/${id}/like`);

export default API;
