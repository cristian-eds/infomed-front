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

export const searchMedicinesUser = createAsyncThunk(
    'medicines/searchMedicines',
    async (query) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const res = await fetch("http://localhost:8080/medicine?name="+query, config)
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
            state.error = action.error.message;
        })
        .addCase(searchMedicinesUser.pending,(state) => {
            state.loading = true;
        })
        .addCase(searchMedicinesUser.fulfilled,(state,action) => {
            state.loading = false;
            state.medicines = action.payload;
        })
        .addCase(searchMedicinesUser.rejected,(state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default medicineSlice.reducer;