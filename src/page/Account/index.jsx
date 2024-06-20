import { Spin } from 'antd'
import { ordersSelector } from 'page/Orders/OrdersSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TabTile } from 'utils/TabTile'
import { accountSelector } from './AccountSlice'
import AccountHeader from './Components/AccountHeader'
import AccountImage from './Components/AccountImage'
import AccountInformation from './Components/AccountInformation'
import './Style.css'

const PageAccount = (props) => {

    const { openNotification } = props

    useEffect(() => {
        TabTile("My profile")
    }, [])

    const admin = JSON.parse(localStorage.getItem("admin"))

    const [adminImage, setAdminImage] = useState(admin.imageBase64)

    const order = useSelector(ordersSelector)

    const account = useSelector(accountSelector)

    return <Spin tip="Loading" size="large" spinning={order.isLoading || account.isLoading}>
        <div className='page-account h-screen px-4 py-10 flex flex-col items-center bg-white'>
            <div className='w-[1000px] bg-white px-7 py-5 rounded-[8px] border border-light-gray'>
                <AccountHeader />
                <div className='flex justify-between items-start relative w-full'>
                    <AccountInformation admin={admin} adminImage={adminImage} openNotification={openNotification} />
                    <AccountImage adminImage={adminImage} setAdminImage={setAdminImage} />
                </div>
            </div>
        </div>
    </Spin>
}

export default PageAccount