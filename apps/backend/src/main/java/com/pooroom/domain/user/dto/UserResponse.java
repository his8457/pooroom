package com.pooroom.domain.user.dto;

import com.pooroom.domain.user.entity.Gender;
import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.user.entity.UserRole;
import com.pooroom.domain.user.entity.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 고객 정보 응답 DTO
 * 클라이언트에게 전송할 고객 정보 (비밀번호 제외)
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    
    private Long id; // 고객 고유 ID
    private String email; // 이메일 주소
    private String name; // 고객 실명
    private String nickname; // 화면 표시용 닉네임
    private String phoneNumber; // 휴대폰 번호
    private LocalDate birthDate; // 생년월일
    private Gender gender; // 성별
    private String profileImageUrl; // 프로필 이미지 URL
    private Boolean phoneVerified; // 휴대폰 인증 완료 여부
    private UserRole role; // 사용자 역할 (고객/관리자)
    private UserStatus status; // 계정 상태
    private Boolean emailVerified; // 이메일 인증 완료 여부
    private LocalDateTime createdAt; // 가입일시
    private LocalDateTime updatedAt; // 마지막 정보 수정일시
    private LocalDateTime lastLoginAt; // 마지막 로그인 일시

    /**
     * User 엔티티를 UserResponse DTO로 변환
     * @param user 변환할 User 엔티티
     * @return 클라이언트 전송용 UserResponse 객체
     */
    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .phoneNumber(user.getPhoneNumber())
                .birthDate(user.getBirthDate())
                .gender(user.getGender())
                .profileImageUrl(user.getProfileImageUrl())
                .phoneVerified(user.getPhoneVerified())
                .role(user.getRole())
                .status(user.getStatus())
                .emailVerified(user.getEmailVerified())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .lastLoginAt(user.getLastLoginAt())
                .build();
    }
}