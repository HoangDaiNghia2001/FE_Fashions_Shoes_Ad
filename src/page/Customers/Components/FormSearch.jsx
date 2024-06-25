import { Checkbox, Flex, Form, Input, Radio, Select } from "antd"
import { useEffect } from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { getDistrictByProvinceAsync, getProvinceAsync, getWardByDistrictAsync } from "../../Orders/OrdersSlice";
const FormSearch = (props) => {

    const { hiddenColumn, setHiddenColumn, formSearchUser, setPaging } = props

    const dispatch = useDispatch()

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [showFormSearch, setShowFormSearch] = useState(false)

    const onFinish = (values) => {
        setPaging({
            ...values,
            pageIndex: 1,
            pageSize: 10
        })
    }

    const onReset = () => {
        setPaging({
            pageIndex: 1,
            pageSize: 10
        })
        formSearchUser.resetFields()
        setDistricts([])
        setWards([])
    }

    const handleSearchUsers = (e) => {
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
        formSearchUser.resetFields(['district', 'ward'])
        setDistricts([])
        setWards([])
        getDistrictByProvince(formSearchUser.getFieldValue(['province']))
    }

    const handleChangeDistrict = () => {
        formSearchUser.resetFields(['ward'])
        setWards([])
        getWardByDistrict(formSearchUser.getFieldValue(['district']))
    }

    useEffect(() => {
        getProvinces()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
        <Form
            name="formSearchUser"
            form={formSearchUser}
            id="formSearchUser"
            onFinish={onFinish}
            onReset={onReset}
            autoComplete="off"
            className={`form-search form ${showFormSearch && 'show'}`}
            layout="vertical"
        >
            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Code</p>}
                    name="code"
                    style={{
                        width: 235,
                        marginBottom: 10
                    }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Email</p>}
                    name="email"
                    style={{
                        width: 235,
                        marginBottom: 10
                    }}
                >
                    <Input type={'email'} />
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
                    <button type="reset" form="formSearchUser" className={`custom-btn w-[110px] px-5 py-[5px] mr-3 text-[14px] rounded-[8px] ${!showFormSearch && 'hidden'}`}>Reset</button>
                    <button type="submmit" form="formSearchUser" className={`custom-btn w-[110px] px-7 py-[5px] mr-3 text-[14px] rounded-[8px] ${!showFormSearch && 'hidden'}`}>Search</button>
                    <Checkbox onChange={handleSearchUsers} style={{ fontSize: '16px', fontWeight: '600' }}>
                        Search Users
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