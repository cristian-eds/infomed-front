import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestConfig } from "../utils/requests";

const initialState = {
    medicines: [],
    loading: false,
    error: false,
    medicinePage: {},
    sort: {
        fieldSort: "registrationDate",
        typeSort: "ASC"
    }
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

export const deleteMedicine = createAsyncThunk(
    'medicines/deleteMedicine',
    async (id) => {
        const config = requestConfig("DELETE");
        const res = await fetch("http://localhost:8080/medicine/" + id, config)
            .then(res => res);

        if (res.status == 200) return id;

        return 0;
    }
)

export const medicineSlice = createSlice({
    name: 'medicine',
    initialState,
    reducers: {
        changeFieldSort: (state, action) => {
            state.sort.fieldSort = action.payload;
            state.sort.typeSort = "ASC";
        },
        changeTypeSort: (state) => {
            state.sort.typeSort = state.sort.typeSort === "ASC" ? "DESC" : "ASC";
        }
    },
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
                state.medicinePage = action.payload.page;
            })
            .addCase(searchMedicinesUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteMedicine.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMedicine.fulfilled, (state, action) => {
                state.medicines = state.medicines.filter(
                    medicine => medicine.id !== action.payload
                )
                state.loading = false;
            })
    }
})

export const {
    changeFieldSort,
    changeTypeSort
} = medicineSlice.actions;

export default medicineSlice.reducer;