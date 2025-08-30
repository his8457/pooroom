package com.pooroom.domain.user.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.domain.auth.dto.SignUpRequest;
import com.pooroom.domain.user.dto.UserResponse;
import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse signUp(SignUpRequest request) {
        validateSignUpRequest(request);

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .nickname(request.getNickname())
                .phoneNumber(request.getPhoneNumber())
                .birthDate(request.getBirthDate())
                .gender(request.getGender())
                .build();

        User savedUser = userRepository.save(user);
        return UserResponse.from(savedUser);
    }

    private void validateSignUpRequest(SignUpRequest request) {
        if (!request.isPasswordMatch()) {
            throw new BusinessException(ErrorCode.PASSWORD_MISMATCH);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException(ErrorCode.EMAIL_DUPLICATION);
        }

        if (request.getNickname() != null && userRepository.existsByNickname(request.getNickname())) {
            throw new BusinessException(ErrorCode.NICKNAME_DUPLICATION);
        }
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        return UserResponse.from(user);
    }

    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        return UserResponse.from(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}