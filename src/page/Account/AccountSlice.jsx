import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { updateInformationService } from "service/AccountService"

const initialState = {
    isLoading: false,
    adminInforUpdate: {},
}

// update information
export const updateInformationAsync = createAsyncThunk("updateInfor", async (params) => {
    const response = await updateInformationService(params)
    return response.data
})

export const account = createSlice({
    name: 'AccountSlice',
    initialState,
    reducers: {
        testAcount: (state, action) => {
            state.adminInforUpdate = action.payload
        }
    },
    extraReducers: builder => {
        builder
            // update information
            .addCase(updateInformationAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateInformationAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.adminforUpdate = action.payload
            })
    }
})

export const { testAcount } = account.actions

export const accountSelector = state => state.account

export default account.reducer