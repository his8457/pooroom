package com.pooroom.domain.order.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Column(name = "courier_company", length = 50)
    private String courierCompany;

    @Column(name = "tracking_number", length = 50)
    private String trackingNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_status", nullable = false)
    @Builder.Default
    private DeliveryStatus deliveryStatus = DeliveryStatus.PREPARING;

    @Column(name = "estimated_delivery_date")
    private LocalDate estimatedDeliveryDate;

    @Column(name = "actual_delivery_date")
    private LocalDateTime actualDeliveryDate;

    @Column(name = "delivery_memo", columnDefinition = "TEXT")
    private String deliveryMemo;

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

    public void updateDeliveryInfo(String courierCompany, String trackingNumber) {
        this.courierCompany = courierCompany;
        this.trackingNumber = trackingNumber;
        this.deliveryStatus = DeliveryStatus.PICKED_UP;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateStatus(DeliveryStatus newStatus) {
        this.deliveryStatus = newStatus;
        this.updatedAt = LocalDateTime.now();

        if (newStatus == DeliveryStatus.DELIVERED) {
            this.actualDeliveryDate = LocalDateTime.now();
            if (order != null) {
                order.updateOrderStatus(OrderStatus.DELIVERED);
            }
        }
    }

    public void setEstimatedDeliveryDate(LocalDate date) {
        this.estimatedDeliveryDate = date;
        this.updatedAt = LocalDateTime.now();
    }

    public void setDeliveryMemo(String memo) {
        this.deliveryMemo = memo;
        this.updatedAt = LocalDateTime.now();
    }

    public boolean isTrackable() {
        return trackingNumber != null && !trackingNumber.trim().isEmpty();
    }

    public boolean isDelivered() {
        return deliveryStatus == DeliveryStatus.DELIVERED;
    }
}