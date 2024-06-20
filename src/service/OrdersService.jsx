import axios from "axios"
import queryString from "query-string"
import request from "utils/Request"

// api get province
export const getProvinceService = () => {
    return axios('https://provinces.open-api.vn/api/?depth=1', {
        method: 'GET'
    })
}

// api get district by province 
export const getDistrictByProvinceService = (params) => {
    return axios(`https://provinces.open-api.vn/api/p/${params}?depth=2`, {
        method: 'GET'
    })
}

// api get ward by district 
export const getWardByDistrictService = (params) => {
    return axios(`https://provinces.open-api.vn/api/d/${params}?depth=2`, {
        method: 'GET'
    })
}

// filter orders
export const filterOrdersService = (params) => {
    return request(`/api/admin/orders?${queryString.stringify(params)}`, {
        method: 'GET'
    })
}

// confirmed order
export const confirmedOrderService = (id) => {
    return request(`/api/admin/order/confirmed?id=${id}`, {
        method: 'PUT'
    })
}

// confirmed order
export const shippeddOrderService = (id) => {
    return request(`/api/admin/order/shipped?id=${id}`, {
        method: 'PUT'
    })
}

// confirmed order
export const deliveredOrderService = (id) => {
    return request(`/api/admin/order/delivered?id=${id}`, {
        method: 'PUT'
    })
}

//delete order
export const deleteOrderService = (id) => {
    return request(`/api/admin/order?id=${id}`, {
        method: 'DELETE'
    })
}

// delete some orders
export const deleteSomeOrderService = (params) => {
    return request(`/api/admin/orders/${params}`, {
        method: 'DELETE'
    })
}