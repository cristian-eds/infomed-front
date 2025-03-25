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
        const res = await fetch("http://localhost:8080/medicine?name=" + query, config)
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
            .then(res => res.status)
            .catch(err => err);
        return id;
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
        const res = await fetch("http://localhost:8080/medicine/item/" + data.id , config)
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
            .addCase(searchMedicinesUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchMedicinesUser.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines = action.payload;
                console.log(state.medicines)
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
                state.medicines.unshift(action.payload)
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
                state.medicines = state.medicines.map(medicine => ({
                    ...medicine,
                    medicineItems: medicine.medicineItems.map(item => {
                        if (item.id === action.payload) {
                            return {
                                ...item,
                                conclusion: !item.conclusion
                            };
                        }
                        return item;
                    })
                }))
            })
            .addCase(alterStatusMedicineItem.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateMedicineItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMedicineItem.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines = state.medicines.map(
                    medicine => ({
                        ...medicine,
                        medicineItems: medicine.medicineItems.map(
                            item => {
                                if(item.id === action.payload.id) {
                                    return action.payload;
                                }
                                return item;
                            }
                        )
                    })
                )
            })
            .addCase(updateMedicineItem.rejected, (state) => {
                state.loading = false;
            });
    }
})

export default medicineSlice.reducer;