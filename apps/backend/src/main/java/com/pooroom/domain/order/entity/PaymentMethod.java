package com.pooroom.domain.order.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PaymentMethod {
    CARD("신용카드", "신용카드로 결제"),
    BANK_TRANSFER("계좌이체", "실시간 계좌이체"),
    VIRTUAL_ACCOUNT("가상계좌", "가상계좌 입금"),
    MOBILE_PAYMENT("간편결제", "카카오페이, 네이버페이 등");

    private final String description;
    private final String detail;

    public boolean isRealTime() {
        return this == CARD || this == BANK_TRANSFER || this == MOBILE_PAYMENT;
    }

    public boolean requiresDeposit() {
        return this == VIRTUAL_ACCOUNT;
    }
}