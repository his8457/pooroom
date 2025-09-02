import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { colors } from '../../styles/common.styles';
import {
  OrderHistoryContainer,
  FilterSection,
  FilterButton,
  OrderList,
  OrderItem,
  OrderHeader,
  OrderNumber,
  OrderDate,
  OrderStatus,
  OrderProducts,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductQuantity,
  OrderTotal,
  ActionButtons,
  ViewDetailButton,
  CancelButton,
  EmptyState,
} from '../../styles/components/orderHistory.styles';

type OrderStatusFilter = 'ALL' | 'PENDING' | 'PAID' | 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface Order {
  id: number;
  orderNumber: string;
  orderStatus: string;
  totalAmount: number;
  orderedAt: string;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  productName: string;
  brandName: string;
  productImageUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export const OrderHistory: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('ALL');

  // 임시 데이터 - 백엔드 API 구현 후 실제 데이터로 교체
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', statusFilter],
    queryFn: async () => {
      // 임시 데이터
      const mockOrders: Order[] = [
        {
          id: 1,
          orderNumber: 'PO2024120001',
          orderStatus: 'DELIVERED',
          totalAmount: 89000,
          orderedAt: '2024-12-01T10:30:00',
          items: [
            {
              id: 1,
              productName: '베이직 코튼 블라우스',
              brandName: 'POOROOM',
              quantity: 1,
              unitPrice: 45000,
              totalPrice: 45000,
            },
            {
              id: 2,
              productName: '슬림핏 데님 팬츠',
              brandName: 'POOROOM',
              quantity: 1,
              unitPrice: 44000,
              totalPrice: 44000,
            },
          ],
        },
      ];
      return mockOrders;
    },
  });

  const statusOptions = [
    { key: 'ALL' as const, label: '전체' },
    { key: 'PENDING' as const, label: '결제대기' },
    { key: 'PAID' as const, label: '결제완료' },
    { key: 'PREPARING' as const, label: '상품준비중' },
    { key: 'SHIPPED' as const, label: '배송중' },
    { key: 'DELIVERED' as const, label: '배송완료' },
    { key: 'CANCELLED' as const, label: '주문취소' },
  ];

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: '결제대기',
      PAID: '결제완료',
      PREPARING: '상품준비중',
      SHIPPED: '배송중',
      DELIVERED: '배송완료',
      CANCELLED: '주문취소',
      REFUNDED: '환불완료',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      PENDING: '#f59e0b',
      PAID: '#10b981',
      PREPARING: '#3b82f6',
      SHIPPED: '#8b5cf6',
      DELIVERED: '#059669',
      CANCELLED: '#ef4444',
      REFUNDED: '#6b7280',
    };
    return colorMap[status] || '#6b7280';
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <LoadingSpinner type="ring" size="large" showText={true} text="주문 내역을 불러오는 중..." />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <OrderHistoryContainer>
        <h3>주문 내역</h3>
        <EmptyState>
          <p>주문 내역이 없습니다.</p>
          <p>첫 번째 주문을 시작해보세요! 🛍️</p>
        </EmptyState>
      </OrderHistoryContainer>
    );
  }

  return (
    <OrderHistoryContainer>
      <h3>주문 내역</h3>
      
      <FilterSection>
        {statusOptions.map((option) => (
          <FilterButton
            key={option.key}
            isActive={statusFilter === option.key}
            onClick={() => setStatusFilter(option.key)}
          >
            {option.label}
          </FilterButton>
        ))}
      </FilterSection>

      <OrderList>
        {orders.map((order) => (
          <OrderItem key={order.id}>
            <OrderHeader>
              <div>
                <OrderNumber>주문번호: {order.orderNumber}</OrderNumber>
                <OrderDate>{new Date(order.orderedAt).toLocaleDateString()}</OrderDate>
              </div>
              <OrderStatus color={getStatusColor(order.orderStatus)}>
                {getStatusText(order.orderStatus)}
              </OrderStatus>
            </OrderHeader>

            <OrderProducts>
              {order.items.map((item) => (
                <ProductItem key={item.id}>
                  <ProductImage>
                    {item.productImageUrl ? (
                      <img src={item.productImageUrl} alt={item.productName} />
                    ) : (
                      <div>📷</div>
                    )}
                  </ProductImage>
                  <ProductInfo>
                    <ProductName>{item.productName}</ProductName>
                    <p style={{ color: colors.text.secondary, fontSize: '14px', margin: 0 }}>
                      {item.brandName}
                    </p>
                  </ProductInfo>
                  <ProductQuantity>{item.quantity}개</ProductQuantity>
                  <ProductPrice>{item.totalPrice.toLocaleString()}원</ProductPrice>
                </ProductItem>
              ))}
            </OrderProducts>

            <OrderTotal>
              총 결제금액: {order.totalAmount.toLocaleString()}원
            </OrderTotal>

            <ActionButtons>
              <ViewDetailButton>주문 상세</ViewDetailButton>
              {order.orderStatus === 'PENDING' && (
                <CancelButton>주문 취소</CancelButton>
              )}
            </ActionButtons>
          </OrderItem>
        ))}
      </OrderList>
    </OrderHistoryContainer>
  );
};