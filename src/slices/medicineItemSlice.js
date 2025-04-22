import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestConfig } from "../utils/requests";

const initialState = {
    medicinesItems: [],
    page: {},
    loading: false,
    error: false
}

export const searchCustomMedicinesItemUser = createAsyncThunk(
    'medicines/searchCustomMedicinesItem',
    async (pagination) => {
        const config = requestConfig("GET");
        let textFilter = "";
        if (pagination.initialDate && pagination.finalDate) {
            textFilter += "&initialDate=" + pagination.initialDate + "&finalDate=" + pagination.finalDate;
        }
        if (pagination.status && pagination?.status !== "TODOS") {
            textFilter += "&conclusion=" + pagination.status;
        }
        const res = await fetch(`http://localhost:8080/medicine/item?name=${pagination.name}&actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}` + textFilter, config)
            .then(res => res.json());

        return res;
    }
)

export const alterStatusMedicineItem = createAsyncThunk(
    'medicines/alterStatus',
    async (id) => {
        const config = requestConfig("PUT");
        const res = await fetch("http://localhost:8080/medicine/item/" + id + "/status", config)
            .then(res => res.json())
            .catch(err => err);
        return res;
    }
)

export const updateMedicineItem = createAsyncThunk(
    'medicines/updateMedicineItem',
    async (data) => {
        const config = requestConfig("PUT", data);
        const res = await fetch("http://localhost:8080/medicine/item/" + data.id, config)
            .then(res => res.json())
            .catch(err => err);

        return res;
    }
)

export const medicineItemSlice = createSlice({
    name: 'medicineItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchCustomMedicinesItemUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchCustomMedicinesItemUser.fulfilled, (state, action) => {
                state.loading = false;
                state.medicinesItems = action.payload.content;
                state.page = action.payload.page;
            })
            .addCase(searchCustomMedicinesItemUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(alterStatusMedicineItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(alterStatusMedicineItem.fulfilled, (state, action) => {
                state.loading = false;
                state.medicinesItems = state.medicinesItems.map(medicine => {
                    if (medicine.medicineItemId === action.payload.id) {
                        return {
                            ...medicine,
                            conclusion: action.payload.conclusion,
                            conclusionDayHour: action.payload.conclusionDayHour
                        }
                    }
                    return medicine;
                });
            })
            .addCase(alterStatusMedicineItem.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateMedicineItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMedicineItem.fulfilled, (state, action) => {
                state.loading = false;
                state.medicinesItems = state.medicinesItems.map(medicine => {
                    if (medicine.medicineItemId === action.payload.id) {
                        return {
                            ...medicine,
                            dayHour: action.payload.dayHour,
                            conclusion: action.payload.conclusion,
                            conclusionDayHour: action.payload.conclusionDayHour
                        }
                    }
                    return medicine;
                });
            })
            .addCase(updateMedicineItem.rejected, (state) => {
                state.loading = false;
            })
            
            ;
            
    }
})

export default medicineItemSlice.reducer;
