package com.pooroom.domain.chat.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.domain.chat.dto.ChatRequest;
import com.pooroom.domain.chat.dto.ChatResponse;
import com.pooroom.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/message")
    public ResponseEntity<ApiResponse<ChatResponse>> sendMessage(
            @Valid @RequestBody ChatRequest request,
            Authentication authentication) {
        
        String userEmail = authentication != null ? authentication.getName() : "anonymous";
        ChatResponse response = chatService.sendMessage(request.getMessage(), userEmail);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}