// eslint-disable-next-line import/no-anonymous-default-export
export default ({ pagingTopProducts }) => {
    return [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (_, record, index) => {
                return <p>{((pagingTopProducts.pageIndex - 1) * pagingTopProducts.pageSize) + index + 1}</p>
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 150,
        }, {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            width: 250,
            render: (_, record) => <p>{record.totalPrice.toLocaleString()}<sup>vnđ</sup></p>
        }, {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'sold',
            align: 'center',
            width: 150,
        }
    ]
}