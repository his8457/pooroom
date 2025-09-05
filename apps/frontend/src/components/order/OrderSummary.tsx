import React from 'react';
import {
  Container,
  ItemsSection,
  OrderItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  ItemQuantity,
  MemoSection,
  MemoLabel,
  MemoTextarea,
  PriceSection,
  PriceRow,
  PriceLabel,
  PriceValue,
  TotalPrice,
} from '../../styles/components/orderSummary.styles';

import type { Cart } from '../../api/cartService';

interface Props {
  cart: Cart;
  orderMemo: string;
  onOrderMemoChange: (memo: string) => void;
}

export const OrderSummary: React.FC<Props> = ({ 
  cart, 
  orderMemo, 
  onOrderMemoChange 
}) => {
  const shippingFee = cart.totalPrice >= 50000 ? 0 : 3000;
  const finalTotalPrice = cart.totalPrice + shippingFee;

  return (
    <Container>
      <ItemsSection>
        {cart.items.map((item) => (
          <OrderItem key={item.id}>
            <ItemImage>
              {item.product.mainImageUrl || item.product.unsplashImageUrl ? (
                <img 
                  src={item.product.mainImageUrl || item.product.unsplashImageUrl} 
                  alt={item.product.name} 
                />
              ) : (
                <div />
              )}
            </ItemImage>
            
            <ItemInfo>
              <ItemName>{item.product.name}</ItemName>
              <ItemPrice>{item.totalPrice.toLocaleString()}원</ItemPrice>
              <ItemQuantity>수량: {item.quantity}개</ItemQuantity>
            </ItemInfo>
          </OrderItem>
        ))}
      </ItemsSection>

      <MemoSection>
        <MemoLabel>주문 메모 (선택사항)</MemoLabel>
        <MemoTextarea
          value={orderMemo}
          onChange={(e) => onOrderMemoChange(e.target.value)}
          placeholder="배송 시 요청사항을 입력하세요"
          maxLength={200}
        />
      </MemoSection>

      <PriceSection>
        <PriceRow>
          <PriceLabel>상품금액</PriceLabel>
          <PriceValue>{cart.totalPrice.toLocaleString()}원</PriceValue>
        </PriceRow>
        
        <PriceRow>
          <PriceLabel>배송비</PriceLabel>
          <PriceValue>
            {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
          </PriceValue>
        </PriceRow>
        
        <TotalPrice>
          <PriceLabel>최종 결제금액</PriceLabel>
          <PriceValue>{finalTotalPrice.toLocaleString()}원</PriceValue>
        </TotalPrice>
      </PriceSection>
    </Container>
  );
};