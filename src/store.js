import { configureStore } from "@reduxjs/toolkit";

import bookingReducer from "./features/bookingSlice";
import userReducer from "./features/userSlice";
import otpReducer from "./features/otpSlice";

export const store = configureStore({
    reducer:{
        bookingState: bookingReducer,
        userState: userReducer,
        otpState: otpReducer
    }
})