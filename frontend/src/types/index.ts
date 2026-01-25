export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
}

export interface ProductFormData {
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface Sale {
  productId: number;
  quantity: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
