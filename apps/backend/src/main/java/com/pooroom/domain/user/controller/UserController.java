package com.pooroom.domain.user.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.domain.user.dto.UserResponse;
import com.pooroom.domain.user.dto.UpdateUserRequest;
import com.pooroom.domain.user.dto.ChangePasswordRequest;
import com.pooroom.domain.user.service.UserService;
import com.pooroom.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        UserResponse user = userService.getUserByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateCurrentUser(
            @Valid @RequestBody UpdateUserRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        UserResponse updatedUser = userService.updateUser(email, request);
        return ResponseEntity.ok(ApiResponse.success(updatedUser));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        userService.changePassword(email, request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}