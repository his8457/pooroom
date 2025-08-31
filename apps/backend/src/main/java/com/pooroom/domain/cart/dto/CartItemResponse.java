package com.pooroom.domain.cart.dto;

import com.pooroom.domain.cart.entity.CartItem;
import com.pooroom.domain.product.dto.ProductResponse;
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
public class CartItemResponse {
    
    private Long id;
    private Long cartId;
    private ProductSummary product;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CartItemResponse from(CartItem cartItem) {
        return CartItemResponse.builder()
                .id(cartItem.getId())
                .cartId(cartItem.getCart().getId())
                .product(ProductSummary.from(cartItem.getProduct()))
                .quantity(cartItem.getQuantity())
                .unitPrice(cartItem.getUnitPrice())
                .totalPrice(cartItem.getTotalPrice())
                .createdAt(cartItem.getCreatedAt())
                .updatedAt(cartItem.getUpdatedAt())
                .build();
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductSummary {
        private Long id;
        private String name;
        private BigDecimal currentPrice;
        private BigDecimal discountPrice;
        private Integer stockQuantity;
        private String mainImageUrl;
        private String unsplashImageUrl;
        private Boolean isOnSale;
        private Boolean isInStock;
        private ProductResponse.BrandSummary brand;
        private ProductResponse.CategorySummary category;
        
        public static ProductSummary from(com.pooroom.domain.product.entity.Product product) {
            return ProductSummary.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .currentPrice(product.getPrice())
                    .discountPrice(product.getDiscountPrice())
                    .stockQuantity(product.getStockQuantity())
                    .mainImageUrl(product.getMainImageUrl())
                    .isOnSale(product.isOnSale())
                    .isInStock(product.isInStock())
                    .brand(ProductResponse.BrandSummary.from(product.getBrand()))
                    .category(ProductResponse.CategorySummary.from(product.getCategory()))
                    .build();
        }
    }
}