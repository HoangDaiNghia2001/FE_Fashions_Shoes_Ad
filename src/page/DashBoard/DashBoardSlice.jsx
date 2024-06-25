import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
    countProductsByBrandService, countProductsoldByBrandService, countTotalOrdersService, countUsersService,
    getAllYearsInOrdersService, getAverageOrdersValueService, getProductsSoldService, getProductsStockService,
    getTopFiveUsersBougthTheMostService, getTopTenProductsBestSellerService, revenueService,
    statisticalByYearService
} from "service/DashBoardService"

const initialState = {
    isLoading: false,
    listProducts: [],
    listUsers: []
}

export const countProductsByBrandAsync = createAsyncThunk("countProductsByBrand", async () => {
    const response = await countProductsByBrandService()
    return response.data
})

export const getTopTenProductsBestSellerAsync = createAsyncThunk("getTopTenProductsBestSeller", async () => {
    const response = await getTopTenProductsBestSellerService()
    return response.data
})

export const countTotalOrdersAsync = createAsyncThunk("countTotalOrders", async () => {
    const response = await countTotalOrdersService()
    return response.data
})

export const revenuesAsync = createAsyncThunk("revenue", async () => {
    const response = await revenueService()
    return response.data
})

export const countProductsoldByBrandAsync = createAsyncThunk("countProductsoldByBrand", async () => {
    const response = await countProductsoldByBrandService()
    return response.data
})

export const getAllYearsInOrdersAsync = createAsyncThunk("getAllYearsInOrders", async () => {
    const response = await getAllYearsInOrdersService()
    return response.data
})

export const statisticalByYearAsync = createAsyncThunk("statisticalByYear", async (year) => {
    const response = await statisticalByYearService(year)
    return response.data
})

export const countUsersAsync = createAsyncThunk("countUsers", async () => {
    const response = await countUsersService()
    return response.data
})

export const getTopFiveUsersBougthTheMostAsync = createAsyncThunk("getTopFiveUsersBougthTheMost", async () => {
    const response = await getTopFiveUsersBougthTheMostService()
    return response.data
})

export const getProductsStockAsync = createAsyncThunk("getProductsStock", async () => {
    const response = await getProductsStockService()
    return response.data
})

export const getProductsSoldAsync = createAsyncThunk("getProductsSold", async () => {
    const response = await getProductsSoldService()
    return response.data
})

export const getAverageOrdersValueAsync = createAsyncThunk("getAverageOrdersValue", async () => {
    const response = await getAverageOrdersValueService()
    return response.data
})

export const dashboard = createSlice({
    name: 'DashBoardSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(countProductsByBrandAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(countProductsByBrandAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            .addCase(getTopTenProductsBestSellerAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTopTenProductsBestSellerAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listProducts = action.payload.results
            })

            .addCase(countTotalOrdersAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(countTotalOrdersAsync.fulfilled, (state) => {
                state.isLoading = false
            })

            .addCase(revenuesAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(revenuesAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            .addCase(countProductsoldByBrandAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(countProductsoldByBrandAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            .addCase(getAllYearsInOrdersAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllYearsInOrdersAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            .addCase(statisticalByYearAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(statisticalByYearAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            .addCase(countUsersAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(countUsersAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            .addCase(getTopFiveUsersBougthTheMostAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTopFiveUsersBougthTheMostAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.listUsers = action.payload.results
            })

            .addCase(getProductsStockAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductsStockAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            .addCase(getProductsSoldAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductsSoldAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })

            .addCase(getAverageOrdersValueAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAverageOrdersValueAsync.fulfilled, (state, action) => {
                state.isLoading = false
            })
    }
})

export const dashboardSelector = state => state.dashboard

export default dashboard.reducer;