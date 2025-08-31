package com.pooroom.domain.cart.entity;

import com.pooroom.domain.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    @Builder.Default
    private Integer quantity = 1;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

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

    public void assignToCart(Cart cart) {
        this.cart = cart;
    }

    public void updateQuantity(Integer quantity) {
        if (quantity < 1) {
            throw new IllegalArgumentException("수량은 1개 이상이어야 합니다.");
        }
        this.quantity = quantity;
        this.updatedAt = LocalDateTime.now();
    }

    public void increaseQuantity(Integer amount) {
        if (amount < 1) {
            throw new IllegalArgumentException("증가 수량은 1개 이상이어야 합니다.");
        }
        this.quantity += amount;
        this.updatedAt = LocalDateTime.now();
    }

    public void decreaseQuantity(Integer amount) {
        if (amount < 1) {
            throw new IllegalArgumentException("감소 수량은 1개 이상이어야 합니다.");
        }
        if (this.quantity <= amount) {
            throw new IllegalArgumentException("수량이 부족합니다.");
        }
        this.quantity -= amount;
        this.updatedAt = LocalDateTime.now();
    }

    public BigDecimal getTotalPrice() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    public boolean isSameProduct(Long productId) {
        return this.product.getId().equals(productId);
    }
}