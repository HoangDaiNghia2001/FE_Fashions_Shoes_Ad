import Header from "components/Header"
import { headerSelector } from "components/Header/HeaderSlice"
import SideBar from "components/SideBar"
import { accountSelector } from "page/Account/AccountSlice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const MainPage = (props) => {
    const header = useSelector(headerSelector)

    const account = useSelector(accountSelector)

    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")))

    useEffect(() => {
        setAdmin(JSON.parse(localStorage.getItem("admin")))
    }, [account.adminInforUpdate])

    return <div className="page-products bg-white">
        <Header admin={admin} />

        <SideBar />

        <div className={`${header.showSideBar ? 'w-[84%] ml-[16%]' : 'w-full'} mt-[80px] duration-200 ease-linear`}>
            {props.page}
        </div>
    </div>
}

export default MainPage