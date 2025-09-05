package com.pooroom.domain.auth.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.config.JwtUtil;
import com.pooroom.domain.auth.dto.LoginRequest;
import com.pooroom.domain.auth.dto.LoginResponse;
import com.pooroom.domain.auth.dto.UserSession;
import com.pooroom.domain.auth.entity.RefreshToken;
import com.pooroom.domain.auth.repository.RefreshTokenRepository;
import com.pooroom.domain.user.dto.UserResponse;
import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.user.entity.UserStatus;
import com.pooroom.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final SessionService sessionService;

    @Value("${jwt.expiration}")
    private long jwtExpiration;
    
    @Value("${jwt.refresh-expiration}")
    private long refreshTokenExpiration;

    @Transactional
    public LoginResponse login(LoginRequest request) {
        return login(request, null, null);
    }

    @Transactional
    public LoginResponse login(LoginRequest request, String deviceInfo, String ipAddress) {
        User user = userRepository.findByEmailAndStatus(request.getEmail(), UserStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException(ErrorCode.INVALID_PASSWORD);
        }

        // 마지막 로그인 시간 업데이트
        user.updateLastLogin();
        userRepository.save(user);

        // 기존 세션 제거 (단일 세션 정책)
        sessionService.removeSession(user.getId());

        // 기존 refresh token들 폐기
        refreshTokenRepository.revokeAllByUser(user, LocalDateTime.now());

        // JWT 토큰 생성
        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());
        String refreshTokenValue = jwtUtil.generateRefreshToken(user.getEmail());
        
        // Refresh token 저장 (DB)
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(refreshTokenValue)
                .expiresAt(LocalDateTime.now().plusSeconds(refreshTokenExpiration))
                .build();
        refreshTokenRepository.save(refreshToken);

        // Redis 세션 생성
        UserSession session = UserSession.create(
                user.getId(),
                user.getEmail(),
                user.getRole().name(),
                deviceInfo != null ? deviceInfo : "Unknown Device",
                ipAddress != null ? ipAddress : "Unknown IP",
                refreshTokenValue
        );
        sessionService.createSession(session);

        UserResponse userResponse = UserResponse.from(user);

        return LoginResponse.of(accessToken, refreshTokenValue, jwtExpiration, userResponse);
    }

    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmailAndStatus(email, UserStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        return UserResponse.from(user);
    }

    @Transactional
    public LoginResponse refreshAccessToken(String refreshTokenValue) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenValue)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN));

        if (!refreshToken.isValid()) {
            throw new BusinessException(ErrorCode.EXPIRED_REFRESH_TOKEN);
        }

        User user = refreshToken.getUser();
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BusinessException(ErrorCode.USER_NOT_FOUND);
        }

        // 새로운 access token 생성
        String newAccessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());
        UserResponse userResponse = UserResponse.from(user);

        return LoginResponse.of(newAccessToken, refreshTokenValue, jwtExpiration, userResponse);
    }

    @Transactional
    public void logout(String refreshTokenValue) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenValue)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN));
        
        // DB에서 refresh token 폐기
        refreshToken.revoke();
        refreshTokenRepository.save(refreshToken);

        // Redis에서 세션 제거
        User user = refreshToken.getUser();
        sessionService.removeSession(user.getId());
        
        log.info("사용자 로그아웃 완료: userId={}, email={}", user.getId(), user.getEmail());
    }

    @Transactional
    public void revokeAllUserTokens(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        
        // DB에서 모든 refresh token 폐기
        refreshTokenRepository.revokeAllByUser(user, LocalDateTime.now());
        
        // Redis에서 세션 제거
        sessionService.removeSession(userId);
        
        log.info("사용자 모든 토큰 폐기 완료: userId={}, email={}", userId, user.getEmail());
    }

    public UserSession getUserSession(Long userId) {
        return sessionService.getSession(userId);
    }

    public boolean isUserSessionActive(Long userId) {
        return sessionService.isSessionValid(userId);
    }

    @Transactional
    public void forceLogout(Long userId) {
        sessionService.removeSession(userId);
        revokeAllUserTokens(userId);
        log.info("사용자 강제 로그아웃: userId={}", userId);
    }
}