package com.pooroom.domain.order.dto;

import com.pooroom.domain.order.entity.Order;
import com.pooroom.domain.order.entity.OrderStatus;
import com.pooroom.domain.order.entity.PaymentMethod;
import com.pooroom.domain.order.entity.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private Long id;
    private Long userId;
    private String orderNumber;
    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;

    private ShippingInfoDto shippingInfo;
    private OrderAmountDto amountInfo;
    private PaymentMethod paymentMethod;

    private String orderMemo;
    private String adminMemo;

    private List<OrderItemResponse> orderItems;

    private LocalDateTime orderedAt;
    private LocalDateTime paidAt;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime cancelledAt;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ShippingInfoDto {
        private String recipient;
        private String phone;
        private String zipcode;
        private String address;
        private String detailAddress;

        public String getFullAddress() {
            return address + (detailAddress != null ? " " + detailAddress : "");
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderAmountDto {
        private BigDecimal subtotalAmount;
        private BigDecimal shippingFee;
        private BigDecimal discountAmount;
        private BigDecimal totalAmount;
        private Integer totalItemCount;
    }

    public static OrderResponse from(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .orderNumber(order.getOrderNumber())
                .orderStatus(order.getOrderStatus())
                .paymentStatus(order.getPaymentStatus())
                .shippingInfo(ShippingInfoDto.builder()
                        .recipient(order.getShippingRecipient())
                        .phone(order.getShippingPhone())
                        .zipcode(order.getShippingZipcode())
                        .address(order.getShippingAddress())
                        .detailAddress(order.getShippingDetailAddress())
                        .build())
                .amountInfo(OrderAmountDto.builder()
                        .subtotalAmount(order.getSubtotalAmount())
                        .shippingFee(order.getShippingFee())
                        .discountAmount(order.getDiscountAmount())
                        .totalAmount(order.getTotalAmount())
                        .totalItemCount(order.getTotalItemCount())
                        .build())
                .paymentMethod(order.getPaymentMethod())
                .orderMemo(order.getOrderMemo())
                .adminMemo(order.getAdminMemo())
                .orderItems(order.getOrderItems().stream()
                        .map(OrderItemResponse::from)
                        .collect(Collectors.toList()))
                .orderedAt(order.getOrderedAt())
                .paidAt(order.getPaidAt())
                .shippedAt(order.getShippedAt())
                .deliveredAt(order.getDeliveredAt())
                .cancelledAt(order.getCancelledAt())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    public static OrderResponse fromWithoutItems(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .orderNumber(order.getOrderNumber())
                .orderStatus(order.getOrderStatus())
                .paymentStatus(order.getPaymentStatus())
                .shippingInfo(ShippingInfoDto.builder()
                        .recipient(order.getShippingRecipient())
                        .phone(order.getShippingPhone())
                        .zipcode(order.getShippingZipcode())
                        .address(order.getShippingAddress())
                        .detailAddress(order.getShippingDetailAddress())
                        .build())
                .amountInfo(OrderAmountDto.builder()
                        .subtotalAmount(order.getSubtotalAmount())
                        .shippingFee(order.getShippingFee())
                        .discountAmount(order.getDiscountAmount())
                        .totalAmount(order.getTotalAmount())
                        .totalItemCount(order.getTotalItemCount())
                        .build())
                .paymentMethod(order.getPaymentMethod())
                .orderMemo(order.getOrderMemo())
                .orderedAt(order.getOrderedAt())
                .paidAt(order.getPaidAt())
                .shippedAt(order.getShippedAt())
                .deliveredAt(order.getDeliveredAt())
                .cancelledAt(order.getCancelledAt())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}