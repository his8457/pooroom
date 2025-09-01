package com.pooroom.domain.product.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 상품 정보 엔티티
 */
@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "discount_price", precision = 10, scale = 2)
    private BigDecimal discountPrice;

    @Column(name = "cost_price", precision = 10, scale = 2)
    private BigDecimal costPrice;

    @Column(name = "stock_quantity", nullable = false)
    @Builder.Default
    private Integer stockQuantity = 0;

    @Column(length = 50, unique = true)
    private String sku;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ProductStatus status = ProductStatus.ACTIVE;

    @Column(name = "is_featured", nullable = false)
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "sustainability_score")
    @Builder.Default
    private Byte sustainabilityScore = 0;

    @Column(name = "material_info", columnDefinition = "JSON")
    private String materialInfo;

    @Column(name = "size_guide", columnDefinition = "JSON")
    private String sizeGuide;

    @Column(name = "care_instructions", columnDefinition = "TEXT")
    private String careInstructions;

    @Column(name = "main_image_url", length = 500)
    private String mainImageUrl;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void updateBasicInfo(String name, String description, BigDecimal price) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateStock(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
        if (stockQuantity <= 0) {
            this.status = ProductStatus.SOLDOUT;
        } else if (this.status == ProductStatus.SOLDOUT) {
            this.status = ProductStatus.ACTIVE;
        }
        this.updatedAt = LocalDateTime.now();
    }

    public void applyDiscount(BigDecimal discountPrice) {
        this.discountPrice = discountPrice;
        this.updatedAt = LocalDateTime.now();
    }

    public void removeDiscount() {
        this.discountPrice = null;
        this.updatedAt = LocalDateTime.now();
    }

    public void deactivate() {
        this.status = ProductStatus.INACTIVE;
        this.updatedAt = LocalDateTime.now();
    }

    public void activate() {
        this.status = ProductStatus.ACTIVE;
        this.updatedAt = LocalDateTime.now();
    }

    public boolean isOnSale() {
        return discountPrice != null && discountPrice.compareTo(price) < 0;
    }

    public boolean isInStock() {
        return stockQuantity > 0;
    }

    public BigDecimal getEffectivePrice() {
        return isOnSale() ? discountPrice : price;
    }

    public void reduceStock(Integer quantity) {
        if (this.stockQuantity < quantity) {
            throw new IllegalArgumentException("재고가 부족합니다.");
        }
        
        this.stockQuantity -= quantity;
        if (this.stockQuantity <= 0) {
            this.status = ProductStatus.SOLDOUT;
        }
        this.updatedAt = LocalDateTime.now();
    }

    public void increaseStock(Integer quantity) {
        this.stockQuantity += quantity;
        if (this.status == ProductStatus.SOLDOUT && this.stockQuantity > 0) {
            this.status = ProductStatus.ACTIVE;
        }
        this.updatedAt = LocalDateTime.now();
    }
}