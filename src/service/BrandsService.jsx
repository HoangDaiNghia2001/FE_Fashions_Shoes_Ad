import request from "utils/Request"

// get all brands detail
export const getAllBrandsDetailService = () => {
    return request('/api/admin/brands/detail', {
        method: 'GET'
    })
}

// create brand
export const createBrandService = (params) => {
    return request('/api/admin/brand', {
        method: 'POST',
        data: params
    })
}

// update brand
export const updateBrandService = (params) => {
    return request(`/api/admin/brand?id=${params.id}`, {
        method: 'PUT',
        data: params
    })
}

// delete brand
export const deleteBrandService = (id) => {
    return request(`/api/admin/brand?id=${id}`, {
        method: 'DELETE'
    })
}

// create parent category
export const createParentCategoryService = (params) => {
    return request(`/api/admin/parentCategory`, {
        method: 'POST',
        data: params
    })
}

// update parent category
export const updateParentCategoryService = (params) => {
    return request(`/api/admin/parentCategory?id=${params.id}`, {
        method: 'PUT',
        data: params
    })
}

// delete parent category
export const deleteParentCategoryService = (id) => {
    return request(`/api/admin/parentCategory?id=${id}`, {
        method: 'DELETE',
    })
}

// create child category
export const createChildCategoryService = (params) => {
    return request(`/api/admin/childCategory`, {
        method: 'POST',
        data: params
    })
}

// update child category
export const updateChildCategoryService = (params) => {
    return request(`/api/admin/childCategory?id=${params.id}`, {
        method: 'PUT',
        data: params
    })
}

// delete child category
export const deleteChildCategoryService = (id) => {
    return request(`/api/admin/childCategory?id=${id}`, {
        method: 'DELETE',
    })
}