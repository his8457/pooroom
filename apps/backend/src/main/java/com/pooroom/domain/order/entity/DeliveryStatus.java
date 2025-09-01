package com.pooroom.domain.order.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DeliveryStatus {
    PREPARING("배송 준비", "상품을 배송 준비 중입니다."),
    PICKED_UP("집화 완료", "택배사에서 상품을 수거했습니다."),
    IN_TRANSIT("배송 중", "상품이 배송 중입니다."),
    OUT_FOR_DELIVERY("배송 출발", "고객님 지역으로 배송 출발했습니다."),
    DELIVERED("배송 완료", "배송이 완료되었습니다."),
    FAILED("배송 실패", "배송에 실패했습니다.");

    private final String description;
    private final String message;

    public boolean isInProgress() {
        return this == PICKED_UP || this == IN_TRANSIT || this == OUT_FOR_DELIVERY;
    }

    public boolean isCompleted() {
        return this == DELIVERED || this == FAILED;
    }

    public boolean canTrack() {
        return this != PREPARING && this != FAILED;
    }
}