package com.pooroom.domain.order.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PgProvider {
    TOSS("토스페이먼츠", "https://api.tosspayments.com"),
    IAMPORT("아임포트", "https://api.iamport.kr"),
    KAKAO("카카오페이", "https://kapi.kakao.com"),
    NAVER("네이버페이", "https://dev.naver.com");

    private final String displayName;
    private final String apiBaseUrl;

    public boolean isRealTimePg() {
        return this == TOSS || this == IAMPORT;
    }

    public boolean isWalletService() {
        return this == KAKAO || this == NAVER;
    }
}