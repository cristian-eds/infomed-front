import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestConfig } from "../utils/requests";

const url = 'http://192.168.0.112:8080';

const initialState = {
    medicinesItems: [],
    filters: {
        name: "",
        initialDate: "",
        finalDate: "",
        conclusion: "TODOS",
        actualPage: 0,
        sizePage: 6
    },
    page: {
        number: 0,
        size: 6,
        totalElements: null,
        totalPages: null
    },
    sort: {
        fieldSort: "DAY_HOUR",
        typeSort: "ASC"
    },
    nextMedicineItem: {},
    loading: false,
    error: false
}

export const searchCustomMedicinesItemUser = createAsyncThunk(
    'medicineItems/searchCustomMedicinesItem',
    async (pagination, { getState }) => {
        const config = requestConfig("GET");

        const sort = getState().medicineItem.sort;
        const textSort = new URLSearchParams(sort).toString();

        const searchParam = new URLSearchParams();
        for (const key in pagination) {
            const value = pagination[key];
            if (value !== '' && value !== null && value !== undefined) {
                searchParam.append(key, value);
            }
        }

        const res = await fetch(`${url}/medicine/item?` + searchParam.toString() + "&" + textSort, config)
            .then(res => res.json());

        return res;
    }
)

export const createMedicine = createAsyncThunk(
    'medicineItems/createMedicine',
    async (data, {getState, dispatch}) => {
        const config = requestConfig("POST", data);
        const res = await fetch(url+"/medicine/item", config)
            .then(res => res)
            .catch(err => err);

        if(res.status === 201) {
            dispatch(searchCustomMedicinesItemUser(getState().medicineItem.filters));
        }

        return res.json();
    }
)

export const alterStatusMedicineItem = createAsyncThunk(
    'medicineItems/alterStatus',
    async (id) => {
        const config = requestConfig("PUT");
        const res = await fetch(url+"/medicine/item/" + id + "/status", config)
            .then(res => res)
            .catch(err => err);

        return res.json();
    }
)

export const updateMedicineItem = createAsyncThunk(
    'medicineItems/updateMedicineItem',
    async (data) => {
        const config = requestConfig("PUT", data);
        const res = await fetch(url+"/medicine/item/" + data.id, config)
            .then(res => res.json())
            .catch(err => err);

        return res;
    }
)

export const deleteMedicineItem = createAsyncThunk(
    'medicineItems/deleteMedicineItem',
    async (id, {getState, dispatch}) => {
        const config = requestConfig("DELETE");
        const res = await fetch(url+"/medicine/item/" + id, config)
            .then(res => res);

        if (res.status === 204) {
            dispatch(searchCustomMedicinesItemUser(getState().medicineItem.filters));
            return id;
        }
        return null;
    }
)

export const getNextMedicineItem = createAsyncThunk(
    'medicinesItems/nextMedicineItem',
    async () => {
        const config = requestConfig("GET");
        const res = await fetch(url+"/medicine/item/next", config)
            .then(res => res);

        if (res.status === 204) return null;

        return res.json();
    }
)

export const medicineItemSlice = createSlice({
    name: 'medicineItems',
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
        changeValuesFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        resetFilters: (state) => {
            state.filters = {
                name: "",
                initialDate: "",
                finalDate: "",
                conclusion: "TODOS",
                actualPage: 0,
                sizePage: 6
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchCustomMedicinesItemUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchCustomMedicinesItemUser.fulfilled, (state, action) => {
                state.medicinesItems = action.payload.content;
                state.page = action.payload.page;
                state.loading = false;
            })
            .addCase(searchCustomMedicinesItemUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(alterStatusMedicineItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(alterStatusMedicineItem.fulfilled, (state, action) => {
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
                state.loading = false;
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
            })
            .addCase(deleteMedicineItem.fulfilled, (state, action) => {
                if (action.payload) {
                    state.medicinesItems = state.medicinesItems.filter(
                        medicine => medicine.medicineItemId !== action.payload
                    )
                }
            })
            ;
    }
})

export const {
    changeFieldSort,
    changeTypeSort,
    changeValueFieldFilter,
    changeValuesFilter,
    resetFilters
} = medicineItemSlice.actions;

export default medicineItemSlice.reducer;
