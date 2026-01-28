import { useState } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { ProductForm } from '../components/ProductForm';
import { Product, ProductFormData } from '../types';

export const Products = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      message.success('Product created successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalVisible(false);
    },
    onError: () => {
      message.error('Failed to create product');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProductFormData> }) =>
      productService.update(id, data),
    onSuccess: () => {
      message.success('Product updated successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalVisible(false);
      setEditingProduct(undefined);
    },
    onError: () => {
      message.error('Failed to update product');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      message.success('Product deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      message.error('Failed to delete product');
    },
  });

  const handleCreate = () => {
    setEditingProduct(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (values: ProductFormData) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Product) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <ProductForm
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingProduct(undefined);
        }}
        onSubmit={handleSubmit}
        initialValues={editingProduct}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};
