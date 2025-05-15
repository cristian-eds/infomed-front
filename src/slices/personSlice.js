import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { requestConfig } from "../utils/requests";


const initialState = {
    personList: [],
    loading: false,
    sort: {
        fieldSort: "name",
        typeSort: "DESC"
    }
}

export const fetchPerson = createAsyncThunk(
    'person/fetch',
    async () => {
        const config = requestConfig("GET");

        const res = await fetch(`http://localhost:8080/person?actualPage=${0}&sizePage=${6}`, config)
            .then(res => res.json());
        return res;
    }
)

export const personSlice = createSlice({
    name: "person",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPerson.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPerson.fulfilled, (state, action) => {
                state.loading = false;
                state.personList = action.payload.content;
            })
    }
})

export default personSlice.reducer;