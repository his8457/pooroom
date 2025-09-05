package com.pooroom.domain.product.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.common.service.CacheService;
import com.pooroom.domain.product.entity.Category;
import com.pooroom.domain.product.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CacheService cacheService;
    
    private static final Duration CATEGORY_CACHE_DURATION = Duration.ofHours(1);

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public Category findByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @SuppressWarnings("unchecked")
    public List<Category> findAllActiveCategories() {
        // 캐시에서 먼저 조회
        Object cachedCategories = cacheService.getCachedCategories();
        if (cachedCategories instanceof List) {
            log.debug("카테고리 목록 캐시에서 조회");
            return (List<Category>) cachedCategories;
        }
        
        // DB에서 조회
        List<Category> categories = categoryRepository.findByIsActiveOrderBySortOrder(true);
        
        // 캐시에 저장
        cacheService.cacheCategories(categories, CATEGORY_CACHE_DURATION);
        log.debug("카테고리 목록 DB에서 조회 후 캐시 저장: count={}", categories.size());
        
        return categories;
    }

    public List<Category> findRootCategories() {
        return categoryRepository.findRootCategories(true);
    }

    public List<Category> findChildCategories(Long parentId) {
        return categoryRepository.findChildCategories(parentId, true);
    }

    public List<Category> findByLevel(Integer level) {
        return categoryRepository.findByLevel(level, true);
    }

    public boolean existsByName(String name) {
        return categoryRepository.existsByName(name);
    }

    public boolean hasChildren(Long categoryId) {
        return categoryRepository.countChildCategories(categoryId) > 0;
    }
}