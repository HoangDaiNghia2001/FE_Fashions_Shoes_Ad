import queryString from "query-string"
import request from "utils/Request"

export const createUserService = (params) => {
    return request('/api/admin/user', {
        method: 'POST',
        data: params
    })
}

export const updateUserService = (params) => {
    return request(`/api/admin/user?id=${params.id}`, {
        method: 'PUT',
        data: params
    })
}

export const deleteUserService = (params) => {
    return request(`/api/admin/user?id=${params}`, {
        method: 'DELETE'
    })
}

export const deleteSomeUsersService = (params) => {
    return request(`/api/admin/users/${params}`, {
        method: 'DELETE'
    })
}

export const filterUsersService = (params) => {
    return request(`/api/admin/users?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

export const getAllRolesService = () => {
    return request(`/api/admin/roles`, {
        method: 'GET'
    })
}