import { apiClient } from './apiClient';

export interface CartItem {
  id: number;
  cartId: number;
  product: {
    id: number;
    name: string;
    currentPrice: number;
    discountPrice?: number;
    stockQuantity: number;
    mainImageUrl?: string;
    unsplashImageUrl?: string;
    isOnSale: boolean;
    isInStock: boolean;
    brand: {
      id: number;
      name: string;
      logoUrl?: string;
    };
    category: {
      id: number;
      name: string;
      level: number;
    };
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id?: number;
  userId: number;
  items: CartItem[];
  totalItemCount: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await apiClient.get('/cart');
    return response.data.data;
  },

  async getCartItemCount(): Promise<number> {
    const response = await apiClient.get('/cart/count');
    return response.data.data;
  },

  async addToCart(request: AddToCartRequest): Promise<Cart> {
    const response = await apiClient.post('/cart/items', request);
    return response.data.data;
  },

  async updateCartItem(cartItemId: number, request: UpdateCartItemRequest): Promise<Cart> {
    const response = await apiClient.put(`/cart/items/${cartItemId}`, request);
    return response.data.data;
  },

  async removeFromCart(cartItemId: number): Promise<Cart> {
    const response = await apiClient.delete(`/cart/items/${cartItemId}`);
    return response.data.data;
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/cart');
  }
};