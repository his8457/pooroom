package com.pooroom.domain.product.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.common.service.CacheService;
import com.pooroom.domain.product.dto.ProductResponse;
import com.pooroom.domain.product.entity.Product;
import com.pooroom.domain.product.entity.ProductStatus;
import com.pooroom.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final CacheService cacheService;
    
    private static final Duration PRODUCT_CACHE_DURATION = Duration.ofMinutes(30);
    private static final Duration PRODUCT_LIST_CACHE_DURATION = Duration.ofMinutes(10);

    public Product findById(Long id) {
        // 캐시에서 먼저 조회 (DTO 형태로 저장)
        Object cachedProduct = cacheService.getCachedProduct(id);
        if (cachedProduct instanceof ProductResponse) {
            log.debug("상품 캐시에서 조회: productId={}", id);
            // 캐시된 DTO에서 필요한 경우 실제 엔티티를 다시 조회
            return productRepository.findById(id)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        }
        
        // DB에서 조회
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        
        // DTO로 변환하여 캐시에 저장
        ProductResponse productResponse = ProductResponse.from(product);
        cacheService.cacheProduct(id, productResponse, PRODUCT_CACHE_DURATION);
        log.debug("상품 DB에서 조회 후 DTO로 캐시 저장: productId={}", id);
        
        return product;
    }
    
    public ProductResponse findByIdAsDto(Long id) {
        // 캐시에서 먼저 조회
        Object cachedProduct = cacheService.getCachedProduct(id);
        if (cachedProduct instanceof ProductResponse) {
            log.debug("상품 DTO 캐시에서 조회: productId={}", id);
            return (ProductResponse) cachedProduct;
        }
        
        // DB에서 조회 후 DTO 변환
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
        
        ProductResponse productResponse = ProductResponse.from(product);
        
        // DTO로 캐시에 저장
        cacheService.cacheProduct(id, productResponse, PRODUCT_CACHE_DURATION);
        log.debug("상품 DB에서 조회 후 DTO로 캐시 저장: productId={}", id);
        
        return productResponse;
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

    @SuppressWarnings("unchecked")
    public List<Product> findNewProducts() {
        String cacheKey = "newProducts";
        Object cached = cacheService.getCachedProductList(cacheKey);
        if (cached instanceof List) {
            log.debug("신상품 목록 캐시에서 조회");
            return (List<Product>) cached;
        }
        
        List<Product> products = productRepository.findTop10ByStatusOrderByCreatedAtDesc(ProductStatus.ACTIVE);
        cacheService.cacheProductList(cacheKey, products, PRODUCT_LIST_CACHE_DURATION);
        log.debug("신상품 목록 DB에서 조회 후 캐시 저장: count={}", products.size());
        
        return products;
    }

    @SuppressWarnings("unchecked")
    public List<Product> findRecommendedProducts() {
        String cacheKey = "recommendedProducts";
        Object cached = cacheService.getCachedProductList(cacheKey);
        if (cached instanceof List) {
            log.debug("추천상품 목록 캐시에서 조회");
            return (List<Product>) cached;
        }
        
        List<Product> products = productRepository.findTop10ByStatusAndIsFeaturedOrderByCreatedAtDesc(ProductStatus.ACTIVE, true);
        cacheService.cacheProductList(cacheKey, products, PRODUCT_LIST_CACHE_DURATION);
        log.debug("추천상품 목록 DB에서 조회 후 캐시 저장: count={}", products.size());
        
        return products;
    }

    public boolean existsBySku(String sku) {
        return productRepository.existsBySku(sku);
    }

    public long countActiveProducts() {
        return productRepository.countByStatus(ProductStatus.ACTIVE);
    }
}