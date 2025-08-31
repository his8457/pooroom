package com.pooroom.domain.product.dto;

import com.pooroom.domain.product.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 카테고리 정보 응답 DTO
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {
    
    private Long id;
    private String name;
    private Integer level;
    private Integer sortOrder;
    private String description;
    private Boolean isActive;
    private LocalDateTime createdAt;
    
    // 계층형 구조
    private CategorySummary parent;
    private List<CategorySummary> children;
    
    // 계산된 필드
    private Boolean hasChildren;

    public static CategoryResponse from(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .level(category.getLevel())
                .sortOrder(category.getSortOrder())
                .description(category.getDescription())
                .isActive(category.getIsActive())
                .createdAt(category.getCreatedAt())
                .parent(category.getParent() != null ? CategorySummary.from(category.getParent()) : null)
                .children(category.getChildren().stream()
                        .map(CategorySummary::from)
                        .collect(Collectors.toList()))
                .hasChildren(category.hasChildren())
                .build();
    }
    
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategorySummary {
        private Long id;
        private String name;
        private Integer level;
        
        public static CategorySummary from(Category category) {
            return CategorySummary.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .level(category.getLevel())
                    .build();
        }
    }
}