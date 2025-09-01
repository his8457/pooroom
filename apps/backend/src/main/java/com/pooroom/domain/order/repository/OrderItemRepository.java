package com.pooroom.domain.order.repository;

import com.pooroom.domain.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.id = :orderId")
    List<OrderItem> findByOrderId(@Param("orderId") Long orderId);

    @Query("SELECT oi FROM OrderItem oi LEFT JOIN FETCH oi.product WHERE oi.order.id = :orderId")
    List<OrderItem> findByOrderIdWithProduct(@Param("orderId") Long orderId);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.product.id = :productId ORDER BY oi.createdAt DESC")
    List<OrderItem> findByProductId(@Param("productId") Long productId);

    @Query("SELECT COUNT(oi) FROM OrderItem oi WHERE oi.order.id = :orderId")
    Integer countByOrderId(@Param("orderId") Long orderId);

    @Query("SELECT SUM(oi.quantity) FROM OrderItem oi WHERE oi.product.id = :productId")
    Integer getTotalOrderedQuantityByProductId(@Param("productId") Long productId);

    void deleteAllByOrderId(Long orderId);
}