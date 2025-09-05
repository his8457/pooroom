package com.pooroom.domain.user.dto;

import com.pooroom.domain.user.entity.Gender;
import lombok.Data;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Data
public class UpdateUserRequest {

    @NotBlank(message = "{validation.name.required}")
    @Size(max = 50, message = "{validation.name.size}")
    private String name;

    @Size(max = 100, message = "{validation.nickname.size}")
    private String nickname;

    @NotBlank(message = "{validation.phone.required}")
    @Pattern(regexp = "^01[0-9]-?[0-9]{4}-?[0-9]{4}$", message = "{validation.phone.format}")
    private String phoneNumber;

    @NotNull(message = "{validation.birthDate.required}")
    @Past(message = "{validation.birthDate.past}")
    private LocalDate birthDate;

    @NotNull(message = "{validation.gender.required}")
    private Gender gender;

    @Size(max = 500, message = "{validation.profileImage.size}")
    private String profileImageUrl;
}