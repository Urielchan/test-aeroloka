import axiosInstance from "../api/axiosInstance";

const createBooking = async (data) => {
    try {
        const response = await axiosInstance.post("/booking", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const getBookingByCode = async (code) => {
    try {
        const response = await axiosInstance.get(`/booking?bookingCode=${code}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export { createBooking, getBookingByCode  };