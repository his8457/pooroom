package com.pooroom.domain.board.dto;

import com.pooroom.domain.board.entity.Post;
import com.pooroom.domain.board.entity.PostStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostResponse {
    private Long id;
    private Long categoryId;
    private String categoryName;
    private Long authorId;
    private String authorName;
    private String authorNickname;
    private Long productId;
    private String productName;
    private String title;
    private String content;
    private Integer viewCount;
    private Integer likeCount;
    private Integer commentCount;
    private Boolean isPinned;
    private Boolean isHidden;
    private PostStatus status;
    private Boolean isAnswered;
    private Boolean isSecret;
    private Byte rating;
    private Long orderId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostResponse from(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .categoryId(post.getCategory().getId())
                .categoryName(post.getCategory().getName())
                .authorId(post.getAuthor().getId())
                .authorName(post.getAuthor().getName())
                .authorNickname(post.getAuthor().getNickname())
                .productId(post.getProduct() != null ? post.getProduct().getId() : null)
                .productName(post.getProduct() != null ? post.getProduct().getName() : null)
                .title(post.getTitle())
                .content(post.getContent())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .commentCount(post.getCommentCount())
                .isPinned(post.getIsPinned())
                .isHidden(post.getIsHidden())
                .status(post.getStatus())
                .isAnswered(post.getIsAnswered())
                .isSecret(post.getIsSecret())
                .rating(post.getRating())
                .orderId(post.getOrder() != null ? post.getOrder().getId() : null)
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    public static PostResponse fromSummary(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .categoryId(post.getCategory().getId())
                .categoryName(post.getCategory().getName())
                .authorId(post.getAuthor().getId())
                .authorName(post.getAuthor().getName())
                .authorNickname(post.getAuthor().getNickname())
                .title(post.getTitle())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .commentCount(post.getCommentCount())
                .isPinned(post.getIsPinned())
                .isAnswered(post.getIsAnswered())
                .isSecret(post.getIsSecret())
                .rating(post.getRating())
                .createdAt(post.getCreatedAt())
                .build();
    }
}