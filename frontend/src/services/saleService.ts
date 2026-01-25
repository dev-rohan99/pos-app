import { apiClient } from './api';
import { Sale } from '../types';

export const saleService = {
  create: async (data: Sale): Promise<void> => {
    await apiClient.post('/sales', data);
  },
};
