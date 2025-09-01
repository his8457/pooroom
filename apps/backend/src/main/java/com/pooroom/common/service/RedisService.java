package com.pooroom.common.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public void setValue(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
        log.debug("Redis에 키 저장: {}", key);
    }

    public void setValue(String key, Object value, Duration timeout) {
        redisTemplate.opsForValue().set(key, value, timeout);
        log.debug("Redis에 키 저장 (만료시간: {}): {}", timeout, key);
    }

    public Object getValue(String key) {
        Object value = redisTemplate.opsForValue().get(key);
        log.debug("Redis에서 키 조회: {} -> {}", key, value != null ? "존재" : "없음");
        return value;
    }

    public <T> T getValue(String key, Class<T> clazz) {
        Object value = getValue(key);
        if (value != null) {
            try {
                if (clazz.isInstance(value)) {
                    return clazz.cast(value);
                }
                
                // LinkedHashMap을 목표 클래스로 변환 시도
                if (value instanceof java.util.Map) {
                    log.debug("Redis LinkedHashMap을 {}로 변환 시도: key={}", clazz.getSimpleName(), key);
                    return objectMapper.convertValue(value, clazz);
                }
                
                log.debug("Redis 값 타입 불일치: key={}, expected={}, actual={}", 
                        key, clazz.getSimpleName(), value.getClass().getSimpleName());
            } catch (Exception e) {
                log.debug("Redis 값 변환 실패: key={}, error={}", key, e.getMessage());
            }
        }
        return null;
    }

    public boolean hasKey(String key) {
        Boolean exists = redisTemplate.hasKey(key);
        return exists != null && exists;
    }

    public boolean deleteKey(String key) {
        Boolean deleted = redisTemplate.delete(key);
        log.debug("Redis 키 삭제: {} -> {}", key, deleted != null && deleted ? "성공" : "실패");
        return deleted != null && deleted;
    }

    public boolean expire(String key, Duration timeout) {
        Boolean expired = redisTemplate.expire(key, timeout);
        log.debug("Redis 키 만료시간 설정: {} -> {}", key, expired != null && expired ? "성공" : "실패");
        return expired != null && expired;
    }

    public Long getExpire(String key) {
        return redisTemplate.getExpire(key, TimeUnit.SECONDS);
    }

    public void deleteKeysByPattern(String pattern) {
        try {
            redisTemplate.delete(redisTemplate.keys(pattern));
            log.debug("Redis 패턴 키 삭제: {}", pattern);
        } catch (Exception e) {
            log.error("Redis 패턴 키 삭제 실패: pattern={}, error={}", pattern, e.getMessage());
        }
    }
}