import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { changePasswordService } from "service/LoginService"

const initialState = {
    isLoading: false,
    changePassword: {},
}

// change password
export const chanegPasswordAsync = createAsyncThunk("chanegPassword", async (params) => {
    const response = await changePasswordService(params)
    return response.data
})


export const password = createSlice({
    name: 'passwordSlice',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            // change password
            .addCase(chanegPasswordAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(chanegPasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.changePassword = action.payload
            })
    }
})

export const passwordSelector = state => state.password

export default password.reducer;