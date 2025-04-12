import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    logs: [],
    loading: false,
    error: null,
    success: null
}

export const fetchLogs = createAsyncThunk(
    'log/fetchLogs',
    async (pagination) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        const res = await fetch(`http://localhost:8080/log?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());

        return res;
    }
)



export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchLogs.pending,
                (state) => {
                    state.loading = true;
                }
            )
            .addCase(
                fetchLogs.fulfilled,
                (state, action) => {
                    state.logs = action.payload.content;
                    state.loading = false;
                }
            )

    }
})


export default logSlice.reducer