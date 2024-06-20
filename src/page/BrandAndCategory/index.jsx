import { Checkbox, Empty, Flex, Popconfirm, Spin, Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import './Style.css'
import { useDispatch, useSelector } from 'react-redux';
import {
    brandsSelector, createBrandAsync, createChildCategoryAsync,
    createParentCategoryAsync, deleteBrandAsync, deleteChildCategoryAsync,
    deleteParentCategoryAsync, getAllBrandsDetailAsync, updateBrandAsync,
    updateChildCategoryAsync, updateParentCategoryAsync
} from './BrandsSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { Capitalize } from 'utils/Capitlalize';
import { useForm } from 'antd/es/form/Form';
import ModalBrand from './components/ModalBrand';
import ModalParentCategory from './components/ModalParentCategory';
import ModalChildCategpry from './components/ModalChildCategory';

const PageBrands = (props) => {

    const { openNotification } = props

    const dispatch = useDispatch()

    const [formBrand] = useForm()

    const [formParentCategory] = useForm()

    const [formChildCategory] = useForm()

    const brands = useSelector(brandsSelector)

    // list detail
    const [brandsDetail, setBrandsDetail] = useState([])

    const [remove, setRemove] = useState(false)

    // brand
    const [createBrand, setCreateBrand] = useState(true)
    const [isModalCreateBrandOpen, setIsModalCreateBrandOpen] = useState(false)

    // parent category
    const [isModalCreateParentCategoryOpen, setIsModalCreateParentCategoryOpen] = useState(false)
    const [createParentCategory, setCreateParentCategory] = useState(true)

    // child category
    const [isModalCreateChildCategoryOpen, setIsModalCreateChildCategoryOpen] = useState(false)
    const [createChildCategory, setCreateChildCategory] = useState(true)

    const getAllBrandsDetail = async () => {
        const response = await dispatch(getAllBrandsDetailAsync())
        if (response.payload.success) {
            setBrandsDetail(response.payload.results.map(item => {
                return [{
                    title: <div className='flex items-center text-eclipse'>
                        <p className='font-semibold tracking-[0.5px] text-[18px] duration-150 ease-linear cursor-pointer hover:text-red-custom'>
                            <Popconfirm
                                title="The question"
                                description="Are you want to update or add a new parent category?"
                                onConfirm={() => handleCreateParentCategory(item)}
                                onCancel={() => handleUpdateBrand(item)}
                                okText="Add new"
                                cancelText="Update"
                            >
                                {Capitalize(item.name.split(' ')).toString().replaceAll(',', ' ')}
                            </Popconfirm>
                        </p>
                        <Popconfirm
                            title="The question"
                            description="Are you want to delete this brand?"
                            onConfirm={() => handleDeleteBrand(item)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <i className={`fa-solid fa-trash-can ml-[6px] text-[14px] duration-150 ease-linear hover:text-red-custom cursor-pointer ${remove ? 'block' : 'hidden'}`} ></i>
                        </Popconfirm>
                    </div>,
                    key: item.id,
                    children: item.parentCategoryResponseList.map(item1 => {
                        return {
                            title: <div className='flex items-center text-eclipse'>
                                <p className='tracking-[0.5px] text-[17px] duration-150 ease-linear hover:text-red-custom'>
                                    <Popconfirm
                                        title="The question"
                                        description="Are you want to update or add a new child category?"
                                        onConfirm={() => handleCreateChildCategory(item1)}
                                        onCancel={() => handleUpdateParentCategory({ ...item1, brandId: item.id })}
                                        okText="Add new"
                                        cancelText="Update"
                                    >
                                        {Capitalize(item1.name.split(' ')).toString().replaceAll(',', ' ')}
                                    </Popconfirm>
                                </p>
                                <Popconfirm
                                    title="The question"
                                    description="Are you want to delete this parent category?"
                                    onConfirm={() => handleDeleteParentCategory(item1)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <i className={`fa-solid fa-trash-can ml-[6px] text-[14px] duration-150 ease-linear hover:text-red-custom cursor-pointer ${remove ? 'block' : 'hidden'}`} ></i>
                                </Popconfirm>
                            </div>,
                            key: item.id + '-' + item1.id,
                            children: item1.childCategoryResponseList.map(item2 => {
                                return {
                                    title: <div className='flex items-center text-eclipse'>
                                        <p onClick={() => handleUpdateChildCategory({ ...item2, parentCategoryId: item1.id })} className='text-[16px] tracking-[0.5px] duration-150 ease-linear hover:text-red-custom'>
                                            {Capitalize(item2.name.split(' ')).toString().replaceAll(',', ' ')}
                                        </p>
                                        <Popconfirm
                                            title="The question"
                                            description="Are you want to delete this child category?"
                                            onConfirm={() => handleDeleteChildCategory(item2)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <i className={`fa-solid fa-trash-can ml-[6px] text-[14px] duration-150 ease-linear hover:text-red-custom cursor-pointer ${remove ? 'block' : 'hidden'}`} ></i>
                                        </Popconfirm>
                                    </div>,
                                    key: item.id + '-' + item1.id + '-' + item2.id
                                }
                            })
                        }
                    })
                }]
            }))
        }
    }

    // brand method
    const handleCreateBrand = () => {
        setCreateBrand(true)
        setIsModalCreateBrandOpen(true)
    }

    const handleUpdateBrand = (brand) => {
        setCreateBrand(false)
        setIsModalCreateBrandOpen(true)
        formBrand.setFieldsValue({ ...brand })
    }

    const handleCancelModalBrand = () => {
        setIsModalCreateBrandOpen(false)
        formBrand.resetFields()
    }

    const handleFinishFormBrand = async (values) => {
        if (createBrand) {
            const response = await dispatch(createBrandAsync(values))
            if (response.payload.success) {
                setIsModalCreateBrandOpen(false)
                formBrand.resetFields()
                openNotification(response.payload.message, 'success')
            } else {
                openNotification(response.payload.message, 'error')
            }
        } else {
            console.log(values)
            const response = await dispatch(updateBrandAsync(values))
            if (response.payload.success) {
                setCreateBrand(true)
                setIsModalCreateBrandOpen(false)
                formBrand.resetFields()
                openNotification(response.payload.message, 'success')
            } else {
                openNotification(response.payload.message, 'error')
            }
        }
    }

    const handleDeleteBrand = async (brand) => {
        const response = await dispatch(deleteBrandAsync(brand.id))
        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    // parent category method
    const handleCreateParentCategory = (brand) => {
        formParentCategory.setFieldsValue({
            brandId: brand.id
        })
        setIsModalCreateParentCategoryOpen(true)
        setCreateParentCategory(true)
    }

    const handleUpdateParentCategory = (values) => {
        setIsModalCreateParentCategoryOpen(true)
        setCreateParentCategory(false)
        formParentCategory.setFieldsValue({
            ...values
        })
    }

    const handleCancelModalParentCategory = () => {
        setIsModalCreateParentCategoryOpen(false)
        formParentCategory.resetFields()
    }

    const handleFinishFormParentCategory = async (values) => {
        if (createParentCategory) {
            const response = await dispatch(createParentCategoryAsync(values))
            if (response.payload.success) {
                setIsModalCreateParentCategoryOpen(false)
                formParentCategory.resetFields()
                openNotification(response.payload.message, 'success')
            } else {
                openNotification(response.payload.message, 'error')
            }
        } else {
            const response = await dispatch(updateParentCategoryAsync(values))
            if (response.payload.success) {
                setCreateParentCategory(true)
                setIsModalCreateParentCategoryOpen(false)
                formParentCategory.resetFields()
                openNotification(response.payload.message, 'success')
            } else {
                openNotification(response.payload.message, 'error')
            }
        }
    }

    const handleDeleteParentCategory = async (parentCategory) => {
        const response = await dispatch(deleteParentCategoryAsync(parentCategory.id))
        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    // child category method
    const handleCreateChildCategory = (parentCategory) => {
        setIsModalCreateChildCategoryOpen(true)
        setCreateChildCategory(true)
        formChildCategory.setFieldsValue({
            parentCategoryId: parentCategory.id
        })
    }

    const handleUpdateChildCategory = (values) => {
        setIsModalCreateChildCategoryOpen(true)
        setCreateChildCategory(false)
        formChildCategory.setFieldsValue({
            ...values
        })
    }

    const handleCancelModalChildCategory = () => {
        setIsModalCreateChildCategoryOpen(false)
        formChildCategory.resetFields()
    }

    const handleFinishFormChildCategory = async (values) => {
        if (createChildCategory) {
            const response = await dispatch(createChildCategoryAsync(values))
            if (response.payload.success) {
                setIsModalCreateChildCategoryOpen(false)
                formChildCategory.resetFields()
                openNotification(response.payload.message, 'success')
            } else {
                openNotification(response.payload.message, 'error')
            }
        } else {
            const response = await dispatch(updateChildCategoryAsync(values))
            if (response.payload.success) {
                setCreateChildCategory(true)
                setIsModalCreateChildCategoryOpen(false)
                formChildCategory.resetFields()
                openNotification(response.payload.message, 'success')
            } else {
                openNotification(response.payload.message, 'error')
            }
        }
    }

    const handleDeleteChildCategory = async (childCategory) => {
        const response = await dispatch(deleteChildCategoryAsync(childCategory.id))
        if (response.payload.success) {
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    // remove
    const onRemoveItem = (e) => {
        setRemove(e.target.checked)
    }

    useEffect(() => {
        getAllBrandsDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brands.brand, brands.parentCategory, brands.childCategory, remove])

    return <Spin tip="Loading" size="large" spinning={brands.isLoading || brands.isLoadDetail}>
        <div className='page-brands h-screen w-full px-4 pb-7 pt-4 bg-white'>
            <div className='mb-6 flex justify-between items-center'>
                <Checkbox onChange={onRemoveItem} checked={remove} style={{ fontSize: '16px', fontWeight: '700' }}>
                    Delete
                </Checkbox>
                <button
                    title='Create new brand'
                    className='custom-btn px-7 py-[5px] w-[110px] text-[16px] rounded-[8px]'
                    onClick={handleCreateBrand}>
                    Create
                </button>
            </div>

            {
                brandsDetail.length ? <Flex wrap='wrap' style={{ width: '100%' }}>
                    {
                        brandsDetail.map((item, index) =>
                            <div key={index} className='w-[24%] overflow-hidden mb-8 mx-[6px]'>
                                <Tree
                                    showLine
                                    switcherIcon={<DownOutlined />}
                                    defaultExpandAll
                                    treeData={item}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </div>
                        )

                    }
                </Flex>
                    :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }

        </div>

        {/* modal of brand */}
        <ModalBrand
            createBrand={createBrand}
            isModalCreateBrandOpen={isModalCreateBrandOpen}
            handleCancelModalBrand={handleCancelModalBrand}
            formBrand={formBrand}
            handleFinishFormBrand={handleFinishFormBrand}
        />

        {/* modal of parent category */}
        <ModalParentCategory
            createParentCategory={createParentCategory}
            isModalCreateParentCategoryOpen={isModalCreateParentCategoryOpen}
            handleCancelModalParentCategory={handleCancelModalParentCategory}
            formParentCategory={formParentCategory}
            handleFinishFormParentCategory={handleFinishFormParentCategory}
        />

        {/* modal of child category */}
        <ModalChildCategpry
            createChildCategory={createChildCategory}
            isModalCreateChildCategoryOpen={isModalCreateChildCategoryOpen}
            handleCancelModalChildCategory={handleCancelModalChildCategory}
            formChildCategory={formChildCategory}
            handleFinishFormChildCategory={handleFinishFormChildCategory}
        />
    </Spin>
}

export default PageBrands