import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL, requestConfig, requestConfigFormData } from "../utils/requests";


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

        const res = await fetch(`${API_URL}/person?actualPage=${0}&sizePage=${getState().person.page.size}`, config)
            .then(res => res.json());

        return res;
    }
)


export const fetchMorePerson = createAsyncThunk(
    'person/fetchMore',
    async (_, { getState }) => {
        const config = requestConfig("GET");

        const res = await fetch(`${API_URL}/person?actualPage=${getState().person.page.number}&sizePage=${getState().person.page.size}`, config)
            .then(res => res.json());

        return res;
    }
)

export const createPerson = createAsyncThunk(
    'person/create',
    async (data) => {
        const config = requestConfigFormData("POST", data);

        const res = await fetch(`${API_URL}/person`, config)
            .then(res => res.json());

        return res;
    }
)

export const fetchDetailsPerson = createAsyncThunk(
    'person/fetchPersonDetails',
    async (id) => {
        const config = requestConfig("GET");

        const res = await fetch(`${API_URL}/person/` + id, config)
            .then(res => res.json());

        return res;
    }
)

export const fetchMedicinesForDetailsPerson = createAsyncThunk(
    'person/fetchPersonDetailsMedicines',
    async (id) => {
        const config = requestConfig("GET");

        const res = await fetch(`${API_URL}/person/` + id + "/medicines", config)
            .then(res => res.json());

        return res;
    }
)

export const updatePerson = createAsyncThunk(
    'person/updatePerson',
    async (data) => {
        const config = requestConfig("PUT", data);

        const res = await fetch(`${API_URL}/person/` + data.id, config)
            .then(res => res.json());

        return res;
    }
)

export const deletePerson = createAsyncThunk(
    'person/delete',
    async (id) => {
        const config = requestConfig("DELETE");

        const res = await fetch(`${API_URL}/person/` + id, config)
            .then(res => res);

        if (res.status === 204) {
            return id;
        }

        return null;
    }
)

export const generateCode = createAsyncThunk(
    'person/generateCode',
    async (id) => {
        const config = requestConfig("POST");

        const res = await fetch(`${API_URL}/person/${id}/accessCode`, config)
            .then(res => res);

        console.log(res.status)
        if(res.status == 200) {
            return res.json();
        }

        return null;
    }
)

export const updateImagePerson = createAsyncThunk(
    'person/uploadImage',
    async (data) => {
        const config = requestConfigFormData("PUT", data);

        const res = await fetch(`${API_URL}/person/${data.personId}/image`, config)
            .then(res => res.json());

        return res;
    }
)

export const deleteImagePerson = createAsyncThunk(
    'person/deleteImage',
    async (id) => {
        const config = requestConfig("DELETE");

        const res = await fetch(`${API_URL}/person/${id}/image`, config)
            .then(res => res);

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
        },
        changeFieldSort: (state, action) => {
            state.sort.fieldSort = action.payload;
            state.sort.typeSort = "ASC";
        },
        changeTypeSort: (state) => {
            state.sort.typeSort = state.sort.typeSort === "ASC" ? "DESC" : "ASC";
        },
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
            .addCase(fetchDetailsPerson.fulfilled, (state, action) => {
                state.detailsPerson = action.payload;
            })
            .addCase(fetchMedicinesForDetailsPerson.fulfilled, (state, action) => {
                state.medicinesForPersonDetails = action.payload;
            })
            .addCase(updatePerson.fulfilled, (state, action) => {
                state.detailsPerson = action.payload;
            })
            .addCase(deletePerson.fulfilled, (state, action) => {
                if (action.payload) {
                    state.personList = state.personList.filter(person => person.id !== action.payload);
                }
            })
            .addCase(generateCode.fulfilled, (state, action) => {
                if(action.payload) {
                    state.detailsPerson.accessCode = action.payload.accessCode;
                }
            })
            .addCase(updateImagePerson.fulfilled, (state, action) => {
                if(action.payload) {
                    state.detailsPerson.imageUrl = action.payload.imageUrl;
                }
            })
            .addCase(deleteImagePerson.fulfilled, (state) => {
                state.detailsPerson.imageUrl = "";
            })
    }
})

export const {
    incrementActualPage,
    resetDetailsPerson,
    changeFieldSort,
    changeTypeSort
} = personSlice.actions;

export default personSlice.reducer;