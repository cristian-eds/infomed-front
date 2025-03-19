import { configureStore } from "@reduxjs/toolkit";
import medicineReducer from './slices/medicineSlice';


export default configureStore({
    reducer: {
        medicine: medicineReducer
    }
});