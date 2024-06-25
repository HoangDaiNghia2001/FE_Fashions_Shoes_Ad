import request from "utils/Request"

export const countProductsByBrandService = () => {
    return request('/api/admin/products/quantity', {
        method: 'GET'
    })
}

export const getTopTenProductsBestSellerService = () => {
    return request('/api/admin/products/top-ten/best-seller', {
        method: 'GET'
    })
}

export const countTotalOrdersService = () => {
    return request('/api/admin/orders/total', {
        method: 'GET'
    })
}

export const revenueService = () => {
    return request('/api/admin/orders/revenue', {
        method: 'GET'
    })
}

export const countProductsoldByBrandService = () => {
    return request('/api/admin/orders/product/quantity/sold', {
        method: 'GET'
    })
}

export const getAllYearsInOrdersService = () => {
    return request('/api/admin/orders/years', {
        method: 'GET'
    })
}

export const statisticalByYearService = (year) => {
    return request(`/api/admin/orders/statistic/year/${year}`, {
        method: 'GET'
    })
}

export const countUsersService = () => {
    return request('/api/admin/users/total', {
        method: 'GET'
    })
}

export const getTopFiveUsersBougthTheMostService = () => {
    return request('/api/admin/users/top-five/bought-the-most', {
        method: 'GET'
    })
}

export const getProductsStockService = () => {
    return request('/api/admin/products/stock', {
        method: 'GET'
    })
}

export const getProductsSoldService = () => {
    return request('/api/admin/products/sold', {
        method: 'GET'
    })
}

export const getAverageOrdersValueService = () => {
    return request('/api/admin/orders/average/orders/value', {
        method: 'GET'
    })
}