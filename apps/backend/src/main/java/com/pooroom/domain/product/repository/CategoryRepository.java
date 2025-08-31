package com.pooroom.domain.product.repository;

import com.pooroom.domain.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);
    
    boolean existsByName(String name);

    List<Category> findByIsActiveOrderBySortOrder(Boolean isActive);

    List<Category> findByParentIsNullAndIsActiveOrderBySortOrder(Boolean isActive);

    List<Category> findByParentIdAndIsActiveOrderBySortOrder(Long parentId, Boolean isActive);

    @Query("SELECT c FROM Category c WHERE c.parent IS NULL AND c.isActive = :isActive ORDER BY c.sortOrder")
    List<Category> findRootCategories(@Param("isActive") Boolean isActive);

    @Query("SELECT c FROM Category c WHERE c.parent.id = :parentId AND c.isActive = :isActive ORDER BY c.sortOrder")
    List<Category> findChildCategories(@Param("parentId") Long parentId, @Param("isActive") Boolean isActive);

    @Query("SELECT c FROM Category c WHERE c.level = :level AND c.isActive = :isActive ORDER BY c.sortOrder")
    List<Category> findByLevel(@Param("level") Integer level, @Param("isActive") Boolean isActive);

    @Query("SELECT COUNT(c) FROM Category c WHERE c.parent.id = :parentId")
    long countChildCategories(@Param("parentId") Long parentId);
}