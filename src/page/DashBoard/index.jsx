import { Radio, Select, Spin, Table } from "antd";
import DashBoardCard from "./components/DashBoardCard";
import orders from "../../assets/Image/cart.png"
import users from "../../assets/Image/users.png"
import revenueImg from "../../assets/Image/revenue.png"
import stock from "../../assets/Image/stock.png"
import sold from "../../assets/Image/sold.png"
import aov from "../../assets/Image/aov.png"
import { useDispatch, useSelector } from "react-redux";
import { countProductsByBrandAsync, countProductsoldByBrandAsync, countTotalOrdersAsync, countUsersAsync, dashboardSelector, getAllYearsInOrdersAsync, getAverageOrdersValueAsync, getProductsSoldAsync, getProductsStockAsync, getTopFiveUsersBougthTheMostAsync, getTopTenProductsBestSellerAsync, revenuesAsync, statisticalByYearAsync } from "./DashBoardSlice";
import { useEffect } from "react";
import { useState } from "react";
import { Column, Pie, Line } from "@ant-design/charts";
import generateColumnsTopProducts from "./components/ColumnTopTenProducts"
import generateColumnsTopUsers from "./components/ColumnDataFiveUsres"
import { TabTile } from "utils/TabTile";

const PageDashBoard = (props) => {
    const { openNotification } = props;

    const dispatch = useDispatch();

    const dashboard = useSelector(dashboardSelector);

    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const [totalSold, setTotalSold] = useState(0);
    const [averageOrdersValue, setAverageOrdersValue] = useState(0);
    const [revenue, setRevenue] = useState(0)
    const [productsStockByBrand, setProductsStockbyBrand] = useState([]);
    const [productsSoldByBrand, setProductsSoldByBrand] = useState([])
    const [years, setYears] = useState([])
    const [statistical, setStatistical] = useState([])
    const [chartType, setchartType] = useState(true);
    const [pagingTopProducts, setPagingTopProducts] = useState({
        pageIndex: 1,
        pageSize: 5
    })

    const countOrders = async () => {
        const response = await dispatch(countTotalOrdersAsync());
        if (response.payload.success) {
            setTotalOrders(response.payload.results)
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const countUsers = async () => {
        const response = await dispatch(countUsersAsync());
        if (response.payload.success) {
            setTotalUsers(response.payload.results)
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const countStock = async () => {
        const response = await dispatch(getProductsStockAsync());
        if (response.payload.success) {
            setTotalStock(response.payload.results)
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const countSold = async () => {
        const response = await dispatch(getProductsSoldAsync());
        if (response.payload.success) {
            setTotalSold(response.payload.results)
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const calculateAverageOrdersValue = async () => {
        const response = await dispatch(getAverageOrdersValueAsync());
        if (response.payload.success) {
            setAverageOrdersValue(response.payload.results)
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const calculateRevenue = async () => {
        const response = await dispatch(revenuesAsync());
        if (response.payload.success) {
            setRevenue(response.payload.results)
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const getProductsStockByBrand = async () => {
        const response = await dispatch(countProductsByBrandAsync());
        if (response.payload.success) {
            setProductsStockbyBrand(response.payload.results.filter(item => item.quantity !== 0));
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const getProductsSoldByBrand = async () => {
        const response = await dispatch(countProductsoldByBrandAsync());
        if (response.payload.success) {
            setProductsSoldByBrand(response.payload.results.filter(item => item.quantity !== 0));
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const handleChangeYear = (value) => {
        statisticalByYear(+value)
    }

    const getAllYearsInOrders = async () => {
        const response = await dispatch(getAllYearsInOrdersAsync());
        if (response.payload.success) {
            setYears(response.payload.results.map(item => {
                return {
                    value: item,
                    label: item
                }
            }))
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const monthNames = [
        "Jan.", "Feb,", "Mar.", "Apr.", "May", "Jun",
        "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
    ];

    const statisticalByYear = async (year) => {
        const response = await dispatch(statisticalByYearAsync(year))
        if (response.payload.success) {
            setStatistical(response.payload.results.map(item => {
                const monthName = monthNames[item.month - 1];
                return {
                    month: monthName,
                    revenue: item.revenue
                }
            }))
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    const getTopTenBestSeller = async () => {
        const response = await dispatch(getTopTenProductsBestSellerAsync())
        if (!response.payload.success) {
            openNotification(response.payload.message, 'error')
        }
    }

    const getTopFiveUsers = async () => {
        const response = await dispatch(getTopFiveUsersBougthTheMostAsync())
        if (!response.payload.success) {
            openNotification(response.payload.message, 'error')
        }
    }

    const onChangeChart = () => {
        setchartType(!chartType);
    }

    const columnsTopProducts = generateColumnsTopProducts({
        pagingTopProducts: pagingTopProducts
    })

    const columnsTopUsers = generateColumnsTopUsers()

    const handleChangePageTopProducts = (page) => {
        setPagingTopProducts({
            pageIndex: page.current,
            pageSize: page.pageSize
        })
    }

    useEffect(() => {
        TabTile("Dashboard")
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                countOrders(),
                countUsers(),
                countStock(),
                countSold(),
                calculateAverageOrdersValue(),
                calculateRevenue(),
                getProductsSoldByBrand(),
                getProductsStockByBrand(),
                getAllYearsInOrders(),
                getTopTenBestSeller(),
                getTopFiveUsers()
            ]);
        };

        fetchData();
    }, [dispatch])

    useEffect(() => {
        if (years.length !== 0) {
            statisticalByYear(years[years.length - 1].value)
        }
    }, [years])

    const configProductsSoldByBrand = {
        data: productsSoldByBrand,
        angleField: 'quantity',
        colorField: 'brandName',
        radius: 0.8,
        label: {
            text: (d) => `${d.brandName}\n ${d.quantity}`,
            position: 'spider',
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
        interaction: {
            elementHighlight: true,
        },
        state: {
            inactive: { opacity: 0.5 },
        },
    };

    const configProductsStockByBrand = {
        data: productsStockByBrand,
        angleField: 'quantity',
        colorField: 'brandName',
        radius: 0.8,
        label: {
            text: (d) => `${d.brandName}\n ${d.quantity}`,
            position: 'spider',
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
                background: '#FFF'
            },
        },
        interaction: {
            elementHighlight: true,
        },
        state: {
            inactive: { opacity: 0.5 },
        },
    };

    const configStatisticalChartColumn = {
        data: statistical,
        xField: 'month',
        yField: 'revenue',
        legend: false,
        colorField: '#a8020a',
        style: {
            maxWidth: 50,
        },
    };

    const configStatisticalLineColumn = {
        data: statistical,
        xField: 'month',
        yField: 'revenue',
        point: {
            shapeField: 'circle',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
        colorField: '#a8020a'
    };

    return <Spin tip="Loading" size="large" spinning={dashboard.isLoading || productsStockByBrand.length === 0 || productsSoldByBrand.length === 0 || productsStockByBrand.length === 0}>
        <div className="dashboard min-h-screen px-4 pb-7 pt-[15px] bg-white">
            <div className="statistical mb-6">
                <p className="text-red-custom text-[20px] font-semibold tracking-[0.25px] mb-4">* <span className="text-eclipse">Statistical</span></p>
                <div className="flex justify-between">
                    <DashBoardCard icon={orders} title='Orders' value={totalOrders} hover='Total number of orders' />
                    <DashBoardCard icon={users} title='Users' value={totalUsers} hover='Total number of users' />
                    <DashBoardCard icon={stock} title='Stock' value={totalStock} hover='Number of products in stock' />
                    <DashBoardCard icon={sold} title='Sold' value={totalSold} hover='Number of products sold' />
                    <DashBoardCard icon={aov} title='AOV' value={<span>{averageOrdersValue.toLocaleString()}<sup> vnđ</sup></span>} hover='Average Order Value' max={true} />
                    <DashBoardCard icon={revenueImg} title='Revenue' value={<span>{revenue.toLocaleString()}<sup> vnđ</sup></span>} hover='Revenue' max={true} />
                </div>
            </div>

            <div className="chart-pie flex justify-between mb-6">
                <div className="w-[49%]">
                    <p className="text-red-custom text-[20px] font-semibold tracking-[0.25px] mb-4">*
                        <span className="text-eclipse"> Number of products in stock by brand</span>
                    </p>
                    {productsStockByBrand.length > 0 && <Pie {...configProductsStockByBrand} />}
                </div>
                <div className="w-[49%]">
                    <p className="text-red-custom text-[20px] font-semibold tracking-[0.25px] mb-6">*
                        <span className="text-eclipse"> Number of products sold by brand</span>
                    </p>
                    {productsStockByBrand.length > 0 && <Pie {...configProductsSoldByBrand} />}
                </div>
            </div>

            <div className="chart-line-column mb-4">
                <span className="text-red-custom text-[20px] font-semibold tracking-[0.25px] mr-3">*
                    <span className="text-eclipse"> Monthly statistics by year</span>
                </span>
                {years.length > 0 && <Select
                    options={years}
                    defaultValue={years[years.length - 1]}
                    onChange={(value) => handleChangeYear(value)}
                    style={{ width: '100px' }} />}
                {statistical.length > 0 && (<>
                    <div className="w-[100%] border-[1px] py-1 border-honeydew rounded-[8px] overflow-hidden m-auto my-4 ">
                        {chartType ? <Column {...configStatisticalChartColumn} /> :
                            <Line {...configStatisticalLineColumn} />}
                    </div>
                    <div className="text-right">
                        <Radio.Group onChange={onChangeChart} value={chartType}>
                            <Radio value={true}>Chart Column</Radio>
                            <Radio value={false}>Chart Line</Radio>
                        </Radio.Group>
                    </div>
                </>)}
            </div>

            <div className="top-product-best-seller mb-4">
                <p className="text-red-custom text-[20px] font-semibold tracking-[0.25px] mb-4">*
                    <span className="text-eclipse"> Top 10 products best seller</span>
                </p>
                <div className="w-[100%] overflow-hidden m-auto">
                    <Table
                        style={{
                            marginTop: 15
                        }}
                        columns={columnsTopProducts}
                        dataSource={dashboard?.listProducts}
                        rowKey='id'
                        onChange={handleChangePageTopProducts}
                        pageIndex={pagingTopProducts.pageIndex}
                        pagination={{
                            position: 'center',
                            total: dashboard?.listProducts.length,
                            current: pagingTopProducts.pageIndex,
                            pageSize: pagingTopProducts.pageSize,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`
                        }}
                    />
                </div>
            </div>

            <div className="top-users mb-4">
                <p className="text-red-custom text-[20px] font-semibold tracking-[0.25px] mb-4">*
                    <span className="text-eclipse"> Top 5 users bought the most</span>
                </p>
                <div className="w-[100%] overflow-hidden m-auto">
                    <Table
                        style={{
                            marginTop: 15
                        }}
                        columns={columnsTopUsers}
                        dataSource={dashboard?.listUsers}
                        rowKey='id'
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    </Spin >
}

export default PageDashBoard