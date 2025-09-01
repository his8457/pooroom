package com.pooroom.domain.order.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
    PENDING("주문 접수", "주문이 접수되었습니다."),
    PAID("결제 완료", "결제가 완료되었습니다."),
    PREPARING("배송 준비", "상품을 준비 중입니다."),
    SHIPPED("배송 중", "상품이 배송 중입니다."),
    DELIVERED("배송 완료", "배송이 완료되었습니다."),
    CANCELLED("주문 취소", "주문이 취소되었습니다."),
    REFUNDED("환불 완료", "환불이 완료되었습니다.");

    private final String description;
    private final String message;

    public boolean isCancellable() {
        return this == PENDING || this == PAID;
    }

    public boolean isRefundable() {
        return this == PAID || this == PREPARING || this == SHIPPED;
    }

    public boolean isModifiable() {
        return this == PENDING;
    }

    public boolean isCompleted() {
        return this == DELIVERED || this == CANCELLED || this == REFUNDED;
    }
}