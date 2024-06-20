import { Button, Form, Input, Modal } from "antd"

const ModalChildCategpry = (props) => {

    const { createChildCategory, isModalCreateChildCategoryOpen, handleCancelModalChildCategory, formChildCategory, handleFinishFormChildCategory } = props

    return <Modal title={createChildCategory ? "Create Child Category" : "Update Child Category"}
        width={380}
        open={isModalCreateChildCategoryOpen}
        onCancel={handleCancelModalChildCategory}
        footer={
            <>
                <Button type="default" onClick={handleCancelModalChildCategory}>Cancel</Button>
                <Button type="primary" htmlType="submit" form='formChildCategory'>{createChildCategory ? "Create" : "Update"}</Button>
            </>
        }>
        <Form
            name="formChildCategory"
            form={formChildCategory}
            id='formChildCategory'
            onFinish={handleFinishFormChildCategory}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item
                name="parentCategoryId"
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
                label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Child Category Name</p>}
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

export default ModalChildCategpry