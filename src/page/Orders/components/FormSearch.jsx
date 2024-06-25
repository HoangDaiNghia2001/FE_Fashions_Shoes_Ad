import { Checkbox, DatePicker, Flex, Form, Input, Radio, Select } from "antd"
import { LIST_ORDER_STATUS, LIST_PAYMENT_METHOD } from "constant/Variable"
import { useEffect } from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { getDistrictByProvinceAsync, getProvinceAsync, getWardByDistrictAsync } from "../OrdersSlice";
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const FormSearch = (props) => {

    const { hiddenColumn, setHiddenColumn, formSearchOrder, setPaging } = props

    const dispatch = useDispatch()

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [showFormSearch, setShowFormSearch] = useState(false)

    const onFinish = (values) => {
        let orderDateStart;
        let orderDateEnd;
        if (values.orderDate !== undefined) {
            orderDateStart = values.orderDate[0]?.format("YYYY-MM-DD HH:MM:ss")
            orderDateEnd = values.orderDate[1]?.format("YYYY-MM-DD HH:MM:ss")
        }

        let deliveryDateStart;
        let deliveryDateEnd;
        if (values.deliveryDate !== undefined) {
            deliveryDateStart = values.deliveryDate[0]?.format("YYYY-MM-DD HH:MM:ss")
            deliveryDateEnd = values.deliveryDate[1]?.format("YYYY-MM-DD HH:MM:ss")
        }

        let receivingDateStart;
        let receivingDateEnd;
        if (values.receivingDate !== undefined) {
            receivingDateStart = values.receivingDate[0]?.format("YYYY-MM-DD HH:MM:ss")
            receivingDateEnd = values.receivingDate[1]?.format("YYYY-MM-DD HH:MM:ss")
        }

        setPaging({
            ...values,
            orderDate: undefined,
            deliveryDate: undefined,
            receivingDate: undefined,
            orderDateStart: orderDateStart,
            orderDateEnd: orderDateEnd,
            deliveryDateStart: deliveryDateStart,
            deliveryDateEnd: deliveryDateEnd,
            receivingDateStart: receivingDateStart,
            receivingDateEnd: receivingDateEnd,
            pageIndex: 1,
            pageSize: 10
        })

        console.log({
            ...values,
            orderDateStart: orderDateStart,
            orderDateEnd: orderDateEnd,
            deliveryDateStart: deliveryDateStart,
            deliveryDateEnd: deliveryDateEnd,
            receivingDateStart: receivingDateStart,
            receivingDateEnd: receivingDateEnd,
            pageIndex: 1,
            pageSize: 10
        })
    }

    const onReset = () => {
        setPaging({
            pageIndex: 1,
            pageSize: 10
        })
        formSearchOrder.resetFields()
        setDistricts([])
        setWards([])
    }

    const handleSearchOrders = (e) => {
        setShowFormSearch(e.target.checked)
    }

    const handleHiddenColumn = (e) => {
        setHiddenColumn(e.target.value)
    }

    const getProvinces = async () => {
        const response = await dispatch(getProvinceAsync())
        setProvinces(response.payload.data.map((item) => {
            return {
                value: item.ProvinceID,
                label: item.ProvinceName
            }
        }))
    }

    const getDistrictByProvince = async (value) => {
        if (value) {
            const response = await dispatch(getDistrictByProvinceAsync(value))
            setDistricts(response.payload.data?.map((item) => {
                return {
                    value: item.DistrictID,
                    label: item.DistrictName
                }
            }))
        }
    }

    const getWardByDistrict = async (value) => {
        if (value) {
            const response = await dispatch(getWardByDistrictAsync(value))
            console.log(response)
            setWards(response.payload.data?.map((item) => {
                return {
                    value: item.WardCode,
                    label: item.WardName
                }
            }))
        }
    }

    const handleChangeProvince = () => {
        formSearchOrder.resetFields(['district', 'ward'])
        setDistricts([])
        setWards([])
        getDistrictByProvince(formSearchOrder.getFieldValue(['province']))
    }

    const handleChangeDistrict = () => {
        formSearchOrder.resetFields(['ward'])
        setWards([])
        getWardByDistrict(formSearchOrder.getFieldValue(['district']))
    }

    useEffect(() => {
        getProvinces()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
        <Form
            name="formSearchOrder"
            form={formSearchOrder}
            id="formSearchOrder"
            onFinish={onFinish}
            onReset={onReset}
            autoComplete="off"
            className={`form-search form ${showFormSearch && 'show'}`}
            layout="vertical"
        >
            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Order By</p>}
                    name="orderBy"
                    style={{
                        width: 235,
                        marginBottom: 10
                    }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Phone Number</p>}
                    name="phoneNumber"
                    style={{
                        width: 235,
                        marginBottom: 10
                    }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Order Status</p>}
                    name="orderStatus"
                    style={{
                        width: 235,
                        marginBottom: 10
                    }}
                >
                    <Select
                        options={LIST_ORDER_STATUS}
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Payment Method</p>}
                    name="paymentMethod"
                    style={{
                        width: 235,
                        marginBottom: 10
                    }}
                >
                    <Select
                        options={LIST_PAYMENT_METHOD} />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Order Date</p>}
                    name="orderDate"
                    style={{
                        width: 235,
                        marginBottom: 10
                    }}
                >
                    <RangePicker
                        style={{
                            width: '100%'
                        }}
                        format={dateFormat}
                    />
                </Form.Item>
            </Flex>

            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Delivery Date</p>}
                    name="deliveryDate"
                    style={{
                        width: 235
                    }}
                >
                    <RangePicker
                        style={{
                            width: '100%'
                        }}
                        format={dateFormat}
                    />
                </Form.Item>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Receiving Date</p>}
                    name="receivingDate"
                    style={{
                        width: 235
                    }}
                >
                    <RangePicker
                        style={{
                            width: '100%'
                        }}
                        format={dateFormat}
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Province</p>}
                    name="province"
                    style={{
                        width: 235
                    }}
                >
                    <Select
                        options={provinces}
                        onChange={handleChangeProvince}
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">District</p>}
                    name="district"
                    style={{
                        width: 235,
                    }}
                >
                    <Select
                        options={districts}
                        onChange={handleChangeDistrict}
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Ward</p>}
                    name="ward"
                    style={{
                        width: 235
                    }}
                >
                    <Select
                        options={wards}
                    />
                </Form.Item>

            </Flex>
        </Form>

        <div className='mt-1 w-full'>
            <Flex justify='space-between' align='center'>
                <div>
                    <button type="reset" form="formSearchOrder" className={`custom-btn w-[110px] px-5 py-[5px] mr-3 text-[14px] rounded-[8px] ${!showFormSearch && 'hidden'}`}>Reset</button>
                    <button type="submmit" form="formSearchOrder" className={`custom-btn w-[110px] px-7 py-[5px] mr-3 text-[14px] rounded-[8px] ${!showFormSearch && 'hidden'}`}>Search</button>
                    <Checkbox onChange={handleSearchOrders} style={{ fontSize: '16px', fontWeight: '600' }}>
                        Search Orders
                    </Checkbox>
                </div>

                <Radio.Group onChange={handleHiddenColumn} value={hiddenColumn} style={{ fontWeight: '600' }}>
                    <Radio style={{ fontSize: '16px' }} value={true}>Reduce</Radio>
                    <Radio style={{ fontSize: '16px' }} value={false}>Full Column</Radio>
                </Radio.Group>
            </Flex>
        </div>
    </>
}

export default FormSearch