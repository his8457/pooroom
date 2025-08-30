package com.pooroom.domain.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 고객 정보 엔티티
 * 회원 정보를 관리
 */
@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 고객 고유 ID

    @Column(unique = true, nullable = false, length = 100)
    private String email; // 이메일 주소 (로그인 아이디)

    @Column(nullable = false, length = 255)
    private String password; // 암호화된 비밀번호

    @Column(nullable = false, length = 50)
    private String name; // 실명

    @Column(length = 100)
    private String nickname; // 닉네임 (선택사항)

    @Column(name = "phone_number", length = 20)
    private String phoneNumber; // 휴대폰 번호 (배송, 주문 알림용)

    @Column(name = "birth_date")
    private LocalDate birthDate; // 생년월일 (연령대 마케팅용)

    @Enumerated(EnumType.STRING)
    private Gender gender; // 성별 (타겟 마케팅용)

    @Column(name = "profile_image_url", length = 500)
    private String profileImageUrl; // 프로필 이미지 URL

    @Column(name = "phone_verified", nullable = false)
    private Boolean phoneVerified; // 휴대폰 번호 인증 여부

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role; // 사용자 역할 (고객/관리자)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status; // 계정 상태 (활성/비활성/정지)

    @Column(name = "email_verified", nullable = false)
    private Boolean emailVerified; // 이메일 인증 여부

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // 가입일시

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt; // 마지막 수정일시

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt; // 마지막 로그인 일시

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        emailVerified = false;
        phoneVerified = false;
        status = UserStatus.ACTIVE;
        role = UserRole.USER;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void updateLastLogin() {
        this.lastLoginAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void updateProfile(String name, String nickname, String phoneNumber) {
        this.name = name;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateProfileImage(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
        this.updatedAt = LocalDateTime.now();
    }

    public void verifyPhone() {
        this.phoneVerified = true;
        this.updatedAt = LocalDateTime.now();
    }

    public void verifyEmail() {
        this.emailVerified = true;
        this.updatedAt = LocalDateTime.now();
    }

    public void deactivate() {
        this.status = UserStatus.INACTIVE;
        this.updatedAt = LocalDateTime.now();
    }
}