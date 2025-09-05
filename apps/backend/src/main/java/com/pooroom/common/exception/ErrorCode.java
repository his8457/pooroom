package com.pooroom.common.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "C001", "잘못된 입력값입니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "C002", "지원하지 않는 HTTP 메서드입니다."),
    ENTITY_NOT_FOUND(HttpStatus.NOT_FOUND, "C003", "엔티티를 찾을 수 없습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C004", "서버 오류가 발생했습니다."),
    INVALID_TYPE_VALUE(HttpStatus.BAD_REQUEST, "C005", "잘못된 타입값입니다."),
    HANDLE_ACCESS_DENIED(HttpStatus.FORBIDDEN, "C006", "접근이 거부되었습니다."),

    // User
    EMAIL_DUPLICATION(HttpStatus.CONFLICT, "U001", "이미 사용 중인 이메일입니다."),
    USERNAME_DUPLICATION(HttpStatus.CONFLICT, "U002", "이미 사용 중인 사용자명입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U003", "사용자를 찾을 수 없습니다."),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "U004", "잘못된 비밀번호입니다."),
    USER_NOT_AUTHORIZED(HttpStatus.UNAUTHORIZED, "U005", "인증되지 않은 사용자입니다."),
    PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, "U006", "비밀번호가 일치하지 않습니다."),
    NICKNAME_DUPLICATION(HttpStatus.CONFLICT, "U007", "이미 사용 중인 닉네임입니다."),

    // Authentication & Authorization
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "A001", "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "A002", "만료된 토큰입니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "A003", "유효하지 않은 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "A004", "만료된 리프레시 토큰입니다."),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "A005", "리프레시 토큰을 찾을 수 없습니다."),
    INSUFFICIENT_PRIVILEGES(HttpStatus.FORBIDDEN, "A006", "권한이 부족합니다."),

    // Project
    PROJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "P001", "프로젝트를 찾을 수 없습니다."),
    PROJECT_ACCESS_DENIED(HttpStatus.FORBIDDEN, "P002", "프로젝트에 접근할 권한이 없습니다."),

    // Category
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "CT001", "카테고리를 찾을 수 없습니다."),
    CATEGORY_ALREADY_EXISTS(HttpStatus.CONFLICT, "CT002", "이미 존재하는 카테고리입니다."),

    // Product
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "PR001", "상품을 찾을 수 없습니다."),
    PRODUCT_NOT_AVAILABLE(HttpStatus.BAD_REQUEST, "PR002", "판매 중단된 상품입니다."),
    PRODUCT_OUT_OF_STOCK(HttpStatus.BAD_REQUEST, "PR003", "품절된 상품입니다."),
    INSUFFICIENT_STOCK(HttpStatus.BAD_REQUEST, "PR004", "재고가 부족합니다."),

    // Cart
    CART_NOT_FOUND(HttpStatus.NOT_FOUND, "CR001", "장바구니를 찾을 수 없습니다."),
    CART_ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "CR002", "장바구니 상품을 찾을 수 없습니다."),
    CART_ITEM_ALREADY_EXISTS(HttpStatus.CONFLICT, "CR003", "이미 장바구니에 담긴 상품입니다."),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "CR004", "접근 권한이 없습니다."),
    CART_EMPTY(HttpStatus.BAD_REQUEST, "CR005", "장바구니가 비어있습니다."),

    // Order
    ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "OR001", "주문을 찾을 수 없습니다."),
    ORDER_CANNOT_CANCEL(HttpStatus.BAD_REQUEST, "OR002", "취소할 수 없는 주문입니다."),
    ORDER_CANNOT_REFUND(HttpStatus.BAD_REQUEST, "OR003", "환불할 수 없는 주문입니다."),
    ORDER_ALREADY_CANCELLED(HttpStatus.BAD_REQUEST, "OR004", "이미 취소된 주문입니다."),
    ORDER_ALREADY_COMPLETED(HttpStatus.BAD_REQUEST, "OR005", "이미 완료된 주문입니다."),

    // Payment
    PAYMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "PM001", "결제 정보를 찾을 수 없습니다."),
    PAYMENT_ALREADY_PROCESSED(HttpStatus.BAD_REQUEST, "PM002", "이미 처리된 결제입니다."),
    PAYMENT_AMOUNT_MISMATCH(HttpStatus.BAD_REQUEST, "PM003", "결제 금액이 일치하지 않습니다."),
    PAYMENT_VERIFICATION_FAILED(HttpStatus.BAD_REQUEST, "PM004", "결제 검증에 실패했습니다."),
    PAYMENT_CANCELLED_BY_USER(HttpStatus.BAD_REQUEST, "PM005", "사용자가 결제를 취소했습니다."),
    PAYMENT_TIMEOUT(HttpStatus.REQUEST_TIMEOUT, "PM006", "결제 시간이 초과되었습니다."),

    // File
    FILE_UPLOAD_ERROR(HttpStatus.BAD_REQUEST, "F001", "파일 업로드에 실패했습니다."),
    INVALID_FILE_EXTENSION(HttpStatus.BAD_REQUEST, "F002", "지원하지 않는 파일 확장자입니다."),
    FILE_SIZE_EXCEEDED(HttpStatus.BAD_REQUEST, "F003", "파일 크기가 제한을 초과했습니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String code, String message) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}