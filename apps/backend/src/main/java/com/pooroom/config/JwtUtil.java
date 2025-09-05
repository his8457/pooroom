package com.pooroom.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {

    private final SecretKey secretKey;
    private final long accessTokenExpiration;
    private final long refreshTokenExpiration;

    public JwtUtil(@Value("${jwt.secret}") String secret, 
                   @Value("${jwt.expiration}") long expiration,
                   @Value("${jwt.refresh-expiration}") long refreshExpiration) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiration = expiration * 1000; // 초를 밀리초로 변환
        this.refreshTokenExpiration = refreshExpiration * 1000; // 초를 밀리초로 변환
    }

    public String generateAccessToken(String email, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public String getEmailFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.getSubject();
    }

    public String getRoleFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.get("role", String.class);
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = parseToken(token);
            return claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (ExpiredJwtException e) {
            // 만료된 토큰의 경우 시간을 한국시간으로 변환하여 로그 출력
            Instant expiredAt = e.getClaims().getExpiration().toInstant();
            Instant currentTime = Instant.now();
            
            ZonedDateTime expiredAtKst = expiredAt.atZone(ZoneId.of("Asia/Seoul"));
            ZonedDateTime currentTimeKst = currentTime.atZone(ZoneId.of("Asia/Seoul"));
            
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            
            log.debug("JWT 토큰 만료: 만료시간={}, 현재시간={} (한국시간)", 
                    expiredAtKst.format(formatter), 
                    currentTimeKst.format(formatter));
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("JWT 토큰 검증 실패: {}", e.getMessage());
            return false;
        }
    }

    public String generateRefreshToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshTokenExpiration);

        return Jwts.builder()
                .setSubject(email)
                .claim("type", "refresh")
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public long getRefreshTokenExpiration() {
        return refreshTokenExpiration / 1000; // 밀리초를 초로 변환
    }

    private Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}