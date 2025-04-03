import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    medicinesItems: [],
    medicines: [],
    loading: false,
    error: false,
    page: {},
    medicinePage: {}
}

export const fetchMedicinesUser = createAsyncThunk(
    'medicines/fetchMedicines',
    async (pagination) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const res = await fetch(`http://localhost:8080/medicine?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());
        return res;
    }
)

export const fetchMoreMedicinesUser = createAsyncThunk(
    'medicines/fetchMoreMedicines',
    async (pagination) => {
        console.log(pagination);
        const token = localStorage.getItem("token");
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const res = await fetch(`http://localhost:8080/medicine?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());

            console.log(res);
        return res;
    }
)


export const fetchCustomMedicinesItemsUser = createAsyncThunk(
    'medicines/fetchCustomMedicinesItems',
    async (pagination) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const res = await fetch(`http://localhost:8080/medicine/item?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());
        return res;
    }
)

export const searchMedicinesUser = createAsyncThunk(
    'medicines/searchMedicines',
    async (pagination) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const res = await fetch(`http://localhost:8080/medicine/item?name=${pagination.search}&actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());

        return res;
    }
)

export const createMedicine = createAsyncThunk(
    'medicines/createMedicine',
    async (data) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                'Accept': '*/*',
            },
            body: JSON.stringify(data)
        }
        const res = await fetch("http://localhost:8080/medicine", config)
            .then(res => res.json())
            .catch(err => err);
        return res;
    }
)

export const alterStatusMedicineItem = createAsyncThunk(
    'medicines/alterStatus',
    async (id) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
        const res = await fetch("http://localhost:8080/medicine/item/" + id + "/status", config)
            .then(res => res.json())
            .catch(err => err);
        return res;
    }
)

export const updateMedicineItem = createAsyncThunk(
    'medicines/updateMedicineItem',
    async (data) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        }
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
            .addCase(fetchCustomMedicinesItemsUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomMedicinesItemsUser.fulfilled, (state, action) => {
                state.loading = false;
                state.medicinesItems = action.payload.content;
                state.page = action.payload.page;
            })
            .addCase(fetchCustomMedicinesItemsUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMedicinesUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMedicinesUser.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines = action.payload.content;
                state.medicinePage = action.payload.page;
            })
            .addCase(fetchMedicinesUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
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
                state.medicinesItems = action.payload.content;
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