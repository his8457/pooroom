package com.pooroom.domain.board.entity;

import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.product.entity.Product;
import com.pooroom.domain.order.entity.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private BoardCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "view_count", nullable = false)
    private Integer viewCount;

    @Column(name = "like_count", nullable = false)
    private Integer likeCount;

    @Column(name = "comment_count", nullable = false)
    private Integer commentCount;

    @Column(name = "is_pinned", nullable = false)
    private Boolean isPinned;

    @Column(name = "is_hidden", nullable = false)
    private Boolean isHidden;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostStatus status;

    @Column(name = "is_answered", nullable = false)
    private Boolean isAnswered;

    @Column(name = "is_secret", nullable = false)
    private Boolean isSecret;

    @Column(name = "rating")
    private Byte rating;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (viewCount == null) viewCount = 0;
        if (likeCount == null) likeCount = 0;
        if (commentCount == null) commentCount = 0;
        if (isPinned == null) isPinned = false;
        if (isHidden == null) isHidden = false;
        if (status == null) status = PostStatus.ACTIVE;
        if (isAnswered == null) isAnswered = false;
        if (isSecret == null) isSecret = false;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void increaseViewCount() {
        this.viewCount++;
        this.updatedAt = LocalDateTime.now();
    }

    public void increaseLikeCount() {
        this.likeCount++;
        this.updatedAt = LocalDateTime.now();
    }

    public void decreaseLikeCount() {
        if (this.likeCount > 0) {
            this.likeCount--;
            this.updatedAt = LocalDateTime.now();
        }
    }

    public void increaseCommentCount() {
        this.commentCount++;
        this.updatedAt = LocalDateTime.now();
    }

    public void decreaseCommentCount() {
        if (this.commentCount > 0) {
            this.commentCount--;
            this.updatedAt = LocalDateTime.now();
        }
    }

    public void updateContent(String title, String content) {
        this.title = title;
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }

    public void markAsAnswered() {
        this.isAnswered = true;
        this.updatedAt = LocalDateTime.now();
    }

    public void hide() {
        this.isHidden = true;
        this.status = PostStatus.HIDDEN;
        this.updatedAt = LocalDateTime.now();
    }

    public void delete() {
        this.status = PostStatus.DELETED;
        this.updatedAt = LocalDateTime.now();
    }
}