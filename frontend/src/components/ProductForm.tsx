import { Form, Input, InputNumber, Modal } from 'antd';
import { useEffect } from 'react';
import { Product, ProductFormData } from '../types';

interface ProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ProductFormData) => void;
  initialValues?: Product;
  loading?: boolean;
}

export const ProductForm = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  loading,
}: ProductFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Product' : 'Create Product'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter product name' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="sku"
          label="SKU"
          rules={[{ required: true, message: 'Please enter SKU' }]}
        >
          <Input placeholder="Enter SKU" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: 'Please enter price' },
            { type: 'number', min: 0, message: 'Price must be positive' },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Enter price"
            prefix="$"
            precision={2}
            min={0}
          />
        </Form.Item>

        <Form.Item
          name="stockQuantity"
          label="Stock Quantity"
          rules={[
            { required: true, message: 'Please enter stock quantity' },
            { type: 'number', min: 0, message: 'Stock must be positive' },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Enter stock quantity"
            min={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
