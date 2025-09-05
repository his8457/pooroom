package com.pooroom.domain.order.repository;

import com.pooroom.domain.order.entity.Order;
import com.pooroom.domain.order.entity.OrderStatus;
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
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(String orderNumber);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems oi LEFT JOIN FETCH oi.product WHERE o.id = :orderId")
    Optional<Order> findByIdWithItems(@Param("orderId") Long orderId);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.user.id = :userId ORDER BY o.createdAt DESC")
    Page<Order> findByUserIdWithItems(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.createdAt DESC")
    Page<Order> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.orderStatus = :status ORDER BY o.createdAt DESC")
    Page<Order> findByUserIdAndOrderStatus(@Param("userId") Long userId, 
                                         @Param("status") OrderStatus status, 
                                         Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.orderStatus = :status ORDER BY o.createdAt DESC")
    Page<Order> findByOrderStatus(@Param("status") OrderStatus status, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :startDate AND :endDate ORDER BY o.createdAt DESC")
    Page<Order> findByOrderDateBetween(@Param("startDate") LocalDateTime startDate, 
                                     @Param("endDate") LocalDateTime endDate, 
                                     Pageable pageable);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId AND o.orderStatus = :status")
    Long countByUserIdAndOrderStatus(@Param("userId") Long userId, @Param("status") OrderStatus status);

    @Query("SELECT o FROM Order o WHERE o.orderStatus IN :statuses ORDER BY o.createdAt ASC")
    List<Order> findByOrderStatusIn(@Param("statuses") List<OrderStatus> statuses);

    boolean existsByOrderNumber(String orderNumber);
}