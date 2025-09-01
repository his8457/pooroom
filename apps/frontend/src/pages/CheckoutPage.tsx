import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AddressSelector } from '../components/order/AddressSelector';
import { PaymentSelector } from '../components/order/PaymentSelector';
import { OrderSummary } from '../components/order/OrderSummary';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  Container,
  Content,
  Title,
  Section,
  SectionTitle,
  OrderButton,
  LoadingSection,
} from '../styles/pages/checkoutPage.styles';

export interface ShippingAddress {
  recipient: string;
  phone: string;
  zipcode: string;
  address: string;
  detailAddress?: string;
}

export interface PaymentMethod {
  method: 'CARD' | 'BANK_TRANSFER' | 'VIRTUAL_ACCOUNT' | 'MOBILE_PAYMENT';
  displayName: string;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, fetchCart, isLoading } = useCartStore();
  
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [orderMemo, setOrderMemo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (cart && cart.items.length === 0) {
      toast.error('장바구니가 비어있습니다.');
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleAddressSelect = (address: ShippingAddress) => {
    setSelectedAddress(address);
  };

  const handlePaymentMethodSelect = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handleOrderSubmit = async () => {
    if (!selectedAddress) {
      toast.error('배송지를 선택해주세요.');
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error('결제 방법을 선택해주세요.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // TODO: 주문 생성 API 호출
      const orderData = {
        shippingAddress: selectedAddress,
        paymentMethod: selectedPaymentMethod.method,
        orderMemo: orderMemo.trim() || undefined,
      };

      console.log('주문 데이터:', orderData);
      
      // 임시로 성공 처리
      toast.success('주문이 완료되었습니다! 🎉');
      navigate('/order-complete', { state: { orderData } });
      
    } catch (error) {
      console.error('주문 처리 실패:', error);
      toast.error('주문 처리에 실패했습니다. 😢');
    } finally {
      setIsProcessing(false);
    }
  };

  const isOrderValid = selectedAddress && selectedPaymentMethod && cart && cart.items.length > 0;

  if (isLoading) {
    return (
      <Container>
        <Header />
        <Content>
          <LoadingSection>
            <LoadingSpinner type="ring" size="large" />
          </LoadingSection>
        </Content>
        <Footer />
      </Container>
    );
  }

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <Container>
      <Header />
      <Content>
        <Title>주문서 작성</Title>

        <Section>
          <SectionTitle>배송지 정보</SectionTitle>
          <AddressSelector 
            onAddressSelect={handleAddressSelect}
            selectedAddress={selectedAddress}
          />
        </Section>

        <Section>
          <SectionTitle>주문 상품</SectionTitle>
          <OrderSummary 
            cart={cart}
            orderMemo={orderMemo}
            onOrderMemoChange={setOrderMemo}
          />
        </Section>

        <Section>
          <SectionTitle>결제 방법</SectionTitle>
          <PaymentSelector 
            onPaymentMethodSelect={handlePaymentMethodSelect}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        </Section>

        <OrderButton
          onClick={handleOrderSubmit}
          disabled={!isOrderValid || isProcessing}
        >
          {isProcessing ? (
            <LoadingSpinner type="dots" size="small" showText={false} />
          ) : (
            `${cart.totalPrice?.toLocaleString()}원 결제하기`
          )}
        </OrderButton>
      </Content>
      <Footer />
    </Container>
  );
};