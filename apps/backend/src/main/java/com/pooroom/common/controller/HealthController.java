package com.pooroom.common.controller;

import com.pooroom.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> healthInfo = new HashMap<>();
        healthInfo.put("status", "UP");
        healthInfo.put("timestamp", LocalDateTime.now());
        healthInfo.put("service", "pooroom-backend");
        healthInfo.put("version", "1.0.0");
        
        return ResponseEntity.ok(ApiResponse.success("서버가 정상적으로 실행 중입니다.", healthInfo));
    }

    @GetMapping("/ping")
    public ResponseEntity<ApiResponse<String>> ping() {
        return ResponseEntity.ok(ApiResponse.success("pong"));
    }

    @GetMapping("/version")
    public ResponseEntity<ApiResponse<Map<String, String>>> version() {
        Map<String, String> versionInfo = new HashMap<>();
        versionInfo.put("service", "pooroom-backend");
        versionInfo.put("version", "1.0.0");
        versionInfo.put("build", "SNAPSHOT");
        
        return ResponseEntity.ok(ApiResponse.success("버전 정보", versionInfo));
    }
}