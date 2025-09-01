package com.pooroom.domain.order.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "payment_key", unique = true, length = 200)
    private String paymentKey;

    @Column(name = "transaction_id", length = 200)
    private String transactionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "pg_provider")
    private PgProvider pgProvider;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "currency", length = 3)
    @Builder.Default
    private String currency = "KRW";

    @Column(name = "card_company", length = 50)
    private String cardCompany;

    @Column(name = "card_number_masked", length = 20)
    private String cardNumberMasked;

    @Enumerated(EnumType.STRING)
    @Column(name = "card_type")
    private CardType cardType;

    @Column(name = "virtual_account_bank", length = 50)
    private String virtualAccountBank;

    @Column(name = "virtual_account_number", length = 50)
    private String virtualAccountNumber;

    @Column(name = "virtual_account_holder", length = 50)
    private String virtualAccountHolder;

    @Column(name = "virtual_account_due_date")
    private LocalDateTime virtualAccountDueDate;

    @Column(name = "requested_at", nullable = false)
    private LocalDateTime requestedAt;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @Column(name = "failed_at")
    private LocalDateTime failedAt;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    @Column(name = "failure_reason", length = 500)
    private String failureReason;

    @Column(name = "cancel_reason", length = 500)
    private String cancelReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (requestedAt == null) {
            requestedAt = LocalDateTime.now();
        }
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void updateStatus(PaymentStatus newStatus) {
        this.paymentStatus = newStatus;
        this.updatedAt = LocalDateTime.now();

        switch (newStatus) {
            case PAID -> this.approvedAt = LocalDateTime.now();
            case FAILED -> this.failedAt = LocalDateTime.now();
            case CANCELLED -> this.cancelledAt = LocalDateTime.now();
        }

        if (order != null) {
            order.updatePaymentStatus(newStatus);
        }
    }

    public void updatePgInfo(String paymentKey, String transactionId, PgProvider pgProvider) {
        this.paymentKey = paymentKey;
        this.transactionId = transactionId;
        this.pgProvider = pgProvider;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateCardInfo(String cardCompany, String cardNumberMasked, CardType cardType) {
        this.cardCompany = cardCompany;
        this.cardNumberMasked = cardNumberMasked;
        this.cardType = cardType;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateVirtualAccountInfo(String bank, String accountNumber, String holder, LocalDateTime dueDate) {
        this.virtualAccountBank = bank;
        this.virtualAccountNumber = accountNumber;
        this.virtualAccountHolder = holder;
        this.virtualAccountDueDate = dueDate;
        this.updatedAt = LocalDateTime.now();
    }

    public void setFailureReason(String reason) {
        this.failureReason = reason;
        this.updatedAt = LocalDateTime.now();
    }

    public void setCancelReason(String reason) {
        this.cancelReason = reason;
        this.updatedAt = LocalDateTime.now();
    }

    public boolean isSuccessful() {
        return paymentStatus.isSuccessful();
    }

    public boolean canCancel() {
        return paymentStatus.canCancel();
    }

    public boolean canRefund() {
        return paymentStatus.canRefund();
    }
}