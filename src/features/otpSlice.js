import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: JSON.parse(localStorage.getItem("otp"))?.email || null,
    otpToken: JSON.parse(localStorage.getItem("otp"))?.otpToken || null,
}

const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {
        setOtpData: (state, action) => {
            state.email = action.payload.email;
            state.otpToken = action.payload.otpToken;
            localStorage.setItem("otp", JSON.stringify({
                email: action.payload.email,
                otpToken: action.payload.otpToken
            }));
        },
        clearOtpData: (state) => {
            state.email = null;
            state.otpToken = null;
            localStorage.removeItem("otp");
        }
    }
})

export const { setOtpData, clearOtpData } = otpSlice.actions;
export default otpSlice.reducer;