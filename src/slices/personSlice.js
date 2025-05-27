import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { requestConfig } from "../utils/requests";


const initialState = {
    personList: [],
    loading: false,
    page: {
        number: 0,
        size: 6,
        totalElements: null,
        totalPages: null
    },
    sort: {
        fieldSort: "name",
        typeSort: "DESC"
    },
    detailsPerson: {},
    medicinesForPersonDetails: []
}

export const fetchPerson = createAsyncThunk(
    'person/fetch',
    async (_, { getState }) => {
        const config = requestConfig("GET");

        const res = await fetch(`http://localhost:8080/person?actualPage=${0}&sizePage=${getState().person.page.size}`, config)
            .then(res => res.json());

        return res;
    }
)


export const fetchMorePerson = createAsyncThunk(
    'person/fetchMore',
    async (_, { getState }) => {
        const config = requestConfig("GET");

        const res = await fetch(`http://localhost:8080/person?actualPage=${getState().person.page.number}&sizePage=${getState().person.page.size}`, config)
            .then(res => res.json());

        return res;
    }
)

export const createPerson = createAsyncThunk(
    'person/create',
    async (data) => {
        const config = requestConfig("POST", data);

        const res = await fetch(`http://localhost:8080/person`, config)
            .then(res => res.json());

        return res;
    }
)

export const fetchDetailsPerson = createAsyncThunk(
    'person/fetchPersonDetails',
    async (id) => {
        const config = requestConfig("GET");

        const res = await fetch(`http://localhost:8080/person/`+id , config)
            .then(res => res.json());

        return res;
    }
)

export const fetchMedicinesForDetailsPerson = createAsyncThunk(
    'person/fetchPersonDetailsMedicines',
    async (id) => {
        const config = requestConfig("GET");

        const res = await fetch(`http://localhost:8080/person/`+id+"/medicines" , config)
            .then(res => res.json());

        return res;
    }
)

export const personSlice = createSlice({
    name: "person",
    initialState,
    reducers: {
        incrementActualPage: (state) => {
            state.page.number = state.page.number + 1;
        },
        resetDetailsPerson: (state) => {
            state.detailsPerson = {}
            state.medicinesForPersonDetails = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPerson.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPerson.fulfilled, (state, action) => {
                state.loading = false;
                state.personList = action.payload.content;
                state.page = {
                    number: action.payload.currentPage,
                    size: action.payload.pageSize,
                    totalElements: action.payload.totalElements,
                    totalPages: action.payload.totalPages
                }
            })
            .addCase(createPerson.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPerson.fulfilled, (state, action) => {
                state.loading = false;
                state.personList.push(action.payload);
            })
            .addCase(fetchMorePerson.fulfilled, (state, action) => {
                state.personList.push(...action.payload.content);
                  state.page = {
                    number: action.payload.currentPage,
                    size: action.payload.pageSize,
                    totalElements: action.payload.totalElements,
                    totalPages: action.payload.totalPages
                }
            })
            .addCase(fetchDetailsPerson.fulfilled, (state,action) => {
                state.detailsPerson = action.payload;
            })
            .addCase(fetchMedicinesForDetailsPerson.fulfilled, (state, action) => {
                state.medicinesForPersonDetails = action.payload;
            })
    }
})

export const {
    incrementActualPage,
    resetDetailsPerson
} = personSlice.actions;

export default personSlice.reducer;