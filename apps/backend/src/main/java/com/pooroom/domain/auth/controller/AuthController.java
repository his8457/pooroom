package com.pooroom.domain.auth.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.domain.auth.service.AuthService;
import com.pooroom.domain.auth.dto.LoginRequest;
import com.pooroom.domain.auth.dto.LoginResponse;
import com.pooroom.domain.auth.dto.SignUpRequest;
import com.pooroom.domain.user.dto.UserResponse;
import com.pooroom.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserResponse>> signUp(@Valid @RequestBody SignUpRequest request) {
        UserResponse userResponse = userService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(userResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse loginResponse = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(loginResponse));
    }

    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmailDuplication(@RequestParam String email) {
        boolean exists = userService.existsByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(!exists));
    }
}