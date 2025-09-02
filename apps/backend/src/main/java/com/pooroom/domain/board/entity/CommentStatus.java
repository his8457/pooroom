package com.pooroom.domain.board.entity;

public enum CommentStatus {
    ACTIVE,    // 활성 (정상 표시)
    HIDDEN,    // 숨김 (관리자에 의한 숨김 처리)
    DELETED    // 삭제 (소프트 삭제)
}