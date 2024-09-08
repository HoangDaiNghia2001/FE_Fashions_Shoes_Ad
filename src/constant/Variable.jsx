// export const BASE_URL = 'http://localhost:8080'
export const BASE_URL = 'https://befashionshoes-production.up.railway.app'

export const MALE = 'MALE'

export const FEMALE = 'FEMALE'

export const APP_URLS = {
    URL_DASHBOARD: '/dashboard',
    URL_LOGIN: '/login',
    URL_PRODUCTS: '/products',
    URL_FORGOT_PASS: '/forgot-password',
    URL_OTP: '/validate-otp',
    URL_RESET_PASS: '/reset-password',
    URL_CUSTOMERS: '/customers',
    URL_ORDERS: '/orders',
    URL_COMMENTS: '/comments',
    URL_ACCOUNT: '/account',
    URL_BRAND_CATEGORY: '/brands',
    URL_CHANGE_PASSWORD: '/change-password'
}

export const LIST_COLORS = [
    {
        value: 'BLACK',
        label: 'Black'
    }, {
        value: 'GREEN',
        label: 'Green'
    }, {
        value: 'BLUE',
        label: 'Blue'
    }, {
        value: 'PINK',
        label: 'Pink'
    }, {
        value: 'YELLOW',
        label: 'Yellow'
    }, {
        value: 'ORANGE',
        label: 'Orange'
    }, {
        value: 'GREY',
        label: 'Grey'
    }, {
        value: 'BROWN',
        label: 'Brown'
    }, {
        value: 'RED',
        label: 'Red'
    }, {
        value: 'WHITE',
        label: 'White'
    }, {
        value: 'PURPLE',
        label: 'Purple'
    }, {
        value: 'MULTI',
        label: 'Multi-Color'
    },
]

export const STATUS_ORDER = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED'
}

export const LIST_ORDER_STATUS = [
    {
        value: 'PENDING',
        label: 'Pending'
    }, {
        value: 'CONFIRMED',
        label: 'Confirmed'
    }, {
        value: 'SHIPPED',
        label: 'Shipped'
    }, {
        value: 'DELIVERED',
        label: 'Delivered'
    },
]

export const LIST_PAYMENT_METHOD = [
    {
        value: 'COD',
        label: 'COD'
    }, {
        value: 'VNPAY',
        label: 'VNPAY'
    }, {
        value: 'MOMO',
        label: 'MOMO'
    }
]

export const LIST_GENDER = [
    {
        value: 'MALE',
        label: 'Male',
    },
    {
        value: 'FEMALE',
        label: 'Female',
    },
    {
        value: 'ORTHER',
        label: 'Other',
    }
]