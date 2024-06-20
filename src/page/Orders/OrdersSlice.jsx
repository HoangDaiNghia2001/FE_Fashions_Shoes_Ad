import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { confirmedOrderService, deleteOrderService, deleteSomeOrderService, deliveredOrderService, filterOrdersService, getDistrictByProvinceService, getProvinceService, getWardByDistrictService, shippeddOrderService } from "service/OrdersService"

const initialState = {
    isLoading: false,
    isLoadListOrders: false,
    listOrders: [],
    totalOrder: 0,
    orderItem: {}
}

// get provinces
export const getProvinceAsync = createAsyncThunk("getPrrovince", async () => {
    const response = await getProvinceService()
    return response.data
})

// get district by province
export const getDistrictByProvinceAsync = createAsyncThunk("getDistrict", async (param) => {
    const response = await getDistrictByProvinceService(param)
    return response.data
})

// get ward by district
export const getWardByDistrictAsync = createAsyncThunk("getWard", async (param) => {
    const response = await getWardByDistrictService(param)
    return response.data
})

// get all orders
export const filterOrdersAsync = createAsyncThunk('filterOrders', async (params) => {
    const response = await filterOrdersService(params)
    return response.data
})

// confirmed orders
export const confirmedOrderAsync = createAsyncThunk('confirmedOrder', async (id) => {
    const response = await confirmedOrderService(id)
    return response.data
})

// confirmed orders
export const shippedOrderAsync = createAsyncThunk('shippedOrder', async (id) => {
    const response = await shippeddOrderService(id)
    return response.data
})

// delivered orders
export const deliveredOrderAsync = createAsyncThunk('deliveredOrder', async (id) => {
    const response = await deliveredOrderService(id)
    return response.data
})

// delete order
export const deleteOrderAsync = createAsyncThunk('deleteOrder', async (id) => {
    const response = await deleteOrderService(id)
    return response.data
})

// delete some orders
export const deleteSomeOrdersAsync = createAsyncThunk('deleteSomeOrders', async (params) => {
    const response = await deleteSomeOrderService(params)
    return response.data
})

export const orders = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            // get provinces
            .addCase(getProvinceAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProvinceAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            // get district
            .addCase(getDistrictByProvinceAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDistrictByProvinceAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            // get ward
            .addCase(getWardByDistrictAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWardByDistrictAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            // filter orders
            .addCase(filterOrdersAsync.pending, (state) => {
                state.isLoadListOrders = true
            })
            .addCase(filterOrdersAsync.fulfilled, (state, action) => {
                state.isLoadListOrders = false
                state.listOrders = action.payload.results.listOrders
                state.totalOrder = action.payload.results.total
            })

            // confirm order
            .addCase(confirmedOrderAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(confirmedOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderItem = action.payload
            })

            // shipped order
            .addCase(shippedOrderAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(shippedOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderItem = action.payload
            })

            // delivered order
            .addCase(deliveredOrderAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deliveredOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderItem = action.payload
            })

            // delete order
            .addCase(deleteOrderAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderItem = action.payload
            })

            // delete some orders
            .addCase(deleteSomeOrdersAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteSomeOrdersAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderItem = action.payload
            })
    }
})

export const ordersSelector = state => state.orders

export default orders.reducer