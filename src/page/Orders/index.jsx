import { Popconfirm, Spin, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { STATUS_ORDER } from 'constant/Variable'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TabTile } from 'utils/TabTile'
import FormSearch from './components/FormSearch'
import ModalOrderDetail from './components/ModalOrder'
import generateColumnsData from './components/CoulmnsData'
import { confirmedOrderAsync, deleteOrderAsync, deleteSomeOrdersAsync, deliveredOrderAsync, filterOrdersAsync, ordersSelector, shippedOrderAsync } from './OrdersSlice'
import './Style.css'

const PageOrders = (props) => {

    useEffect(() => {
        TabTile('Orders')
    }, [])

    const { openNotification } = props

    const order = useSelector(ordersSelector)

    const dispatch = useDispatch()

    const [formSearchOrder] = useForm()


    const [hiddenColumn, setHiddenColumn] = useState(true)

    const [deleteSome, setDeleteSome] = useState(false)

    const [listIdOrders, setListIdOrders] = useState([])

    const [isModalOrderOpen, setIsModalOrderOpen] = useState(false)

    const [listProductsOfOrder, setListProductOfOrder] = useState([])

    const [paging, setPaging] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    // rowSelection objects indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRows) => {
            if (selectedRows.length === 0) {
                setDeleteSome(false)
                setListIdOrders([])
            } else {
                setDeleteSome(true)
                setListIdOrders(selectedRows);
            }
        }
    };

    const handleOpenModalOrder = (record) => {
        setIsModalOrderOpen(true)
        setListProductOfOrder(record.orderLines)
    }

    const handleChangePage = (page) => {
        setPaging(
            {
                ...formSearchOrder.getFieldsValue(),
                pageIndex: page.current,
                pageSize: 10
            }
        )
    }

    const filterOrders = async (values) => {
        await dispatch(filterOrdersAsync(values))
    }

    const handleUpdateOrder = async (value, record) => {
        switch (value) {
            case STATUS_ORDER.CONFIRMED:
                const confirmed = await dispatch(confirmedOrderAsync(record.id))
                if (confirmed.payload.success) {
                    openNotification(confirmed.payload.message, 'success')
                } else {
                    openNotification(confirmed.payload.message, 'error')
                }
                break;
            case STATUS_ORDER.SHIPPED:
                const shipped = await dispatch(shippedOrderAsync(record.id))
                if (shipped.payload.success) {
                    openNotification(shipped.payload.message, 'success')
                } else {
                    openNotification(shipped.payload.message, 'error')
                }
                break;
            case STATUS_ORDER.DELIVERED:
                const delivered = await dispatch(deliveredOrderAsync(record.id))
                if (delivered.payload.success) {
                    openNotification(delivered.payload.message, 'success')
                } else {
                    openNotification(delivered.payload.message, 'error')
                }
                break;
            default:
                openNotification("Error system :(((", 'error')
                break;
        }
    }

    const handleDeleteOrder = async (record) => {
        const response = await dispatch(deleteOrderAsync(record.id))
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

    const handleDeleteSomeOrders = async () => {
        const response = await dispatch(deleteSomeOrdersAsync(listIdOrders))
        if (response.payload.success) {
            setPaging({
                pageIndex: 1,
                pageSize: 10
            })
            setDeleteSome(false)
            setListIdOrders([])
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    // generateColumnsData
    const columnsData = generateColumnsData(
        { paging: paging },
        { hiddenColumn: hiddenColumn },
        { handleUpdateOrder: handleUpdateOrder },
        { handleOpenModalOrder: handleOpenModalOrder },
        { handleDeleteOrder: handleDeleteOrder },
        { deleteSome: deleteSome }
    )

    useEffect(() => {
        filterOrders(paging)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paging, order.orderItem])

    return <Spin tip="Loading" size="large" spinning={order.isLoading || order.isLoadListOrders}>
        <div className='page-orders h-screen px-4 pb-7 pt-[15px] bg-white'>
            <FormSearch
                hiddenColumn={hiddenColumn}
                setHiddenColumn={setHiddenColumn}
                setPaging={setPaging}
                formSearchOrder={formSearchOrder} />

            <div className='text-right mt-3'>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this list orders?"
                    onConfirm={handleDeleteSomeOrders}
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
            </div>

            <Table
                style={{
                    marginTop: 20
                }}
                columns={columnsData}
                dataSource={order.listOrders}
                scroll={{ x: "150" }}
                rowKey='id'
                onChange={handleChangePage}
                pageIndex={paging.pageIndex}
                pagination={{
                    total: order.totalOrder,
                    current: paging.pageIndex,
                    pageSize: paging.pageSize,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`
                }}
                rowSelection={rowSelection}
            />

            <ModalOrderDetail
                isModalOrderOpen={isModalOrderOpen}
                setIsModalOrderOpen={setIsModalOrderOpen}
                listProductsOfOrder={listProductsOfOrder}
                setListProductOfOrder={setListProductOfOrder} />
        </div>
    </Spin>
}

export default PageOrders