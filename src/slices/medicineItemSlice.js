import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestConfig } from "../utils/requests";

const initialState = {
    medicinesItems: [],
    page: {},
    nextMedicineItem: {},
    loading: false,
    error: false
}

export const searchCustomMedicinesItemUser = createAsyncThunk(
    'medicineItems/searchCustomMedicinesItem',
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

export const createMedicine = createAsyncThunk(
    'medicines/createMedicine',
    async (data) => {
        const config = requestConfig("POST", data);
        const res = await fetch("http://localhost:8080/medicine", config)
            .then(res => res.json())
            .catch(err => err);
        return res;
    }
)

export const alterStatusMedicineItem = createAsyncThunk(
    'medicineItems/alterStatus',
    async (id) => {
        const config = requestConfig("PUT");
        const res = await fetch("http://localhost:8080/medicine/item/" + id + "/status", config)
            .then(res => res.json())
            .catch(err => err);
        return res;
    }
)

export const updateMedicineItem = createAsyncThunk(
    'medicineItems/updateMedicineItem',
    async (data) => {
        const config = requestConfig("PUT", data);
        const res = await fetch("http://localhost:8080/medicine/item/" + data.id, config)
            .then(res => res.json())
            .catch(err => err);

        return res;
    }
)

export const getNextMedicineItem = createAsyncThunk(
    'medicinesItems/nextMedicineItem',
    async () => {
        const config = requestConfig("GET");
        const res = await fetch("http://localhost:8080/medicine/item/next", config)
            .then(res => res);

        if(res.status === 204) return null;

        return res.json();
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
            .addCase(getNextMedicineItem.fulfilled, (state, action) => {
                state.nextMedicineItem = action.payload ? action.payload : {};
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
            });
    }
})

export default medicineItemSlice.reducer;
