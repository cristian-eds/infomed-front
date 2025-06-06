import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL, requestConfig } from "../utils/requests";

const initialState = {
    logs: [],
    loading: false,
    page: {},
    error: null,
    success: null,
    sort: {
        fieldSort: "dateHour",
        typeSort: "DESC"
    }
}

export const fetchLogs = createAsyncThunk(
    'log/fetchLogs',
    async (pagination) => {
        const config = requestConfig("GET");

        const res = await fetch(`${API_URL}/log?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());
        return res;
    }
)

export const fetchMoreLogs = createAsyncThunk(
    'log/fetchMoreLogs',
    async (pagination) => {
        const config = requestConfig("GET");

        const res = await fetch(`${API_URL}/log?actualPage=${pagination.actualPage}&sizePage=${pagination.sizePage}`, config)
            .then(res => res.json());
        return res;
    }
)



export const logSlice = createSlice({
    name: 'log',
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

export const {
    changeFieldSort,
    changeTypeSort
} = logSlice.actions;

export default logSlice.reducer