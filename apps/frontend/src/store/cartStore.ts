import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { cartService, type Cart, type AddToCartRequest, type UpdateCartItemRequest } from '../api/cartService';
import toast from 'react-hot-toast';

interface CartStore {
  // State
  cart: Cart | null;
  cartItemCount: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCart: () => Promise<void>;
  fetchCartItemCount: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // UI helpers
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    (set) => ({
      // Initial state
      cart: null,
      cartItemCount: 0,
      isLoading: false,
      error: null,

      // Actions
      fetchCart: async () => {
        try {
          set({ isLoading: true, error: null });
          const cart = await cartService.getCart();
          set({ cart, isLoading: false });
        } catch (error) {
          console.error('장바구니 조회 실패:', error);
          set({ 
            error: '장바구니를 불러오는데 실패했습니다.', 
            isLoading: false 
          });
        }
      },

      fetchCartItemCount: async () => {
        try {
          const count = await cartService.getCartItemCount();
          set({ cartItemCount: count });
        } catch (error) {
          console.error('장바구니 개수 조회 실패:', error);
          set({ cartItemCount: 0 });
        }
      },

      addToCart: async (productId: number, quantity: number = 1) => {
        try {
          set({ isLoading: true, error: null });
          
          const request: AddToCartRequest = { productId, quantity };
          const updatedCart = await cartService.addToCart(request);
          
          set({ 
            cart: updatedCart, 
            cartItemCount: updatedCart.totalItemCount,
            isLoading: false 
          });
          
          toast.success('장바구니에 상품이 추가되었습니다! 🛒');
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || '장바구니 추가에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage + ' 😢');
        }
      },

      updateCartItem: async (cartItemId: number, quantity: number) => {
        try {
          set({ isLoading: true, error: null });
          
          const request: UpdateCartItemRequest = { quantity };
          const updatedCart = await cartService.updateCartItem(cartItemId, request);
          
          set({ 
            cart: updatedCart, 
            cartItemCount: updatedCart.totalItemCount,
            isLoading: false 
          });
          
          toast.success('수량이 변경되었습니다! ✅');
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || '수량 변경에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage + ' 😢');
        }
      },

      removeFromCart: async (cartItemId: number) => {
        try {
          set({ isLoading: true, error: null });
          
          const updatedCart = await cartService.removeFromCart(cartItemId);
          
          set({ 
            cart: updatedCart, 
            cartItemCount: updatedCart.totalItemCount,
            isLoading: false 
          });
          
          toast.success('상품이 제거되었습니다! 🗑️');
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || '상품 제거에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage + ' 😢');
        }
      },

      clearCart: async () => {
        try {
          set({ isLoading: true, error: null });
          
          await cartService.clearCart();
          
          set({ 
            cart: null, 
            cartItemCount: 0,
            isLoading: false 
          });
          
          toast.success('장바구니가 비워졌습니다! 🗑️');
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || '장바구니 비우기에 실패했습니다.';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage + ' 😢');
        }
      },

      // UI helpers
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'cart-store',
    }
  )
);