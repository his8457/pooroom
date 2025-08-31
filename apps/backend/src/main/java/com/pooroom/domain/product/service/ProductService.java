package com.pooroom.domain.product.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.domain.product.entity.Product;
import com.pooroom.domain.product.entity.ProductStatus;
import com.pooroom.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public Product findBySku(String sku) {
        return productRepository.findBySku(sku)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public Page<Product> findAllActiveProducts(Pageable pageable) {
        return productRepository.findByStatus(ProductStatus.ACTIVE, pageable);
    }

    public Page<Product> findFeaturedProducts(Pageable pageable) {
        return productRepository.findByStatusAndIsFeatured(ProductStatus.ACTIVE, true, pageable);
    }

    public Page<Product> findProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findActiveProductsByCategory(ProductStatus.ACTIVE, categoryId, pageable);
    }

    public Page<Product> findProductsByBrand(Long brandId, Pageable pageable) {
        return productRepository.findActiveProductsByBrand(ProductStatus.ACTIVE, brandId, pageable);
    }

    public Page<Product> searchProducts(String keyword, Pageable pageable) {
        return productRepository.searchProducts(keyword, pageable);
    }

    public Page<Product> findProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        return productRepository.findByPriceRange(minPrice, maxPrice, pageable);
    }

    public Page<Product> findByCategoryAndPriceRange(Long categoryId, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        return productRepository.findByCategoryAndPriceRange(categoryId, minPrice, maxPrice, pageable);
    }

    public List<Product> findNewProducts() {
        return productRepository.findTop10ByStatusOrderByCreatedAtDesc(ProductStatus.ACTIVE);
    }

    public List<Product> findRecommendedProducts() {
        return productRepository.findTop10ByStatusAndIsFeaturedOrderByCreatedAtDesc(ProductStatus.ACTIVE, true);
    }

    public boolean existsBySku(String sku) {
        return productRepository.existsBySku(sku);
    }

    public long countActiveProducts() {
        return productRepository.countByStatus(ProductStatus.ACTIVE);
    }
}