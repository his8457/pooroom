package com.pooroom.domain.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 쇼핑몰 로그인 요청 DTO
 * 고객이 로그인 시 입력하는 인증 정보
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "{validation.email.required}")
    @Email(message = "{validation.email.format}")
    private String email; // 로그인용 이메일 주소

    @NotBlank(message = "{validation.password.required}")
    private String password; // 계정 비밀번호
}