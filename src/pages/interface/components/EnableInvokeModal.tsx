import { Modal, Input, Form, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import {enableInvoke} from "@/services/dd-openapi-main/UserApiInfoController";

interface Props {
  onSuccess?: () => void; // 新增成功回调
}

export type EnableInvokeModalRef = {
  handleEnableInvoke: (record: API.InterfaceInfoVO) => void;
};

const EnableInvokeModal = forwardRef<EnableInvokeModalRef, Props>(
  ({ onSuccess }, ref) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<API.InterfaceInfoVO | null>(null);

    useImperativeHandle(ref, () => ({
      handleEnableInvoke: (record) => {
        setCurrentRecord(record);
        setVisible(true);
      },
    }));

    const handleSubmit = async () => {
      try {
        const values = await form.validateFields();
        setLoading(true);
        await enableInvoke({
          interfaceId: currentRecord?.id,
          invokeNum: values.invokeNum,
        });
        message.success('开通成功');
        setVisible(false);
        form.resetFields();
        onSuccess?.(); // 触发成功回调
      } catch (error) {
        message.error('开通失败');
      } finally {
        setLoading(false);
      }
    };

    return (
      <Modal
        title={`${currentRecord?.name || '接口'} 开通调用次数`}
        open={visible}
        onOk={handleSubmit}
        confirmLoading={loading}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="invokeNum"
            label="开通数量"
            rules={[
              { required: true, message: '请输入数量' },
              { pattern: /^[1-9]\d*$/, message: '必须为正整数' },
            ]}
          >
            <Input placeholder="请输入调用次数" type="number" min={1} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default EnableInvokeModal;
