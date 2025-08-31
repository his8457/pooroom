package com.pooroom.domain.auth.service;

import com.pooroom.common.service.RedisService;
import com.pooroom.domain.auth.dto.UserSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class SessionService {

    private final RedisService redisService;

    @Value("${jwt.refresh-expiration}")
    private long refreshTokenExpiration;

    private static final String SESSION_PREFIX = "session:";
    private static final String BLACKLIST_PREFIX = "blacklist:token:";
    private static final Duration SESSION_TIMEOUT = Duration.ofHours(24);
    private static final Duration ACTIVITY_TIMEOUT = Duration.ofMinutes(30);

    public void createSession(UserSession session) {
        String key = SESSION_PREFIX + session.getUserId();
        Duration ttl = Duration.ofSeconds(refreshTokenExpiration);
        redisService.setValue(key, session, ttl);
        log.info("사용자 세션 생성: userId={}, email={}", session.getUserId(), session.getEmail());
    }

    public UserSession getSession(Long userId) {
        String key = SESSION_PREFIX + userId;
        return redisService.getValue(key, UserSession.class);
    }

    public UserSession getSessionByEmail(String email) {
        // 실제로는 email로 userId를 먼저 찾아야 하지만, 
        // 현재는 JWT에서 추출한 email로 DB에서 user를 조회하는 방식 사용
        return null;
    }

    public boolean isSessionValid(Long userId) {
        UserSession session = getSession(userId);
        if (session == null) {
            log.debug("세션이 존재하지 않음: userId={}", userId);
            return false;
        }

        if (!session.isActive()) {
            log.debug("비활성화된 세션: userId={}", userId);
            return false;
        }

        // 마지막 활동이 너무 오래전인지 확인
        if (session.getLastActivity().isBefore(LocalDateTime.now().minus(ACTIVITY_TIMEOUT))) {
            log.debug("세션 활동 타임아웃: userId={}, lastActivity={}", userId, session.getLastActivity());
            removeSession(userId);
            return false;
        }

        return true;
    }

    public void updateLastActivity(Long userId) {
        UserSession session = getSession(userId);
        if (session != null && session.isActive()) {
            session.updateLastActivity();
            String key = SESSION_PREFIX + userId;
            Duration ttl = Duration.ofSeconds(refreshTokenExpiration);
            redisService.setValue(key, session, ttl);
        }
    }

    public void removeSession(Long userId) {
        String key = SESSION_PREFIX + userId;
        boolean deleted = redisService.deleteKey(key);
        log.info("사용자 세션 제거: userId={}, 성공={}", userId, deleted);
    }

    public void deactivateSession(Long userId) {
        UserSession session = getSession(userId);
        if (session != null) {
            session.deactivate();
            String key = SESSION_PREFIX + userId;
            Duration ttl = Duration.ofSeconds(refreshTokenExpiration);
            redisService.setValue(key, session, ttl);
            log.info("사용자 세션 비활성화: userId={}", userId);
        }
    }

    public void addTokenToBlacklist(String jti, Duration expiration) {
        String key = BLACKLIST_PREFIX + jti;
        redisService.setValue(key, true, expiration);
        log.info("토큰 블랙리스트 추가: jti={}", jti);
    }

    public boolean isTokenBlacklisted(String jti) {
        String key = BLACKLIST_PREFIX + jti;
        return redisService.hasKey(key);
    }

    public int getActiveSessionCount(Long userId) {
        return isSessionValid(userId) ? 1 : 0;
    }

    public void enforceMaxSessions(Long userId, int maxSessions) {
        if (maxSessions <= 0) return;
        
        int activeSessions = getActiveSessionCount(userId);
        if (activeSessions >= maxSessions) {
            log.info("최대 세션 수 초과로 기존 세션 제거: userId={}", userId);
            removeSession(userId);
        }
    }
}