package com.pooroom.domain.board.repository;

import com.pooroom.domain.board.entity.Comment;
import com.pooroom.domain.board.entity.CommentStatus;
import com.pooroom.domain.board.entity.Post;
import com.pooroom.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.post = :post AND c.status = :status AND c.parent IS NULL ORDER BY c.createdAt ASC")
    List<Comment> findByPostAndStatusAndParentIsNullOrderByCreatedAtAsc(
        @Param("post") Post post, 
        @Param("status") CommentStatus status);

    @Query("SELECT c FROM Comment c WHERE c.parent = :parent AND c.status = :status ORDER BY c.createdAt ASC")
    List<Comment> findByParentAndStatusOrderByCreatedAtAsc(
        @Param("parent") Comment parent, 
        @Param("status") CommentStatus status);

    @Query("SELECT c FROM Comment c WHERE c.author = :author AND c.status = :status ORDER BY c.createdAt DESC")
    Page<Comment> findByAuthorAndStatusOrderByCreatedAtDesc(
        @Param("author") User author, 
        @Param("status") CommentStatus status, 
        Pageable pageable);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post = :post AND c.status = :status")
    Long countByPostAndStatus(@Param("post") Post post, @Param("status") CommentStatus status);
}