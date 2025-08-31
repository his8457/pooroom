package com.pooroom.domain.product.dto;

import com.pooroom.domain.product.entity.Product;
import com.pooroom.domain.product.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 상품 정보 응답 DTO
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private Integer stockQuantity;
    private String sku;
    private ProductStatus status;
    private Boolean isFeatured;
    private Byte sustainabilityScore;
    private String materialInfo;
    private String sizeGuide;
    private String careInstructions;
    private String mainImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // 연관 엔티티 정보
    private BrandSummary brand;
    private CategorySummary category;
    
    // 계산된 필드
    private Boolean isOnSale;
    private Boolean isInStock;
    private BigDecimal effectivePrice;

    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .stockQuantity(product.getStockQuantity())
                .sku(product.getSku())
                .status(product.getStatus())
                .isFeatured(product.getIsFeatured())
                .sustainabilityScore(product.getSustainabilityScore())
                .materialInfo(product.getMaterialInfo())
                .sizeGuide(product.getSizeGuide())
                .careInstructions(product.getCareInstructions())
                .mainImageUrl(product.getMainImageUrl())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .brand(BrandSummary.from(product.getBrand()))
                .category(CategorySummary.from(product.getCategory()))
                .isOnSale(product.isOnSale())
                .isInStock(product.isInStock())
                .effectivePrice(product.getEffectivePrice())
                .build();
    }
    
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BrandSummary {
        private Long id;
        private String name;
        private String logoUrl;
        
        public static BrandSummary from(com.pooroom.domain.product.entity.Brand brand) {
            return BrandSummary.builder()
                    .id(brand.getId())
                    .name(brand.getName())
                    .logoUrl(brand.getLogoUrl())
                    .build();
        }
    }
    
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategorySummary {
        private Long id;
        private String name;
        private Integer level;
        
        public static CategorySummary from(com.pooroom.domain.product.entity.Category category) {
            return CategorySummary.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .level(category.getLevel())
                    .build();
        }
    }
}