import axios from "axios"
import queryString from "query-string"
import request from "utils/Request"

// api get province
export const getProvinceService = () => {
    return axios('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': '335a00b2-df56-11ee-a6e6-e60958111f48'
        }
    })
}

// api get district by province 
export const getDistrictByProvinceService = (params) => {
    return axios(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': '335a00b2-df56-11ee-a6e6-e60958111f48',
        }
    })
}

// api get ward by district 
export const getWardByDistrictService = (params) => {
    return axios(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': '335a00b2-df56-11ee-a6e6-e60958111f48',
        }
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