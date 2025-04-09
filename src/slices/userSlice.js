import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    loading : false,
    error: false
}

export const fetchUser = createAsyncThunk(
    'user/fetchByEmail',
    async (email) => {
        const token = localStorage.getItem("token");
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        const res = await fetch(`http://localhost:8080/users?email=${email}`, config)
            .then(res => res.json());
        
        return res;
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchUser.pending,
            (state) => {
                state.loading = true;
            }
        )
        .addCase(
            fetchUser.fulfilled,
            (state, action) => {
                state.user = action.payload;
                state.loading = false;
            }
        )
        .addCase(
            fetchUser.rejected,
            (state) => {
                state.loading = false;
                state.error = true;
            }
        )
    }
})


export default userSlice.reducer