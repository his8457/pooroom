package com.pooroom.domain.product.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.domain.product.entity.Category;
import com.pooroom.domain.product.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public Category findByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public List<Category> findAllActiveCategories() {
        return categoryRepository.findByIsActiveOrderBySortOrder(true);
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