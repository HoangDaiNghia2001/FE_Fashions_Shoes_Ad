import { configureStore } from "@reduxjs/toolkit"
import headerReducer from 'components/Header/HeaderSlice'
import loginReducer from 'page/Login/LoginSlice'
import productsReducer from 'page/Products/ProductsSlice'
import ordersReducer from "page/Orders/OrdersSlice"
import accountReducer from 'page/Account/AccountSlice'
import brandsReducer from 'page/BrandAndCategory/BrandsSlice'
import passwordReducer from "page/Password/PasswordSlice"

const store = configureStore({
    reducer: {
        header: headerReducer,
        login: loginReducer,
        products: productsReducer,
        orders: ordersReducer,
        account: accountReducer,
        brands: brandsReducer,
        password: passwordReducer
    }
})

export default store