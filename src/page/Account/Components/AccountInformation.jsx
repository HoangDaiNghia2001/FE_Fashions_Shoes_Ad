import { Flex, Form, Input, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { LIST_GENDER } from "constant/Variable"
import { getDistrictByProvinceAsync, getProvinceAsync, getWardByDistrictAsync } from "page/Orders/OrdersSlice"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { ConvertDate } from "utils/ConvertDate"
import { testAcount, updateInformationAsync } from "../AccountSlice"

const AccountInformation = (props) => {

    const { admin, adminImage, openNotification } = props
    const dispatch = useDispatch()

    const [formAccount] = useForm()


    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const onFinish = async (values) => {
        const infor = { ...values, avatarBase64: adminImage }
        const response = await dispatch(updateInformationAsync(infor))

        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
            await localStorage.setItem("admin", JSON.stringify(response.payload.results))
            await dispatch(testAcount(response.payload.results))
        } else {
            openNotification(response.payload.message, 'error')
        }
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
        formAccount.resetFields(['district', 'ward'])
        setDistricts([])
        setWards([])
        getDistrictByProvince(formAccount.getFieldValue(['province']))
    }

    const handleChangeDistrict = () => {
        formAccount.resetFields(['ward'])
        setWards([])
        getWardByDistrict(formAccount.getFieldValue(['district']))
    }

    useEffect(() => {
        getProvinces()
        if (admin.province !== '') {
            getDistrictByProvince(+admin.province)
        }
        if (admin.district !== '') {
            getWardByDistrict(+admin.district)
        }
        formAccount.setFieldsValue({
            createAt: ConvertDate(admin.createAt),
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            mobile: admin.mobile,
            gender: admin.gender,
            address: admin.address,
        })
        if (admin.province !== '') {
            formAccount.setFieldValue('province', +admin.province)
        }
        if (admin.district !== '') {
            formAccount.setFieldValue('district', +admin.district)
        }
        if (admin.ward !== '') {
            formAccount.setFieldValue('ward', admin.ward)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="account--information w-[70%] h-full pr-12 border-r border-light-gray">
        <Form
            name="formAccount"
            form={formAccount}
            id="formAccount"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            style={{
                width: '100%'
            }}
        >
            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Create At</p>}
                    name="createAt"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Email</p>}
                    name="email"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Input disabled />
                </Form.Item>
            </Flex>

            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">First Name</p>}
                    name="firstName"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name !!!'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Last Name</p>}
                    name="lastName"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input last name !!!'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Flex>

            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Mobile</p>}
                    name="mobile"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your mobile !!!'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Gender</p>}
                    name="gender"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Select options={LIST_GENDER} />
                </Form.Item>
            </Flex>

            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Street Address</p>}
                    name="address"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Province</p>}
                    name="province"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Select
                        options={provinces}
                        onChange={handleChangeProvince}
                        placeholder='Select your province'
                    />
                </Form.Item>
            </Flex>

            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">District</p>}
                    name="district"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Select
                        options={districts}
                        onChange={handleChangeDistrict}
                        placeholder='Select your district'
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Ward</p>}
                    name="ward"
                    style={{
                        width: '48%',
                        marginBottom: 10
                    }}
                >
                    <Select options={wards} placeholder='Select your ward' />
                </Form.Item>
            </Flex>
            <div className="text-center mt-2">
                <button className="custom-btn px-16 py-[6px] mr-3 text-[16px] rounded-[8px] tracking-[1px]">Save</button>
            </div>
        </Form>
    </div>
}

export default AccountInformation