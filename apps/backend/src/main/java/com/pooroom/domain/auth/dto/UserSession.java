package com.pooroom.domain.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSession {
    
    private Long userId;
    private String email;
    private String role;
    private LocalDateTime loginTime;
    private LocalDateTime lastActivity;
    private String deviceInfo;
    private String ipAddress;
    private String refreshToken;
    private boolean active;

    public static UserSession create(Long userId, String email, String role, 
                                   String deviceInfo, String ipAddress, String refreshToken) {
        LocalDateTime now = LocalDateTime.now();
        return UserSession.builder()
                .userId(userId)
                .email(email)
                .role(role)
                .loginTime(now)
                .lastActivity(now)
                .deviceInfo(deviceInfo)
                .ipAddress(ipAddress)
                .refreshToken(refreshToken)
                .active(true)
                .build();
    }

    public void updateLastActivity() {
        this.lastActivity = LocalDateTime.now();
    }

    public void deactivate() {
        this.active = false;
    }
}