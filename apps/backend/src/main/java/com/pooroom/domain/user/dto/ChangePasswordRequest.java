package com.pooroom.domain.user.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
public class ChangePasswordRequest {

    @NotBlank(message = "{validation.password.current.required}")
    private String currentPassword;

    @NotBlank(message = "{validation.password.new.required}")
    @Size(min = 8, max = 20, message = "{validation.password.size}")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        message = "{validation.password.pattern}"
    )
    private String newPassword;

    @NotBlank(message = "{validation.password.confirm.required}")
    private String confirmPassword;

    public boolean isPasswordMatch() {
        return newPassword != null && newPassword.equals(confirmPassword);
    }
}