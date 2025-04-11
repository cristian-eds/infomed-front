import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    loading : false,
    error: null,
    success: null
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

export const changeUserPassword = createAsyncThunk(
    'user/changePassword',
    async (data,thunkApi) => {
        const token = localStorage.getItem("token");
        const passwords = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        }
        const config = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(passwords)
        }

        const res = await fetch(`http://localhost:8080/users/${data.id}`, config)
            .then(res => res);
        
        if(res.status == 400) {
            let body = await res.json();
            return thunkApi.rejectWithValue(body.description);
        } 
        
        if(res.status == 200) data.handleSuccessChangePassword();

        return res.status;
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
        .addCase(
            changeUserPassword.pending,
            (state) => {
                state.loading = true;
                state.error = null;
            }
        )
        .addCase(
            changeUserPassword.fulfilled,
            (state) => {
                state.loading = false;
            }   
        )
        .addCase(
            changeUserPassword.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
        )
    }
})


export default userSlice.reducer