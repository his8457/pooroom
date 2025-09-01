package com.pooroom.domain.order.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PaymentStatus {
    PENDING("결제 대기", "결제를 진행해주세요."),
    PAID("결제 완료", "결제가 완료되었습니다."),
    FAILED("결제 실패", "결제에 실패했습니다."),
    CANCELLED("결제 취소", "결제가 취소되었습니다."),
    REFUNDED("환불 완료", "환불이 완료되었습니다.");

    private final String description;
    private final String message;

    public boolean isSuccessful() {
        return this == PAID;
    }

    public boolean isFinal() {
        return this == PAID || this == CANCELLED || this == REFUNDED;
    }

    public boolean canCancel() {
        return this == PENDING || this == PAID;
    }

    public boolean canRefund() {
        return this == PAID;
    }
}