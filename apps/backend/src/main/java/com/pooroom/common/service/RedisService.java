package com.pooroom.common.service;

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
        if (value != null && clazz.isInstance(value)) {
            return clazz.cast(value);
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
}