import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBrandService, createChildCategoryService, createParentCategoryService, deleteBrandService, deleteChildCategoryService, deleteParentCategoryService, getAllBrandsDetailService, updateBrandService, updateChildCategoryService, updateParentCategoryService } from "service/BrandsService"

const initialState = {
    isLoading: false,
    isLoadDetail: false,
    listBrandsDetail: [],
    brand: {},
    parentCategory: {},
    childCategory: {}
}

// get all brands
export const getAllBrandsDetailAsync = createAsyncThunk('getAllBrandsDetail', async () => {
    const response = await getAllBrandsDetailService()
    return response.data
})

// create brand
export const createBrandAsync = createAsyncThunk("createBrand", async (params) => {
    const response = await createBrandService(params)
    return response.data
})

// update brand
export const updateBrandAsync = createAsyncThunk("updateBrand", async (params) => {
    const response = await updateBrandService(params)
    return response.data
})

// delete brand
export const deleteBrandAsync = createAsyncThunk("deleteBrand", async (id) => {
    const response = await deleteBrandService(id)
    return response.data
})

// create parent category
export const createParentCategoryAsync = createAsyncThunk("createParentCategory", async (params) => {
    const response = await createParentCategoryService(params)
    return response.data
})

// update parent category
export const updateParentCategoryAsync = createAsyncThunk("updateParentCategory", async (params) => {
    const response = await updateParentCategoryService(params)
    return response.data
})

// delete parent category
export const deleteParentCategoryAsync = createAsyncThunk("deleteParentCategory", async (id) => {
    const response = await deleteParentCategoryService(id)
    return response.data
})

// create child category
export const createChildCategoryAsync = createAsyncThunk("createChildCategory", async (params) => {
    const response = await createChildCategoryService(params)
    return response.data
})

// update child category
export const updateChildCategoryAsync = createAsyncThunk("updateChildCategory", async (params) => {
    const response = await updateChildCategoryService(params)
    return response.data
})

// delete child category
export const deleteChildCategoryAsync = createAsyncThunk("deleteChildCategory", async (id) => {
    const response = await deleteChildCategoryService(id)
    return response.data
})

export const brands = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            // get all brands
            .addCase(getAllBrandsDetailAsync.pending, (state) => {
                state.isLoadDetail = true
            })
            .addCase(getAllBrandsDetailAsync.fulfilled, (state, action) => {
                state.isLoadDetail = false
                state.listBrandsDetail = action.payload
            })

            // create brand
            .addCase(createBrandAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBrandAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.brand = action.payload
            })

            // update brand
            .addCase(updateBrandAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBrandAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.brand = action.payload
            })

            // delete brand
            .addCase(deleteBrandAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBrandAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.brand = action.payload
            })

            // create parent category
            .addCase(createParentCategoryAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createParentCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.parentCategory = action.payload
            })

            // update parent category
            .addCase(updateParentCategoryAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateParentCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.parentCategory = action.payload
            })

            // delete parent category
            .addCase(deleteParentCategoryAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteParentCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.parentCategory = action.payload
            })

            // create child category
            .addCase(createChildCategoryAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createChildCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.childCategory = action.payload
            })

            // update child category
            .addCase(updateChildCategoryAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateChildCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.childCategory = action.payload
            })

            // delete child category
            .addCase(deleteChildCategoryAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteChildCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.childCategory = action.payload
            })
    }
})

export const brandsSelector = state => state.brands

export default brands.reducer