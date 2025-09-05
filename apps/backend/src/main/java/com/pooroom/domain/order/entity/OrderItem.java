package com.pooroom.domain.order.entity;

import com.pooroom.domain.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_items")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "product_name", nullable = false, length = 200)
    private String productName;

    @Column(name = "brand_name", nullable = false, length = 100)
    private String brandName;

    @Column(name = "category_name", nullable = false, length = 50)
    private String categoryName;

    @Column(name = "product_sku", length = 50)
    private String productSku;

    @Column(name = "product_image_url", length = 500)
    private String productImageUrl;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "total_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        calculateTotalPrice();
    }

    public void assignToOrder(Order order) {
        this.order = order;
    }

    public void calculateTotalPrice() {
        if (unitPrice != null && quantity != null) {
            this.totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
        }
    }

    public static OrderItem createFromProduct(Product product, Integer quantity) {
        return OrderItem.builder()
                .product(product)
                .productName(product.getName())
                .brandName(product.getBrand().getName())
                .categoryName(product.getCategory().getName())
                .productSku(product.getSku())
                .productImageUrl(product.getMainImageUrl())
                .quantity(quantity)
                .unitPrice(product.getEffectivePrice())
                .build();
    }
}