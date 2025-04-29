import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { requestConfig } from "../utils/requests";

const initialState = {
    logs: [],
    loading: false,
    page: {},
    error: null,
    success: null,
    sort: {
        fieldSort: "registrationDate",
        typeSort: "ASC"
    }
}

export const fetchLogs = createAsyncThunk(
    'log/fetchLogs',
    async (pagination) => {
        const config = requestConfig("GET");

        const res = await fetch(`http://localhost:8080/log?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());
        return res;
    }
)

export const fetchMoreLogs = createAsyncThunk(
    'log/fetchMoreLogs',
    async (pagination) => {
        const config = requestConfig("GET");

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
                    state.page = action.payload.page;
                }
            )
            .addCase(
                fetchMoreLogs.pending,
                (state) => {
                    state.loading = true;
                }
            )
            .addCase(
                fetchMoreLogs.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.logs.push(...action.payload.content);
                    state.page = action.payload.page;
                }
            )
    }
})


export default logSlice.reducer