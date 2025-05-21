// api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; // import router singleton

const Api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASEURL, // jika pakai .env
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor request: set Authorization
Api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response: handle 401
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");

      // Navigasi ke login (misalnya: /login)
      router.replace("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default Api;
