package com.pooroom.domain.product.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.common.service.CacheService;
import com.pooroom.domain.product.entity.Brand;
import com.pooroom.domain.product.repository.BrandRepository;
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
public class BrandService {

    private final BrandRepository brandRepository;
    private final CacheService cacheService;
    
    private static final Duration BRAND_CACHE_DURATION = Duration.ofHours(1);

    public Brand findById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public Brand findByName(String name) {
        return brandRepository.findByName(name)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @SuppressWarnings("unchecked")
    public List<Brand> findAllActiveBrands() {
        // 캐시에서 먼저 조회
        Object cachedBrands = cacheService.getCachedBrands();
        if (cachedBrands instanceof List) {
            log.debug("브랜드 목록 캐시에서 조회");
            return (List<Brand>) cachedBrands;
        }
        
        // DB에서 조회
        List<Brand> brands = brandRepository.findActiveBrands(true);
        
        // 캐시에 저장
        cacheService.cacheBrands(brands, BRAND_CACHE_DURATION);
        log.debug("브랜드 목록 DB에서 조회 후 캐시 저장: count={}", brands.size());
        
        return brands;
    }

    public boolean existsByName(String name) {
        return brandRepository.existsByName(name);
    }

    public long countActiveProductsByBrand(Long brandId) {
        return brandRepository.countActiveProductsByBrand(brandId);
    }
}