import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestConfig } from "../utils/requests";

const initialState = {
    medicinesItems: [],
    medicines: [],
    loading: false,
    error: false,
    medicinePage: {}
}

export const fetchMoreMedicinesUser = createAsyncThunk(
    'medicines/fetchMoreMedicines',
    async (pagination) => {
        const config = requestConfig("GET");
        const res = await fetch(`http://localhost:8080/medicine?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());

        return res;
    }
)

export const searchMedicinesUser = createAsyncThunk(
    'medicines/searchMedicines',
    async (pagination) => {
        const config = requestConfig("GET");
        const res = await fetch(`http://localhost:8080/medicine?name=${pagination.search}&actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());

        return res;
    }
)

export const createMedicine = createAsyncThunk(
    'medicines/createMedicine',
    async (data) => {
        const config = requestConfig("POST",data);
        const res = await fetch("http://localhost:8080/medicine", config)
            .then(res => res.json())
            .catch(err => err);
        return res;
    }
)

export const medicineSlice = createSlice({
    name: 'medicine',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoreMedicinesUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMoreMedicinesUser.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines.push(...action.payload.content);
                state.medicinePage = action.payload.page;
            })
            .addCase(fetchMoreMedicinesUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(searchMedicinesUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchMedicinesUser.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines = action.payload.content;
            })
            .addCase(searchMedicinesUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createMedicine.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMedicine.fulfilled, (state, action) => {
                state.loading = false;
                state.medicinesItems.unshift(...action.payload);
            })
            .addCase(createMedicine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default medicineSlice.reducer;