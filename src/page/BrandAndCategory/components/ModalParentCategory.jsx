import { Button, Form, Input, Modal } from "antd"

const ModalParentCategory = (props) => {

    const { createParentCategory, isModalCreateParentCategoryOpen, handleCancelModalParentCategory, formParentCategory, handleFinishFormParentCategory } = props

    return <Modal title={createParentCategory ? "Create Parent Category" : "Update Parent Category"}
        width={380}
        open={isModalCreateParentCategoryOpen}
        onCancel={handleCancelModalParentCategory}
        footer={
            <>
                <Button type="default" onClick={handleCancelModalParentCategory}>Cancel</Button>
                <Button type="primary" htmlType="submit" form='formParentCategory'>{createParentCategory ? "Create" : "Update Parent"}</Button>
            </>
        }>
        <Form
            name="formParentCategory"
            form={formParentCategory}
            id='formParentCategory'
            onFinish={handleFinishFormParentCategory}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item
                name="brandId"
                style={{
                    display: 'none'
                }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="id"
                style={{
                    display: 'none'
                }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Parent Category Name</p>}
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

export default ModalParentCategory