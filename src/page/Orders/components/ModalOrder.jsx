import { Button, Flex, Image, List, Modal } from "antd"
import { Capitalize } from "utils/Capitalize"

const ModalOrderDetail = (props) => {

    const { listProductsOfOrder, isModalOrderOpen, setIsModalOrderOpen, setListProductOfOrder } = props

    const handleCancelModalOrderOpen = () => {
        setIsModalOrderOpen(false)
        setListProductOfOrder([])
    }

    return <Modal
        title='Products of Order'
        width={700}
        open={isModalOrderOpen}
        onCancel={handleCancelModalOrderOpen}
        footer={
            <>
                <Button type="default" onClick={handleCancelModalOrderOpen}>Cancel</Button>
            </>
        }>
        <List
            bordered
            width='100%'
            dataSource={listProductsOfOrder}
            renderItem={(item) => <List.Item style={{ width: '100%', padding: '24px' }}>
                <div className="overflow-hidden w-[80%]" >
                    <Flex align='center'>
                        <Image
                            width={100}
                            height={100}
                            className="object-center object-cover rounded-[8px] border border-light-gray cursor-pointer"
                            src={item.mainImageBase64}
                            alt="" />
                        <div className="w-[calc(100%-120px)] ml-3">
                            <p className="text-[14px] text-eclipse mb-1 tracking-[0.5px] font-semibold">
                                Brand:
                                <span className="text-red-custom"> {Capitalize(item.brand.split(' ')).toString().replaceAll(',', ' ')} </span>
                                - Code:
                                <span className="text-red-custom"> {item.codeProduct}</span>
                            </p>
                            <div className="flex text-[16.5px] text-eclipse">
                                <p
                                    className='tracking-[0.75px] max-w-[95%] overflow-hidden truncate cursor-pointer'
                                >
                                    {Capitalize(item.nameProduct.split(' ')).toString().replaceAll(',', ' ')}
                                </p>
                                <span className="text-red-custom mx-2">x</span>
                                <p className='font-bold text-red-custom' title='Quantity'>{item.quantity}</p>
                            </div>
                            <p className="text-[14px] text-grey mt-1 tracking-[0.5px]">Size: {item.size}</p>
                        </div>
                    </Flex>
                </div>
                <p className='text-[16px] w-[18%] text-right font-semibold'>{item.totalPrice.toLocaleString()}<sup>đ</sup></p>
            </List.Item>}
        />
    </Modal>
}

export default ModalOrderDetail