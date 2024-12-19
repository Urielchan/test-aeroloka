import axiosInstance from "../api/axiosInstance";


const getUserByEmail = async (email) => {
    try {
        const response = await axiosInstance.get(`/users/email?email=${email}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const updateUser = async (email, data) => {
    try {
        const response = await axiosInstance.put(`/users?email=${email}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const deleteUser = async (email) => {
    try {
        const response = await axiosInstance.delete(`/users?email=${email}`);
        return response
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export { getUserByEmail, updateUser, deleteUser };