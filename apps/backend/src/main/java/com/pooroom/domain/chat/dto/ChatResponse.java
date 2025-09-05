package com.pooroom.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {
    
    private String message;
    private String sender;
    private LocalDateTime timestamp;
    
    public static ChatResponse bot(String message) {
        return ChatResponse.builder()
                .message(message)
                .sender("bot")
                .timestamp(LocalDateTime.now())
                .build();
    }
    
    public static ChatResponse user(String message) {
        return ChatResponse.builder()
                .message(message)
                .sender("user")
                .timestamp(LocalDateTime.now())
                .build();
    }
}