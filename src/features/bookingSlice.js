import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
    token: JSON.parse(localStorage.getItem("booking"))?.token || null,
    bookingCode: JSON.parse(localStorage.getItem("booking"))?.bookingCode || null,
};

const getBookingFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("booking")) || defaultValue;
};

const bookingSlice = createSlice({
    name: "booking",
    initialState: getBookingFromLocalStorage(),
    reducers: {
        addBooking: (state, action) => {
            const { token, bookingCode } = action.payload;
            state.token = token;
            state.bookingCode = bookingCode;
            localStorage.setItem("booking", JSON.stringify(state));
            toast.success(`Booking saved successfully`);
        },
    },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
