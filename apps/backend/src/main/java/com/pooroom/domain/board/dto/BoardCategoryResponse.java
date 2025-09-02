package com.pooroom.domain.board.dto;

import com.pooroom.domain.board.entity.BoardCategory;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BoardCategoryResponse {
    private Long id;
    private String name;
    private String description;
    private Boolean isActive;
    private Integer sortOrder;
    private Boolean adminOnly;
    private LocalDateTime createdAt;

    public static BoardCategoryResponse from(BoardCategory category) {
        return BoardCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .isActive(category.getIsActive())
                .sortOrder(category.getSortOrder())
                .adminOnly(category.getAdminOnly())
                .createdAt(category.getCreatedAt())
                .build();
    }
}