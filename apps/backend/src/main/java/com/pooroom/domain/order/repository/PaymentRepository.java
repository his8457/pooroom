package com.pooroom.domain.order.repository;

import com.pooroom.domain.order.entity.Payment;
import com.pooroom.domain.order.entity.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrderId(Long orderId);

    Optional<Payment> findByPaymentKey(String paymentKey);

    Optional<Payment> findByTransactionId(String transactionId);

    @Query("SELECT p FROM Payment p WHERE p.order.user.id = :userId ORDER BY p.createdAt DESC")
    Page<Payment> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT p FROM Payment p WHERE p.paymentStatus = :status ORDER BY p.createdAt DESC")
    Page<Payment> findByPaymentStatus(@Param("status") PaymentStatus status, Pageable pageable);

    @Query("SELECT p FROM Payment p WHERE p.requestedAt BETWEEN :startDate AND :endDate ORDER BY p.createdAt DESC")
    Page<Payment> findByRequestedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                         @Param("endDate") LocalDateTime endDate, 
                                         Pageable pageable);

    @Query("SELECT p FROM Payment p WHERE p.paymentStatus IN :statuses ORDER BY p.requestedAt ASC")
    List<Payment> findByPaymentStatusIn(@Param("statuses") List<PaymentStatus> statuses);

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentStatus = :status")
    Long countByPaymentStatus(@Param("status") PaymentStatus status);

    boolean existsByPaymentKey(String paymentKey);

    boolean existsByTransactionId(String transactionId);
}