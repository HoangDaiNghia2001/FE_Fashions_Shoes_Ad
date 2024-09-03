import { Popconfirm, Tag } from "antd"
import DistrictRow from "page/Orders/components/DistrictRow"
import ProvinceRow from "page/Orders/components/ProvinceRow"
import WardRow from "page/Orders/components/WardRow"
import { Capitalize } from "utils/Capitalize"
import { ConvertDate } from "utils/ConvertDate"

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ paging },
    { hiddenColumn },
    { handleUpdateUser },
    { handleDeleteUser },
    { deleteSome },
    { handleDeactivateUser },
    { handleReactivateUser }) => {
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
                return <p>{((paging.pageIndex - 1) * paging.pageSize) + index + 1}</p>
            },
            width: 60,
            align: 'center'
        }, {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            width: 200,
            align: 'center'
        }, {
            title: 'Created at',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (_, record) => <p>{ConvertDate(record.createdAt)}</p>,
            width: 150,
            align: 'center',
            hidden: hiddenColumn
        }, {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: 180,
            ellipsis: true
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 140,
            ellipsis: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            width: 200
        }, {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            align: 'center',
            width: 130,
        }, {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            align: 'center',
            render: (_, record) => <p>
                {Capitalize(record.gender.split(' '))}
            </p>,
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            width: 120,
            align: 'center',
            ellipsis: true,
            hidden: hiddenColumn
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
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            width: 100,
            align: 'center',
            render: (_, record) => <>
                {
                    record.active ? <Tag color="green" className="cursor-pointer text-[14px]" onClick={() => handleDeactivateUser(record)} title="If you click here this account will be deactivated">Enable</Tag>
                        : <Tag color="red" className="cursor-pointer text-[14px]" onClick={() => handleReactivateUser(record)} title="If you click here this account will be reactivated">Disable</Tag>
                }
            </>,
        }, {
            title: 'Action',
            key: 'action',
            width: 100,
            align: 'center',
            render: (_, record) => (
                <div className="text-[21px] flex items-center justify-center">
                    <i
                        title="Update"
                        className="fa-solid fa-pen-to-square cursor-pointer mx-1 text-green-500 hover:text-green-300"
                        onClick={() => handleUpdateUser(record)}>
                    </i>
                    {
                        !record.active && <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this user?"
                            onConfirm={() => handleDeleteUser(record.id)}
                            okText="Yes"
                            cancelText="No"
                            disabled={deleteSome}
                        >
                            <i
                                title="Delete"
                                className={`fa-solid fa-trash-can ${!deleteSome ? 'cursor-pointer hover:text-red-400' : 'cursor-no-drop'} mx-2 text-red-custom `}></i>
                        </Popconfirm>
                    }
                </div>
            ),
        },
    ].filter(item => !item.hidden && !item.disabled)
}