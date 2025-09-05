package com.pooroom.common.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.common.util.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HealthController {

    private final MessageUtil messageUtil;

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> healthInfo = new HashMap<>();
        healthInfo.put("status", "UP");
        healthInfo.put("timestamp", LocalDateTime.now());
        healthInfo.put("service", "pooroom-backend");
        healthInfo.put("version", "1.0.0");
        
        return ResponseEntity.ok(ApiResponse.success(healthInfo, messageUtil.getMessage("system.health.success")));
    }

    @GetMapping("/ping")
    public ResponseEntity<ApiResponse<String>> ping() {
        return ResponseEntity.ok(ApiResponse.success(messageUtil.getMessage("common.ping")));
    }

    @GetMapping("/version")
    public ResponseEntity<ApiResponse<Map<String, String>>> version() {
        Map<String, String> versionInfo = new HashMap<>();
        versionInfo.put("service", "pooroom-backend");
        versionInfo.put("version", "1.0.0");
        versionInfo.put("build", "SNAPSHOT");
        
        return ResponseEntity.ok(ApiResponse.success(versionInfo, messageUtil.getMessage("system.version.info")));
    }
}