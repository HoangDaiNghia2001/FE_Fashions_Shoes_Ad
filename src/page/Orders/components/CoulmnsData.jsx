import { Popconfirm, Select } from "antd"
import { LIST_ORDER_STATUS } from "constant/Variable"
import { ConvertDateHaveHour } from "utils/ConvertDateHaveHour"
import DistrictRow from "./DistrictRow"
import ProvinceRow from "./ProvinceRow"
import WardRow from "./WardRow"

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ paging },
    { hiddenColumn },
    { handleUpdateOrder },
    { handleOpenModalOrder },
    { handleDeleteOrder },
    { deleteSome }) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            disabled: true
        },
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (_, record, index) => {
                return <p>
                    {((paging.pageIndex - 1) * paging.pageSize) + index + 1}
                </p>
            },
            width: 60,
            align: 'center'
        }, {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            width: 170,
            align: 'center',
            hidden: hiddenColumn
        }, {
            title: 'Update',
            dataIndex: 'updateByUser',
            key: 'updateByUser',
            width: 80,
            align: 'center',
            hidden: hiddenColumn,
            render: (_, record) => <p>{record.updateByUser !== null && <i className="text-red-custom fa-solid fa-check"></i>}</p>,
        }, {
            title: 'Update Date',
            dataIndex: 'updateAtUser',
            key: 'updateAtUser',
            width: 160,
            align: 'center',
            hidden: hiddenColumn,
            ellipsis: true,
            render: (_, record) => {
                if (record.updateAtUser !== null) {
                    return ConvertDateHaveHour(record.updateAtUser)
                } else {
                    return <p>...</p>
                }
            },
        }, {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            width: 160,
            align: 'center',
            hidden: hiddenColumn,
            ellipsis: true,
            render: (_, record) => <p>{ConvertDateHaveHour(record.orderDate)}</p>,
        }, {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            width: 180,
            align: 'center',
            ellipsis: true,
            hidden: hiddenColumn,
            render: (_, record) => {
                if (record.deliveryDate !== null) {
                    return ConvertDateHaveHour(record.deliveryDate)
                } else {
                    return <p>...</p>
                }
            },
        }, {
            title: 'Receiving Date',
            dataIndex: 'receivingDate',
            key: 'receivingDate',
            width: 180,
            align: 'center',
            hidden: hiddenColumn,
            ellipsis: true,
            render: (_, record) => {
                if (record.receivingDate !== null) {
                    return ConvertDateHaveHour(record.receivingDate)
                } else {
                    return <p>...</p>
                }
            },
        }, {
            title: 'Order By',
            dataIndex: 'email',
            key: 'email',
            width: 160,
            ellipsis: true
        }, {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 180,
            ellipsis: true,
            hidden: hiddenColumn
        }, {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 130,
            align: 'center'
        }, {
            title: 'Alternate Phone',
            dataIndex: 'alternatePhoneNumber',
            key: 'alternatePhoneNumber',
            width: 135,
            hidden: hiddenColumn,
            align: 'center'
        }, {
            title: 'Payment',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width: 100,
            align: 'center'
        },
        {
            title: 'Pay',
            dataIndex: 'pay',
            key: 'pay',
            width: 100,
            align: 'center'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
            width: 220,
            hidden: hiddenColumn
        }, {
            title: 'Ward',
            dataIndex: 'ward',
            key: 'ward',
            width: 180,
            hidden: hiddenColumn,
            render: (_, record) => <WardRow district={record.district} ward={record.ward} />,
        }, {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
            width: 180,
            hidden: hiddenColumn,
            render: (_, record) => <DistrictRow province={record.province} district={record.district} />,
        }, {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
            width: 180,
            hidden: hiddenColumn,
            render: (_, record) => <ProvinceRow province={record.province} />,
        }, {
            title: 'Transport Fee',
            dataIndex: 'transportFee',
            key: 'transportFee',
            align: 'center',
            width: 120,
            render: (_, record) => <p>{record.transportFee !== 0 ? <>{record.transportFee.toLocaleString()}<sup>đ</sup></> : 'Free'}</p>
        }, {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            width: 120,
            render: (_, record) => <p>{record.totalPrice.toLocaleString()}<sup>đ</sup></p>
        }, {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            width: 180,
            ellipsis: true,
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 140,
            align: 'center',
            render: (_, record) => {
                const index = LIST_ORDER_STATUS.findIndex(item => item['value'] === record.status)
                const listStatusOrders = LIST_ORDER_STATUS.slice(index, index + 2)
                return <Select
                    options={listStatusOrders}
                    value={record.status}
                    onChange={(value) => handleUpdateOrder(value, record)}
                    style={{ width: '100%' }} />
            }
        }, {
            title: 'Action',
            key: 'action',
            width: 100,
            align: 'center',
            render: (_, record) => (
                <div className="text-[21px] flex items-center">
                    <i
                        title="Order Line"
                        className="fa-solid fa-image cursor-pointer mx-2 text-green-500 duration-150 ease-linear hover:text-green-300"
                        onClick={() => handleOpenModalOrder(record)}
                    >
                    </i>
                    <Popconfirm
                        title="Delete this order"
                        description="Are you sure to delete this product?"
                        onConfirm={() => handleDeleteOrder(record)}
                        okText="Yes"
                        cancelText="No"
                        disabled={deleteSome}
                    >
                        <i
                            title="Delete"
                            className={`fa-solid fa-trash-can ${!deleteSome ? 'cursor-pointer hover:text-red-400' : 'cursor-no-drop'} mx-2 text-red-custom`}></i>
                    </Popconfirm>
                </div>
            ),
        },
    ].filter(item => !item.hidden && !item.disabled)
}