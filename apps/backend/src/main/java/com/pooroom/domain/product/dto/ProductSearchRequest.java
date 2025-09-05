package com.pooroom.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * 상품 검색 요청 DTO
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSearchRequest {
    
    private String keyword;              // 검색 키워드
    private Long categoryId;             // 카테고리 필터
    private Long brandId;                // 브랜드 필터
    private BigDecimal minPrice;         // 최소 가격
    private BigDecimal maxPrice;         // 최대 가격
    private Boolean isFeatured;          // 추천 상품 여부
    private String sortBy;               // 정렬 기준 (price, name, createdAt)
    private String sortDirection;        // 정렬 방향 (asc, desc)
    
    @Builder.Default
    private Integer page = 0;            // 페이지 번호
    
    @Builder.Default
    private Integer size = 20;           // 페이지 크기
}