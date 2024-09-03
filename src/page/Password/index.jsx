import { Form, Input, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { APP_URLS } from 'constant/Variable'
import { logoutAsync, sendSuccess } from 'page/Login/LoginSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TabTile } from 'utils/TabTile'
import { chanegPasswordAsync, passwordSelector } from './PasswordSlice'
import './Style.css'

const PagePassword = (props) => {

    const { openNotification } = props

    const dispatch = useDispatch()

    const password = useSelector(passwordSelector)

    const navigate = useNavigate()

    const [formChangePassword] = useForm()

    const handleFinishFormChangePassword = async (values) => {
        const response = await dispatch(chanegPasswordAsync(values))
        if (response.payload.success) {
            formChangePassword.resetFields()

            const res = await dispatch(logoutAsync())
            if (res.payload.success) {
                localStorage.removeItem("admin")
                await dispatch(sendSuccess({
                    success: true,
                    title: response.payload.message + ", Please log in again !!!"
                }))
                navigate(APP_URLS.URL_LOGIN)
            } else {
                openNotification(res.payload.message, 'error')
            }
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    useEffect(() => {
        TabTile("My Password")
    }, [])

    return <Spin tip="Loading" size="large" spinning={password.isLoading}>
        <div className='page-passwors h-[calc(screen-80px)] flex px-4 pb-7 pt-[15px] bg-white'>
            <div className='border-[1px] border-light-gray p-10 rounded-[8px] w-[550px] mx-auto mt-[50px]'>
                <p className='mb-8 text-center text-[55px] text-eclipse font-semibold tracking-[4px]'>Reset password</p>
                <Form
                    name="formChangePassword"
                    form={formChangePassword}
                    id='formChangePassword'
                    onFinish={handleFinishFormChangePassword}
                    autoComplete="off"
                    layout="vertical"
                >

                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Old Password</p>}
                        name="oldPassword"
                        style={{
                            width: '100%',
                            marginBottom: 20
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input  old password!',
                            },
                        ]}
                    >
                        <Input.Password autoFocus />
                    </Form.Item>

                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">New Password</p>}
                        name="newPassword"
                        style={{
                            width: '100%',
                            marginBottom: 20
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                            {
                                min: 8,
                                message: 'Password is too short - should be 8 chars minimum!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('oldPassword') === value) {
                                        return Promise.reject(new Error('New password must be difference the old password!'));
                                    } else if (value && !/^.*(?=.*\d)((?=.*[A-Z]){1}).*$/.test(value)) {
                                        return Promise.reject(new Error('Password must contain at least one uppercase, one number!'));
                                    }
                                    return Promise.resolve();
                                }
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Repeat Password</p>}
                        name="repeatNewPassword"
                        style={{
                            width: '100%',
                            marginBottom: 20
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please repeat your new password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The repeat new password that you entered do not match!'));
                                }
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div className="text-center mt-2">
                        <button className="custom-btn px-16 py-[6px] mr-3 text-[16px] rounded-[8px] tracking-[1px]">Save</button>
                    </div>
                </Form>
            </div>
        </div>
    </Spin>
}

export default PagePassword