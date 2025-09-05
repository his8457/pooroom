package com.pooroom.domain.auth.dto;

import com.pooroom.domain.user.entity.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

/**
 * 회원가입 요청 DTO
 * 고객이 회원가입 시 입력하는 정보를 담는 클래스
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    @Size(max = 100, message = "이메일은 100자를 초과할 수 없습니다.")
    private String email; // 로그인용 이메일 주소

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        message = "비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다."
    )
    private String password; // 계정 비밀번호

    @NotBlank(message = "비밀번호 확인은 필수입니다.")
    private String passwordConfirm; // 비밀번호 확인 (일치 검증용)

    @NotBlank(message = "이름은 필수입니다.")
    @Size(min = 2, max = 50, message = "이름은 2자 이상 50자 이하여야 합니다.")
    private String name; // 고객 실명 (배송시 사용)

    @Size(min = 2, max = 100, message = "닉네임은 2자 이상 100자 이하여야 합니다.")
    private String nickname; // 화면 표시용 닉네임 (선택사항)

    @NotBlank(message = "휴대폰 번호는 필수입니다.")
    @Pattern(regexp = "^01[0-9]-\\d{4}-\\d{4}$", message = "올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)")
    private String phoneNumber; // 배송 및 주문 알림용 연락처

    @NotNull(message = "생년월일은 필수입니다.")
    @Past(message = "생년월일은 과거 날짜여야 합니다.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate; // 생년월일 (연령대 분석 및 생일 혜택용)

    @NotNull(message = "성별 선택은 필수입니다.")
    private Gender gender; // 성별 (타겟 상품 추천용)

    /**
     * 비밀번호와 비밀번호 확인이 일치하는지 검증
     * @return 일치하면 true, 불일치하면 false
     */
    public boolean isPasswordMatch() {
        return password != null && password.equals(passwordConfirm);
    }
}