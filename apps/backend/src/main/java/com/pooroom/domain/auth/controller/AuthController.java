package com.pooroom.domain.auth.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.common.util.MessageUtil;
import com.pooroom.domain.auth.service.AuthService;
import com.pooroom.domain.auth.dto.LoginRequest;
import com.pooroom.domain.auth.dto.LoginResponse;
import com.pooroom.domain.auth.dto.RefreshTokenRequest;
import com.pooroom.domain.auth.dto.SignUpRequest;
import com.pooroom.domain.user.dto.UserResponse;
import com.pooroom.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;
    private final MessageUtil messageUtil;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserResponse>> signUp(@Valid @RequestBody SignUpRequest request) {
        UserResponse userResponse = userService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(userResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request, 
                                                          HttpServletRequest httpRequest) {
        String deviceInfo = extractDeviceInfo(httpRequest);
        String ipAddress = extractIpAddress(httpRequest);
        
        LoginResponse loginResponse = authService.login(request, deviceInfo, ipAddress);
        return ResponseEntity.ok(ApiResponse.success(loginResponse));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        LoginResponse loginResponse = authService.refreshAccessToken(request.getRefreshToken());
        return ResponseEntity.ok(ApiResponse.success(loginResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@Valid @RequestBody RefreshTokenRequest request) {
        authService.logout(request.getRefreshToken());
        return ResponseEntity.ok(ApiResponse.success(messageUtil.getMessage("auth.logout.success")));
    }

    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmailDuplication(@RequestParam String email) {
        boolean exists = userService.existsByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(!exists));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        UserResponse user = userService.getUserByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    private String extractDeviceInfo(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        if (userAgent == null) return "Unknown Device";
        
        // 간단한 디바이스 정보 추출
        if (userAgent.contains("Mobile")) return "Mobile Device";
        if (userAgent.contains("Chrome")) return "Chrome Browser";
        if (userAgent.contains("Firefox")) return "Firefox Browser";
        if (userAgent.contains("Safari")) return "Safari Browser";
        return "Desktop Browser";
    }

    private String extractIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}