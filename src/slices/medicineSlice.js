import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestConfig } from "../utils/requests";

const initialState = {
    medicinesItems: [],
    medicines: [],
    loading: false,
    error: false,
    page: {},
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

export const searchCustomMedicinesItemUser = createAsyncThunk(
    'medicines/searchCustomMedicinesItem',
    async (pagination) => {
        const config = requestConfig("GET");
        let textFilter = "";
        if(pagination.initialDate && pagination.finalDate) {
            textFilter += "&initialDate="+pagination.initialDate+"&finalDate="+pagination.finalDate;
        }
        if(pagination.status && pagination?.status !== "TODOS") {
            textFilter += "&conclusion="+pagination.status;
        }
        const res = await fetch(`http://localhost:8080/medicine/item?name=${pagination.name}&actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`+textFilter, config)
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
        const config = requestConfig("PUT",data);
        const res = await fetch("http://localhost:8080/medicine/item/" + data.id, config)
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
            });
    }
})

export default medicineSlice.reducer;