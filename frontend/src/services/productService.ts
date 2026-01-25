import { apiClient } from './api';
import { Product, ProductFormData } from '../types';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (data: ProductFormData): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', data);
    return response.data;
  },

  update: async (id: number, data: Partial<ProductFormData>): Promise<Product> => {
    const response = await apiClient.patch<Product>(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
