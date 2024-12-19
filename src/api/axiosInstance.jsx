import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://aeroloka-backend-development.up.railway.app/api/",
    timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : "";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use();

export default axiosInstance;