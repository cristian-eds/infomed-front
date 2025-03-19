import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    medicines: [],
    loading: false,
    error: false
}

export const fetchMedicinesUser = createAsyncThunk(
    'medicines/fetchMedicines',
    async () => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const res = await fetch("http://localhost:8080/medicine", config)
                                .then(res => res.json());

        return res;
    }
) 


export const medicineSlice = createSlice({
    name: 'medicine',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMedicinesUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchMedicinesUser.fulfilled, (state, action) => {
            state.loading = false;
            state.medicines = action.payload;
        }).addCase(fetchMedicinesUser.rejected, (state, action) => {
            state.loading = false;
            state.medicines = action.error.message;
        })
    }
})

export default medicineSlice.reducer;