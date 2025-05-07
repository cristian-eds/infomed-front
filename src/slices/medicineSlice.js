import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestConfig } from "../utils/requests";

const initialState = {
    medicines: [],
    loading: false,
    error: false,
    filters: {
        name: "",
        actualPage: 0,
        sizePage: 6
    },
    medicinePage: {
        number: 0,
        size: 6,
        totalElements: null,
        totalPages: null
    },
    sort: {
        fieldSort: "registrationDate",
        typeSort: "DESC"
    }
}

export const fetchMoreMedicinesUser = createAsyncThunk(
    'medicine/fetchMoreMedicines',
    async (pagination) => {
        const config = requestConfig("GET");
        const res = await fetch(`http://localhost:8080/medicine?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());

        return res;
    }
)

export const searchMedicinesUser = createAsyncThunk(
    'medicine/searchMedicines',
    async (filters) => {
        const config = requestConfig("GET");
        const res = await fetch(`http://localhost:8080/medicine?name=${filters.name}&actualPage=${filters.actualPage}&sizePage=${filters.sizePage}`, config)
            .then(res => res.json());

        return res;
    }
)

export const deleteMedicine = createAsyncThunk(
    'medicine/deleteMedicine',
    async (id) => {
        const config = requestConfig("DELETE");
        const res = await fetch("http://localhost:8080/medicine/" + id, config)
            .then(res => res);

        if (res.status == 200) return id;

        return 0;
    }
)

export const createMedicine = createAsyncThunk(
    'medicine/createMedicine',
    async (data, {getState, dispatch}) => {
        const config = requestConfig("POST", data);
        const res = await fetch("http://localhost:8080/medicine", config)
            .then(res => res)
            .catch(err => err);

        if(res.status === 201) {
            dispatch(searchMedicinesUser(getState().medicine.filters));
        }
        return res.json();
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
        },
        changeValueFieldFilter: (state, action) => {
            state.filters[action.payload.field] = action.payload.value;
        },
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
            .addCase(createMedicine.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMedicine.fulfilled, (state, action) => {
                state.loading = false;
            })
    }
})

export const {
    changeFieldSort,
    changeTypeSort,
    changeValueFieldFilter
} = medicineSlice.actions;

export default medicineSlice.reducer;