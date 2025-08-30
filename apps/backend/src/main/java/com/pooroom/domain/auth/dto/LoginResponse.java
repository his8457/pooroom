package com.pooroom.domain.auth.dto;

import com.pooroom.domain.user.dto.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 쇼핑몰 로그인 응답 DTO
 * 로그인 성공 시 JWT 토큰과 사용자 정보를 반환
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    
    private String accessToken; // JWT 인증 토큰
    private String refreshToken; // JWT Refresh 토큰
    private String tokenType; // 토큰 타입 (Bearer)
    private Long expiresIn; // Access Token 만료 시간 (초)
    private UserResponse user; // 로그인한 고객 정보

    /**
     * LoginResponse 객체 생성 팩토리 메서드
     * @param accessToken JWT 인증 토큰
     * @param refreshToken JWT Refresh 토큰
     * @param expiresIn Access Token 만료 시간 (초)
     * @param user 로그인한 고객 정보
     * @return LoginResponse 객체
     */
    public static LoginResponse of(String accessToken, String refreshToken, Long expiresIn, UserResponse user) {
        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(expiresIn)
                .user(user)
                .build();
    }
}