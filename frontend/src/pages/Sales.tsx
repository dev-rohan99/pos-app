import { useState } from 'react';
import { Card, Form, Select, InputNumber, Button, message, Alert } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { saleService } from '../services/saleService';
import { Product } from '../types';

export const Sales = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });

  const createSaleMutation = useMutation({
    mutationFn: saleService.create,
    onSuccess: () => {
      message.success('Sale completed successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      form.resetFields();
      setSelectedProduct(null);
    },
    onError: () => {
      message.error('Failed to complete sale');
    },
  });

  const handleProductChange = (productId: number) => {
    const product = products?.find((p) => p.id === productId);
    setSelectedProduct(product || null);
    form.setFieldsValue({ quantity: 1 });
  };

  const handleSubmit = (values: { productId: number; quantity: number }) => {
    if (!selectedProduct) {
      message.error('Please select a product');
      return;
    }

    if (values.quantity > selectedProduct.stockQuantity) {
      message.error('Quantity exceeds available stock');
      return;
    }

    createSaleMutation.mutate({
      productId: values.productId,
      quantity: values.quantity,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create Sale</h2>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="productId"
            label="Select Product"
            rules={[{ required: true, message: 'Please select a product' }]}
          >
            <Select
              placeholder="Choose a product"
              onChange={handleProductChange}
              loading={isLoading}
              showSearch
              optionFilterProp="children"
            >
              {products?.map((product) => (
                <Select.Option key={product.id} value={product.id}>
                  {product.name} - {product.sku} (Stock: {product.stockQuantity})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {selectedProduct && (
            <>
              <Alert
                message={`Available Stock: ${selectedProduct.stockQuantity} units`}
                type="info"
                showIcon
                className="mb-4"
              />

              <div className="mb-4 p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Product Details:</p>
                <p className="font-semibold">{selectedProduct.name}</p>
                <p className="text-sm">SKU: {selectedProduct.sku}</p>
                <p className="text-lg font-bold text-green-600">
                  Price: ${selectedProduct.price.toFixed(2)}
                </p>
              </div>
            </>
          )}

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Please enter quantity' },
              { type: 'number', min: 1, message: 'Quantity must be at least 1' },
              {
                validator: async (_, value) => {
                  if (selectedProduct && value > selectedProduct.stockQuantity) {
                    throw new Error(
                      `Quantity cannot exceed available stock (${selectedProduct.stockQuantity})`
                    );
                  }
                },
              },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enter quantity"
              min={1}
              max={selectedProduct?.stockQuantity || undefined}
            />
          </Form.Item>

          {selectedProduct && form.getFieldValue('quantity') && (
            <div className="mb-4 p-4 bg-blue-50 rounded">
              <p className="text-lg font-semibold">
                Total: $
                {(
                  selectedProduct.price * (form.getFieldValue('quantity') || 0)
                ).toFixed(2)}
              </p>
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createSaleMutation.isPending}
              size="large"
              block
            >
              Complete Sale
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
