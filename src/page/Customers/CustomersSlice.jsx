import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserService, deleteSomeUsersService, deleteUserService, filterUsersService, getAllRolesService, updateUserService } from "service/CustomersService"

const initialState = {
    isLoading: false,
    userInfor: {},
    listUsers: [],
    totalUser: 0,
}

export const filtertUsersAsync = createAsyncThunk('filtertUsers', async (params) => {
    const response = await filterUsersService(params)
    return response.data
})

export const createUserAsync = createAsyncThunk('createUser', async (params) => {
    const response = await createUserService(params)
    return response.data
})

export const updateUserAsync = createAsyncThunk('updateUser', async (params) => {
    const response = await updateUserService(params)
    return response.data
})

export const deleteUserAsync = createAsyncThunk('deleteUser', async (params) => {
    const response = await deleteUserService(params)
    return response.data
})

export const deleteSomeUsersAsync = createAsyncThunk('deleteSomeUsers', async (params) => {
    const response = await deleteSomeUsersService(params)
    return response.data
})

export const getAllRolesAsync = createAsyncThunk('getAllRoles', async () => {
    const response = await getAllRolesService()
    return response.data
})

export const customers = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            .addCase(filtertUsersAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(filtertUsersAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listUsers = action.payload.results.users
                state.totalUser = action.payload.results.total
            })

            .addCase(createUserAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.userInfor = action.payload
            })

            .addCase(updateUserAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.userInfor = action.payload
            })

            .addCase(deleteUserAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.userInfor = action.payload
            })

            .addCase(deleteSomeUsersAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteSomeUsersAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.userInfor = action.payload
            })

            .addCase(getAllRolesAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllRolesAsync.fulfilled, (state) => {
                state.isLoading = false
            })
    }
})

export const customersSelector = state => state.customers

export default customers.reducer