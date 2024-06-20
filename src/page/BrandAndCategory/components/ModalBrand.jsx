import { Button, Form, Input, Modal } from "antd"

const ModalBrand = (props) => {

    const { createBrand, isModalCreateBrandOpen, handleCancelModalBrand, formBrand, handleFinishFormBrand } = props

    return <Modal title={createBrand ? "Create New Brand" : "Update Brand"}
        width={350}
        open={isModalCreateBrandOpen}
        onCancel={handleCancelModalBrand}
        footer={
            <>
                <Button type="default" onClick={handleCancelModalBrand}>Cancel</Button>
                <Button type="primary" htmlType="submit" form='formBrand'>{createBrand ? "Create" : "Update Brand"}</Button>
            </>
        }>
        <Form
            name="formBrand"
            form={formBrand}
            id='formBrand'
            onFinish={handleFinishFormBrand}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item
                name="id"
                style={{
                    display: 'none'
                }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Brand Name</p>}
                name="name"
                style={{
                    width: '100%',
                    marginBottom: 20
                }}
            >
                <Input autoFocus />
            </Form.Item>
        </Form>
    </Modal>
}
export default ModalBrand