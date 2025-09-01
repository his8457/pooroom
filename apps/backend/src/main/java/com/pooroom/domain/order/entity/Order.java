package com.pooroom.domain.order.entity;

import com.pooroom.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "order_number", nullable = false, unique = true, length = 50)
    private String orderNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false)
    @Builder.Default
    private OrderStatus orderStatus = OrderStatus.PENDING;

    @Column(name = "shipping_recipient", nullable = false, length = 50)
    private String shippingRecipient;

    @Column(name = "shipping_phone", nullable = false, length = 20)
    private String shippingPhone;

    @Column(name = "shipping_zipcode", nullable = false, length = 10)
    private String shippingZipcode;

    @Column(name = "shipping_address", nullable = false, length = 200)
    private String shippingAddress;

    @Column(name = "shipping_detail_address", length = 100)
    private String shippingDetailAddress;

    @Column(name = "subtotal_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotalAmount;

    @Column(name = "shipping_fee", nullable = false, precision = 8, scale = 2)
    @Builder.Default
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Column(name = "discount_amount", nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "order_memo", columnDefinition = "TEXT")
    private String orderMemo;

    @Column(name = "admin_memo", columnDefinition = "TEXT")
    private String adminMemo;

    @Column(name = "ordered_at", nullable = false)
    private LocalDateTime orderedAt;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    @Column(name = "shipped_at")
    private LocalDateTime shippedAt;

    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Payment payment;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Delivery delivery;

    @PrePersist
    protected void onCreate() {
        if (orderNumber == null) {
            orderNumber = generateOrderNumber();
        }
        if (orderedAt == null) {
            orderedAt = LocalDateTime.now();
        }
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.assignToOrder(this);
    }

    public void updateOrderStatus(OrderStatus newStatus) {
        this.orderStatus = newStatus;
        this.updatedAt = LocalDateTime.now();

        switch (newStatus) {
            case PAID -> this.paidAt = LocalDateTime.now();
            case SHIPPED -> this.shippedAt = LocalDateTime.now();
            case DELIVERED -> this.deliveredAt = LocalDateTime.now();
            case CANCELLED -> this.cancelledAt = LocalDateTime.now();
        }
    }

    public void updatePaymentStatus(PaymentStatus newStatus) {
        this.paymentStatus = newStatus;
        this.updatedAt = LocalDateTime.now();

        if (newStatus == PaymentStatus.PAID) {
            this.paidAt = LocalDateTime.now();
            updateOrderStatus(OrderStatus.PAID);
        }
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
        this.updatedAt = LocalDateTime.now();
    }

    public void calculateTotalAmount() {
        this.totalAmount = subtotalAmount
                .add(shippingFee)
                .subtract(discountAmount);
    }

    public int getTotalItemCount() {
        return orderItems.stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();
    }

    public boolean canCancel() {
        return orderStatus.isCancellable();
    }

    public boolean canRefund() {
        return orderStatus.isRefundable();
    }

    public void setShippingInfo(String recipient, String phone, String zipcode, String address, String detailAddress) {
        this.shippingRecipient = recipient;
        this.shippingPhone = phone;
        this.shippingZipcode = zipcode;
        this.shippingAddress = address;
        this.shippingDetailAddress = detailAddress;
        this.updatedAt = LocalDateTime.now();
    }

    public void setAmountInfo(BigDecimal subtotalAmount, BigDecimal shippingFee, BigDecimal discountAmount) {
        this.subtotalAmount = subtotalAmount;
        this.shippingFee = shippingFee;
        this.discountAmount = discountAmount;
        calculateTotalAmount();
    }

    private String generateOrderNumber() {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String uuid = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "ORD" + timestamp.substring(timestamp.length() - 8) + uuid;
    }
}