import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import {
  Container,
  Content,
  SuccessIcon,
  Title,
  Message,
  OrderInfo,
  InfoRow,
  InfoLabel,
  InfoValue,
  ButtonGroup,
  ContinueShoppingButton,
  OrderHistoryButton,
} from '../styles/pages/orderCompletePage.styles';

interface OrderData {
  shippingAddress: {
    recipient: string;
    phone: string;
    zipcode: string;
    address: string;
    detailAddress?: string;
  };
  paymentMethod: string;
  orderMemo?: string;
}

export const OrderCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData as OrderData;

  // 임시 주문 정보 (실제로는 백엔드에서 받아온 주문 번호와 정보)
  const orderNumber = 'ORDER-' + Date.now();
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'CARD':
        return '신용카드';
      case 'BANK_TRANSFER':
        return '계좌이체';
      case 'VIRTUAL_ACCOUNT':
        return '가상계좌';
      case 'MOBILE_PAYMENT':
        return '간편결제';
      default:
        return method;
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleOrderHistory = () => {
    navigate('/orders');
  };

  if (!orderData) {
    navigate('/');
    return null;
  }

  return (
    <Container>
      <Header />
      <Content>
        <SuccessIcon>🎉</SuccessIcon>
        <Title>주문이 완료되었습니다!</Title>
        <Message>
          주문해 주셔서 감사합니다.<br />
          주문 상품은 빠르게 준비하여 배송해드리겠습니다.
        </Message>

        <OrderInfo>
          <InfoRow>
            <InfoLabel>주문번호</InfoLabel>
            <InfoValue>{orderNumber}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>배송지</InfoLabel>
            <InfoValue>
              {orderData.shippingAddress.recipient}<br />
              {orderData.shippingAddress.phone}<br />
              ({orderData.shippingAddress.zipcode}) {orderData.shippingAddress.address}
              {orderData.shippingAddress.detailAddress && 
                ` ${orderData.shippingAddress.detailAddress}`}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>결제방법</InfoLabel>
            <InfoValue>{getPaymentMethodName(orderData.paymentMethod)}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>예상 배송일</InfoLabel>
            <InfoValue>{estimatedDelivery}</InfoValue>
          </InfoRow>

          {orderData.orderMemo && (
            <InfoRow>
              <InfoLabel>주문메모</InfoLabel>
              <InfoValue>{orderData.orderMemo}</InfoValue>
            </InfoRow>
          )}
        </OrderInfo>

        <ButtonGroup>
          <ContinueShoppingButton onClick={handleContinueShopping}>
            쇼핑 계속하기
          </ContinueShoppingButton>
          <OrderHistoryButton onClick={handleOrderHistory}>
            주문 내역 보기
          </OrderHistoryButton>
        </ButtonGroup>
      </Content>
      <Footer />
    </Container>
  );
};