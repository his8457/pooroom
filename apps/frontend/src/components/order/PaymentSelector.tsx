import React from 'react';
import type { PaymentMethod } from '../../pages/CheckoutPage';
import {
  Container,
  PaymentOption,
  PaymentIcon,
  PaymentInfo,
  PaymentName,
  PaymentDescription,
  RadioButton,
} from '../../styles/components/paymentSelector.styles';

interface Props {
  onPaymentMethodSelect: (paymentMethod: PaymentMethod) => void;
  selectedPaymentMethod: PaymentMethod | null;
}

const paymentMethods: PaymentMethod[] = [
  {
    method: 'CARD',
    displayName: '신용카드',
  },
  {
    method: 'BANK_TRANSFER',
    displayName: '계좌이체',
  },
  {
    method: 'VIRTUAL_ACCOUNT',
    displayName: '가상계좌',
  },
  {
    method: 'MOBILE_PAYMENT',
    displayName: '간편결제',
  },
];

const getPaymentDescription = (method: string) => {
  switch (method) {
    case 'CARD':
      return '신용카드, 체크카드로 결제';
    case 'BANK_TRANSFER':
      return '실시간 계좌이체로 결제';
    case 'VIRTUAL_ACCOUNT':
      return '가상계좌 입금으로 결제';
    case 'MOBILE_PAYMENT':
      return '카카오페이, 네이버페이 등';
    default:
      return '';
  }
};

const getPaymentIcon = (method: string) => {
  switch (method) {
    case 'CARD':
      return '💳';
    case 'BANK_TRANSFER':
      return '🏦';
    case 'VIRTUAL_ACCOUNT':
      return '🏧';
    case 'MOBILE_PAYMENT':
      return '📱';
    default:
      return '💰';
  }
};

export const PaymentSelector: React.FC<Props> = ({ 
  onPaymentMethodSelect, 
  selectedPaymentMethod 
}) => {
  return (
    <Container>
      {paymentMethods.map((payment) => (
        <PaymentOption
          key={payment.method}
          onClick={() => onPaymentMethodSelect(payment)}
          isSelected={selectedPaymentMethod?.method === payment.method}
        >
          <PaymentIcon>
            {getPaymentIcon(payment.method)}
          </PaymentIcon>
          
          <PaymentInfo>
            <PaymentName>{payment.displayName}</PaymentName>
            <PaymentDescription>
              {getPaymentDescription(payment.method)}
            </PaymentDescription>
          </PaymentInfo>
          
          <RadioButton 
            isSelected={selectedPaymentMethod?.method === payment.method}
          >
            <div />
          </RadioButton>
        </PaymentOption>
      ))}
    </Container>
  );
};