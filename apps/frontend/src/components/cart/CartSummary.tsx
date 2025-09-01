import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Cart } from '../../api/cartService';
import { useCartStore } from '../../store/cartStore';
import { LoadingSpinner } from '../common/LoadingSpinner';
import {
  SummaryContainer,
  SummaryTitle,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  TotalRow,
  CheckoutButton,
  ClearButton,
  ButtonSection,
} from '../../styles/components/cartSummary.styles';

interface CartSummaryProps {
  cart: Cart;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  const navigate = useNavigate();
  const { clearCart, isLoading } = useCartStore();

  const handleClearCart = async () => {
    if (window.confirm('장바구니를 모두 비우시겠습니까?')) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <SummaryContainer>
      <SummaryTitle>주문 요약</SummaryTitle>
      
      <SummaryRow>
        <SummaryLabel>상품 개수</SummaryLabel>
        <SummaryValue>{cart.totalItemCount}개</SummaryValue>
      </SummaryRow>
      
      <SummaryRow>
        <SummaryLabel>상품 금액</SummaryLabel>
        <SummaryValue>{cart.totalPrice.toLocaleString()}원</SummaryValue>
      </SummaryRow>
      
      <SummaryRow>
        <SummaryLabel>배송비</SummaryLabel>
        <SummaryValue>무료</SummaryValue>
      </SummaryRow>
      
      <TotalRow>
        <SummaryLabel>총 결제 금액</SummaryLabel>
        <SummaryValue>{cart.totalPrice.toLocaleString()}원</SummaryValue>
      </TotalRow>
      
      <ButtonSection>
        <CheckoutButton 
          onClick={handleCheckout}
          disabled={isLoading || cart.totalItemCount === 0}
        >
          {isLoading ? (
            <LoadingSpinner type="dots" size="small" showText={false} />
          ) : (
            '주문하기'
          )}
        </CheckoutButton>
        
        <ClearButton 
          onClick={handleClearCart}
          disabled={isLoading || cart.totalItemCount === 0}
        >
          장바구니 비우기
        </ClearButton>
      </ButtonSection>
    </SummaryContainer>
  );
};