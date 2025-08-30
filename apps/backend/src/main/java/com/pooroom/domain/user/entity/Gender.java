package com.pooroom.domain.user.entity;

public enum Gender {
    FEMALE("여성"),
    MALE("남성"),
    OTHER("기타");

    private final String description;

    Gender(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}