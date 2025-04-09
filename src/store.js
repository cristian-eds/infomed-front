import { configureStore } from "@reduxjs/toolkit";
import medicineReducer from './slices/medicineSlice';
import userReducer from './slices/userSlice';


export default configureStore({
    reducer: {
        medicine: medicineReducer,
        user: userReducer
    }
});