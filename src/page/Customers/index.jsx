import { Flex, Popconfirm, Spin, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useState } from "react"
import FormSearch from "./Components/FormSearch"
import generateColumnData from "./Components/ColumnsData"
import ModalUser from "./Components/ModalUser"
import { useDispatch, useSelector } from "react-redux"
import { customersSelector, deleteSomeUsersAsync, deleteUserAsync, filtertUsersAsync } from "./CustomersSlice"
import { ordersSelector } from "page/Orders/OrdersSlice"

const PageCustomers = (props) => {
    const { openNotification } = props
    const dispatch = useDispatch()
    const customers = useSelector(customersSelector)
    const orders = useSelector(ordersSelector)

    const [formSearchUser] = useForm()
    const [formUser] = useForm()

    const [createUser, setCreateUser] = useState(true)
    const [isModalUserOpen, setIsModalUserOpen] = useState(false)
    const [deleteSome, setDeleteSome] = useState(false)
    const [hiddenColumn, setHiddenColumn] = useState(true)
    const [listIdUsers, setListIdUsers] = useState([])

    const rowSelection = {
        onChange: (selectedRows) => {
            if (selectedRows.length === 0) {
                setDeleteSome(false)
                setListIdUsers([])
            } else {
                setDeleteSome(true)
                setListIdUsers(selectedRows);
            }
        }
    };
    const [paging, setPaging] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const handleUpdateUser = (record) => {
        setCreateUser(false)
        setIsModalUserOpen(true)
        formUser.setFieldsValue({
            id: record.id,
            code: record.code,
            email: record.email,
            firstName: record.firstName,
            lastName: record.lastName,
            mobile: record.mobile,
            gender: record.gender,
            address: record.address,
            roles: record.roles.split('-'),
        })
        if (record.province !== '') {
            formUser.setFieldValue('province', +record.province)
        }
        if (record.district !== '') {
            formUser.setFieldValue('district', +record.district)
        }
        if (record.ward !== '') {
            formUser.setFieldValue('ward', record.ward)
        }
    }

    const handleDeleteUser = async (id) => {
        const response = await dispatch(deleteUserAsync(id))
        if (response.payload.success) {
            setPaging({
                pageIndex: 1,
                pageSize: 10
            })
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const handleDeleteSomeUsers = async () => {
        const response = await dispatch(deleteSomeUsersAsync(listIdUsers))
        if (response.payload.success) {
            setPaging({
                pageIndex: 1,
                pageSize: 10
            })
            setDeleteSome(false)
            setListIdUsers([])
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const handleCreateUser = () => {
        setCreateUser(true)
        setIsModalUserOpen(true)
    }

    const handleChangePage = (page) => {
        setPaging({
            ...formSearchUser.getFieldsValue(),
            pageIndex: page.current,
            pageSize: page.pageSize
        })
    }

    const columns = generateColumnData(
        { paging: paging },
        { hiddenColumn: hiddenColumn },
        { handleUpdateUser: handleUpdateUser },
        { handleDeleteUser: handleDeleteUser },
        { deleteSome: deleteSome }
    )

    const filterUsers = async (params) => {
        await dispatch(filtertUsersAsync(params))
    }

    useEffect(() => {
        filterUsers(paging)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paging, customers.userInfor])

    return <Spin tip="Loading" size="large" spinning={customers.isLoading || orders.isLoading}>
        <div className='page-customers h-screen px-4 pb-7 pt-[15px] bg-white'>
            <FormSearch
                hiddenColumn={hiddenColumn}
                setHiddenColumn={setHiddenColumn}
                setPaging={setPaging}
                formSearchUser={formSearchUser} />

            <Flex style={{ marginTop: 15 }} justify='space-between'>
                <button className='custom-btn px-7 py-[5px] w-[110px] mr-3 text-[14px] rounded-[8px]' onClick={handleCreateUser}>Create</button>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this list users?"
                    onConfirm={handleDeleteSomeUsers}
                    okText="Yes"
                    cancelText="No"
                    disabled={!deleteSome}
                >
                    <button
                        className={`${deleteSome ? 'custom-btn' : 'btn-disabled'} px-7 py-[5px] mr-3 text-[14px] rounded-[8px]`}
                    >
                        Delete
                    </button>
                </Popconfirm>
            </Flex>

            <Table
                style={{
                    marginTop: 30
                }}
                columns={columns}
                dataSource={customers.listUsers}
                scroll={{ x: "150" }}
                rowKey='id'
                onChange={handleChangePage}
                pageIndex={paging.pageIndex}
                pagination={{
                    total: customers.totalUser,
                    current: paging.pageIndex,
                    pageSize: paging.pageSize,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} customers`
                }}
                rowSelection={rowSelection}
            />

            <ModalUser
                createUser={createUser}
                setCreateUser={setCreateUser}
                isModalUserOpen={isModalUserOpen}
                setIsModalUserOpen={setIsModalUserOpen}
                formUser={formUser}
                openNotification={openNotification} />
        </div>
    </Spin>
}

export default PageCustomers