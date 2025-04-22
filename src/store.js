import { configureStore } from "@reduxjs/toolkit";
import medicineReducer from './slices/medicineSlice';
import userReducer from './slices/userSlice';;
import logReducer from './slices/logSlice'
import medicineItemReducer from './slices/medicineItemSlice';


export default configureStore({
    reducer: {
        medicine: medicineReducer,
        user: userReducer,
        log: logReducer,
        medicineItem: medicineItemReducer
    }
});