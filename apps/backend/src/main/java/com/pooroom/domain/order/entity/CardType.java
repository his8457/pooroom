package com.pooroom.domain.order.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CardType {
    CREDIT("신용카드", "일반 신용카드"),
    DEBIT("체크카드", "직불/체크카드"),
    GIFT("상품권카드", "기프트카드/상품권");

    private final String displayName;
    private final String description;

    public boolean isInstantPayment() {
        return this == CREDIT || this == DEBIT;
    }

    public boolean requiresBalance() {
        return this == DEBIT || this == GIFT;
    }
}