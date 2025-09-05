package com.pooroom.domain.board.dto;

import com.pooroom.domain.board.entity.Comment;
import com.pooroom.domain.board.entity.CommentStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class CommentResponse {
    private Long id;
    private Long postId;
    private Long authorId;
    private String authorName;
    private String authorNickname;
    private Long parentId;
    private String content;
    private Integer likeCount;
    private CommentStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CommentResponse> replies;

    public static CommentResponse from(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .postId(comment.getPost().getId())
                .authorId(comment.getAuthor().getId())
                .authorName(comment.getAuthor().getName())
                .authorNickname(comment.getAuthor().getNickname())
                .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                .content(comment.getContent())
                .likeCount(comment.getLikeCount())
                .status(comment.getStatus())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}