package com.pooroom.domain.board.repository;

import com.pooroom.domain.board.entity.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCategoryRepository extends JpaRepository<BoardCategory, Long> {

    @Query("SELECT bc FROM BoardCategory bc WHERE bc.isActive = true ORDER BY bc.sortOrder ASC")
    List<BoardCategory> findAllActiveOrderBySortOrder();

    @Query("SELECT bc FROM BoardCategory bc WHERE bc.isActive = true AND bc.adminOnly = false ORDER BY bc.sortOrder ASC")
    List<BoardCategory> findAllPublicOrderBySortOrder();

    @Query("SELECT bc FROM BoardCategory bc WHERE bc.name = :name AND bc.isActive = true")
    BoardCategory findByNameAndIsActiveTrue(String name);
}