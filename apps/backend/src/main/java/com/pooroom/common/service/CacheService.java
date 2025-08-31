package com.pooroom.common.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
public class CacheService {

    private final RedisService redisService;

    private static final String USER_SESSION_PREFIX = "user:session:";
    private static final String PRODUCT_CACHE_PREFIX = "product:cache:";
    private static final String CATEGORY_CACHE_PREFIX = "category:cache:";
    private static final String BRAND_CACHE_PREFIX = "brand:cache:";
    private static final String REFRESH_TOKEN_PREFIX = "refresh:token:";

    public void cacheUserSession(String userId, Object sessionData, Duration duration) {
        String key = USER_SESSION_PREFIX + userId;
        redisService.setValue(key, sessionData, duration);
    }

    public Object getUserSession(String userId) {
        String key = USER_SESSION_PREFIX + userId;
        return redisService.getValue(key);
    }

    public void removeUserSession(String userId) {
        String key = USER_SESSION_PREFIX + userId;
        redisService.deleteKey(key);
    }

    public void cacheProduct(Long productId, Object productData, Duration duration) {
        String key = PRODUCT_CACHE_PREFIX + productId;
        redisService.setValue(key, productData, duration);
    }

    public Object getCachedProduct(Long productId) {
        String key = PRODUCT_CACHE_PREFIX + productId;
        return redisService.getValue(key);
    }

    public void cacheCategories(Object categoriesData, Duration duration) {
        String key = CATEGORY_CACHE_PREFIX + "all";
        redisService.setValue(key, categoriesData, duration);
    }

    public Object getCachedCategories() {
        String key = CATEGORY_CACHE_PREFIX + "all";
        return redisService.getValue(key);
    }

    public void cacheBrands(Object brandsData, Duration duration) {
        String key = BRAND_CACHE_PREFIX + "all";
        redisService.setValue(key, brandsData, duration);
    }

    public Object getCachedBrands() {
        String key = BRAND_CACHE_PREFIX + "all";
        return redisService.getValue(key);
    }

    public void storeRefreshToken(String tokenValue, String userId, Duration duration) {
        String key = REFRESH_TOKEN_PREFIX + tokenValue;
        redisService.setValue(key, userId, duration);
    }

    public String getRefreshTokenUserId(String tokenValue) {
        String key = REFRESH_TOKEN_PREFIX + tokenValue;
        Object userId = redisService.getValue(key);
        return userId != null ? userId.toString() : null;
    }

    public void removeRefreshToken(String tokenValue) {
        String key = REFRESH_TOKEN_PREFIX + tokenValue;
        redisService.deleteKey(key);
    }

    public void invalidateProductCache(Long productId) {
        String key = PRODUCT_CACHE_PREFIX + productId;
        redisService.deleteKey(key);
    }

    public void invalidateAllProductCache() {
        // 신상품/추천상품 목록 캐시 무효화
        String newProductsKey = PRODUCT_CACHE_PREFIX + "newProducts".hashCode();
        String recommendedProductsKey = PRODUCT_CACHE_PREFIX + "recommendedProducts".hashCode();
        
        redisService.deleteKey(newProductsKey);
        redisService.deleteKey(recommendedProductsKey);
        
        log.info("상품 목록 캐시 무효화 완료");
    }

    public void invalidateCategoryCache() {
        String key = CATEGORY_CACHE_PREFIX + "all";
        redisService.deleteKey(key);
    }

    public void invalidateBrandCache() {
        String key = BRAND_CACHE_PREFIX + "all";
        redisService.deleteKey(key);
    }
}