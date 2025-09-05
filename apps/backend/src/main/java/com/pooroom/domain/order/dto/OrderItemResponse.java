package com.pooroom.domain.order.dto;

import com.pooroom.domain.order.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponse {

    private Long id;
    private Long orderId;
    private Long productId;

    private String productName;
    private String brandName;
    private String categoryName;
    private String productSku;
    private String productImageUrl;

    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;

    private LocalDateTime createdAt;

    public static OrderItemResponse from(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .id(orderItem.getId())
                .orderId(orderItem.getOrder().getId())
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProductName())
                .brandName(orderItem.getBrandName())
                .categoryName(orderItem.getCategoryName())
                .productSku(orderItem.getProductSku())
                .productImageUrl(orderItem.getProductImageUrl())
                .quantity(orderItem.getQuantity())
                .unitPrice(orderItem.getUnitPrice())
                .totalPrice(orderItem.getTotalPrice())
                .createdAt(orderItem.getCreatedAt())
                .build();
    }
}