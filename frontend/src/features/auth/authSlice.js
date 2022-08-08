import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";


//get user from local storage
const user = JSON.parse(localStorage.getItem('user'))
//states
const initialState = {
    user: user ? user : null,
    // user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}

//functions

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    console.log("register")
    try {
        return await authService.register(user);
    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }


})

export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        console.log("login")

        try {
            return await authService.login(user);
        } catch (error) {

            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }


    })


export const logout = createAsyncThunk('auth/logout',
    async (user, thunkAPI) => {
        return await authService.logout();

    })


//actions
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            // state.user = null
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true

                state.user = null
                state.message = action.payload
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },

})

export const { reset } = authSlice.actions
export default authSlice.reducer;