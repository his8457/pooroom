package com.pooroom.domain.user.entity;

public enum UserRole {
    USER("사용자"),
    ADMIN("관리자");

    private final String description;

    UserRole(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}