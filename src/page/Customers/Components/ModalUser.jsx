import { Button, Modal, Spin, Flex, Form, Input, Select, Checkbox } from "antd"
import { LIST_GENDER } from "constant/Variable";
import { getDistrictByProvinceAsync, getProvinceAsync, getWardByDistrictAsync, ordersSelector } from "page/Orders/OrdersSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Capitalize } from "utils/Capitlalize";
import { createUserAsync, customersSelector, getAllRolesAsync, updateUserAsync } from "../CustomersSlice";

const ModalUser = (props) => {
    const dispatch = useDispatch()
    const orders = useSelector(ordersSelector)
    const customers = useSelector(customersSelector)

    const { createUser, isModalUserOpen, setIsModalUserOpen, formUser, openNotification, setCreateUser } = props

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [roles, setRoles] = useState([])

    const handleCancelModalUser = () => {
        setIsModalUserOpen(false);
        formUser.resetFields()
    };

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
        formUser.resetFields(['district', 'ward'])
        setDistricts([])
        setWards([])
        getDistrictByProvince(formUser.getFieldValue(['province']))
    }

    const handleChangeDistrict = () => {
        formUser.resetFields(['ward'])
        setWards([])
        getWardByDistrict(formUser.getFieldValue(['district']))
    }

    const getAllRoles = async () => {
        const response = await dispatch(getAllRolesAsync())

        setRoles(response.payload.map(item => {
            return {
                value: item.name,
                label: Capitalize(item.name.split(' ')).toString().replaceAll(',', ' ')
            }
        }))
    }

    const onFinishformUser = async (values) => {
        const userRequest = {
            ...values,
            ...{
                province: values.province !== undefined ? values.province : '',
                district: values.district !== undefined ? values.district : '',
                ward: values.ward !== undefined ? values.ward : ''
            }
        }
        let response;
        // create or update user
        if (createUser) {
            response = await dispatch(createUserAsync(userRequest))
        } else {
            response = await dispatch(updateUserAsync(userRequest))
        }

        // display notification
        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
            formUser.resetFields()
            setIsModalUserOpen(false)
            setCreateUser(true)
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    useEffect(() => {
        getProvinces()
        getAllRoles()
        // duoc su dung khi update user
        if (formUser.getFieldValue('province') !== '') {
            getDistrictByProvince(formUser.getFieldValue('province'))
        }

        if (formUser.getFieldValue('district') !== '') {
            getWardByDistrict(formUser.getFieldValue('district'))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formUser.getFieldValue('province'), formUser.getFieldValue('district')])

    return <Modal
        title={createUser ? 'Create User' : 'Update User'}
        width={700}
        open={isModalUserOpen}
        onCancel={handleCancelModalUser}
        footer={
            <>
                <Button type="default" onClick={handleCancelModalUser}>Cancel</Button>
                <Button type="primary" htmlType="submit" form='formUser'>{createUser ? 'Create' : 'Update'}</Button>
            </>
        }>

        <Spin tip="Loading" size="large" spinning={customers.isLoading || orders.isLoading}>
            <Form
                name='formUser'
                form={formUser}
                id='formUser'
                autoComplete="off"
                layout="vertical"
                className="form"
                initialValues={{
                    price: 0,
                    discountedPercent: 0,
                }}
                onFinish={onFinishformUser}
            >
                <Form.Item
                    name="id"
                    style={{
                        display: 'none'
                    }}
                >
                    <Input />
                </Form.Item>

                <Flex style={{ width: '100%' }} justify='space-between'>
                    <Form.Item
                        name="code"
                        label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Code</p>}
                        style={{
                            width: '49%',
                            marginBottom: 20
                        }}

                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Email</p>}
                        style={{
                            width: '49%',
                            marginBottom: 20
                        }}
                    >
                        <Input disabled={!createUser} type={'email'} />
                    </Form.Item>
                </Flex>

                <Flex style={{ width: '100%' }} justify='space-between'>
                    <Form.Item
                        name="firstName"
                        label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">First Name</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input this field !!!'
                            },
                        ]}
                        style={{
                            width: '49%',
                            marginBottom: 20
                        }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Last Name</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input this field !!!'
                            },
                        ]}
                        style={{
                            width: '49%',
                            marginBottom: 20
                        }}
                    >
                        <Input />
                    </Form.Item>
                </Flex>

                <Flex style={{ width: '100%' }} justify='space-between'>
                    <Form.Item
                        name="mobile"
                        label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Mobile</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input this field !!!'
                            },
                        ]}
                        style={{
                            width: '49%',
                            marginBottom: 20
                        }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Gender</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input this field !!!'
                            },
                        ]}
                        style={{
                            width: '49%',
                            marginBottom: 20
                        }}
                    >
                        <Select options={LIST_GENDER} />
                    </Form.Item>
                </Flex>

                <Flex style={{ width: '100%' }} justify='space-between'>
                    <Form.Item
                        name="address"
                        label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Street Address</p>}
                        style={{
                            width: '49%',
                            marginBottom: 20
                        }}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="province"
                        label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Province</p>}
                        style={{
                            width: '49%',
                            marginBottom: 20
                        }}
                    >
                        <Select
                            options={provinces}
                            onChange={handleChangeProvince}
                            placeholder='Select your province'
                        />
                    </Form.Item>
                </Flex>

                <Flex style={{ width: '100%' }} justify='space-between'>
                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">District</p>}
                        name="district"
                        style={{
                            width: '49%',
                            marginBottom: 20
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
                            width: '49%',
                            marginBottom: 20
                        }}
                    >
                        <Select
                            options={wards}
                            placeholder='Select your ward'
                        />
                    </Form.Item>
                </Flex>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Roles</p>}
                    name="roles"
                    style={{
                        width: '100%',
                        marginBottom: 20
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input this field !!!'
                        },
                    ]}
                >
                    <Checkbox.Group options={roles} />
                </Form.Item>
            </Form>
        </Spin>
    </Modal>
}

export default ModalUser