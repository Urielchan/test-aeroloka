import axiosInstance from "../api/axiosInstance";

const login = async (data) => {
    try {
        const response = await axiosInstance.post("/login", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const register = async (data) => {
    try {
        const response = await axiosInstance.post("/register", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const forgetPassword = async (data) => {
    try {
        const response = await axiosInstance.post("/forget-password", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const resetPassword = async (token, data) => {
    try {
        const response = await axiosInstance.post(
            `/reset-password?token=${token}`,
            data
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const verifyOtp = async (token, data) => {
    try {
        console.log("verify OTP:", data, token);
        const response = await axiosInstance.post(`/verify-otp?token=${token}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const resendOtp = async (data) => {
    try {
        console.log("resend OTP:", data);
        const response = await axiosInstance.post("/resend-otp", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export { login, forgetPassword, resetPassword, register, verifyOtp, resendOtp };
