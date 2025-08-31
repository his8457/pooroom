import React, { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import {
  Container,
  Content,
  Title,
  CartSection,
  CartItemsSection,
  CartSummarySection,
  EmptyCart,
  EmptyCartMessage,
  ContinueShoppingButton,
} from '../styles/pages/cartPage.styles';

export const CartPage: React.FC = () => {
  const { cart, isLoading, error, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleContinueShopping = () => {
    window.history.back();
  };

  if (isLoading && !cart) {
    return (
      <Container>
        <Header />
        <Navigation />
        <Content>
          <LoadingSpinner type="ring" size="large" text="장바구니를 불러오는 중..." />
        </Content>
        <Footer />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header />
        <Navigation />
        <Content>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>장바구니를 불러오는데 실패했습니다.</p>
            <button onClick={fetchCart}>다시 시도</button>
          </div>
        </Content>
        <Footer />
      </Container>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <Container>
      <Header />
      <Navigation />
      <Content>
        <Title>장바구니</Title>
        
        {isEmpty ? (
          <EmptyCart>
            <div>🛒</div>
            <EmptyCartMessage>장바구니가 비어있습니다.</EmptyCartMessage>
            <ContinueShoppingButton onClick={handleContinueShopping}>
              쇼핑 계속하기
            </ContinueShoppingButton>
          </EmptyCart>
        ) : (
          <CartSection>
            <CartItemsSection>
              {cart!.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </CartItemsSection>
            
            <CartSummarySection>
              <CartSummary cart={cart!} />
            </CartSummarySection>
          </CartSection>
        )}
      </Content>
      <Footer />
    </Container>
  );
};