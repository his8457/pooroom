package com.pooroom.domain.board.repository;

import com.pooroom.domain.board.entity.Post;
import com.pooroom.domain.board.entity.PostStatus;
import com.pooroom.domain.board.entity.BoardCategory;
import com.pooroom.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.category = :category AND p.status = :status ORDER BY p.isPinned DESC, p.createdAt DESC")
    Page<Post> findByCategoryAndStatusOrderByPinnedAndCreatedAt(
        @Param("category") BoardCategory category, 
        @Param("status") PostStatus status, 
        Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.status = :status ORDER BY p.isPinned DESC, p.createdAt DESC")
    Page<Post> findByStatusOrderByPinnedAndCreatedAt(@Param("status") PostStatus status, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.author = :author AND p.status = :status ORDER BY p.createdAt DESC")
    Page<Post> findByAuthorAndStatusOrderByCreatedAtDesc(
        @Param("author") User author, 
        @Param("status") PostStatus status, 
        Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.id = :id AND p.status = :status")
    Optional<Post> findByIdAndStatus(@Param("id") Long id, @Param("status") PostStatus status);

    @Query("SELECT p FROM Post p WHERE p.category = :category AND p.status = :status AND " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.content) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY p.isPinned DESC, p.createdAt DESC")
    Page<Post> findByCategoryAndStatusAndTitleOrContentContainingIgnoreCase(
        @Param("category") BoardCategory category,
        @Param("status") PostStatus status,
        @Param("keyword") String keyword,
        Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.product.id = :productId AND p.status = :status ORDER BY p.createdAt DESC")
    Page<Post> findByProductIdAndStatusOrderByCreatedAtDesc(
        @Param("productId") Long productId, 
        @Param("status") PostStatus status, 
        Pageable pageable);

    @Query("SELECT COUNT(p) FROM Post p WHERE p.category = :category AND p.status = :status")
    Long countByCategoryAndStatus(@Param("category") BoardCategory category, @Param("status") PostStatus status);
}