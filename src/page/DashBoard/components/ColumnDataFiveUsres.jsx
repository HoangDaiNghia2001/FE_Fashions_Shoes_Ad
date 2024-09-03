// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const pagingTopUsers = {
        pageIndex: 1,
        pageSize: 5
    }
    return [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (_, record, index) => {
                return <p>{((pagingTopUsers.pageIndex - 1) * pagingTopUsers.pageSize) + index + 1}</p>
            },
            width: 100,
            align: 'center'
        }, {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            width: 200
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true
        }, {
            title: 'FullName',
            dataIndex: 'fullName',
            key: 'fullName',
            ellipsis: true,
            width: 220,
            render: (_, record) => <p>{record.lastName + ' ' + record.firstName}</p>
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
            width: 150,
        }, {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            align: 'center',
            width: 120
        }, {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            width: 200,
            render: (_, record) => <p>{record.totalPrice.toLocaleString()}<sup>vnđ</sup></p>
        }
    ]
}