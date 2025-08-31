package com.pooroom.domain.product.repository;

import com.pooroom.domain.product.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    Optional<Brand> findByName(String name);
    
    boolean existsByName(String name);

    List<Brand> findByIsActiveOrderByName(Boolean isActive);

    @Query("SELECT b FROM Brand b WHERE b.isActive = :isActive ORDER BY b.name")
    List<Brand> findActiveBrands(@Param("isActive") Boolean isActive);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.brand.id = :brandId AND p.status = 'ACTIVE'")
    long countActiveProductsByBrand(@Param("brandId") Long brandId);
}