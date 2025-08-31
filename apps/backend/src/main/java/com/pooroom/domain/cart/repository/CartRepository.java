package com.pooroom.domain.cart.repository;

import com.pooroom.domain.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    @Query("SELECT c FROM Cart c LEFT JOIN FETCH c.cartItems ci LEFT JOIN FETCH ci.product p " +
           "LEFT JOIN FETCH p.brand LEFT JOIN FETCH p.category WHERE c.user.id = :userId")
    Optional<Cart> findByUserIdWithItems(@Param("userId") Long userId);

    @Query("SELECT COUNT(ci) FROM Cart c JOIN c.cartItems ci WHERE c.user.id = :userId")
    int countItemsByUserId(@Param("userId") Long userId);

    void deleteByUserId(Long userId);
}