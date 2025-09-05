# === POOROOM Backend Dockerfile ===
# Spring Boot 프로덕션 배포용

# Build Stage
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Maven Wrapper 복사
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn

# pom.xml 먼저 복사 (의존성 캐싱 최적화)
COPY pom.xml .

# 의존성 다운로드
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# 소스 코드 복사
COPY src src

# 애플리케이션 빌드
RUN ./mvnw clean package -DskipTests

# Runtime Stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# 필요한 패키지 설치 (curl for health check)
RUN apk add --no-cache curl

# JAR 파일 복사
COPY --from=builder /app/target/*.jar app.jar

# 사용자 생성 (보안)
RUN addgroup -S spring && \
    adduser -S -G spring spring

# 애플리케이션 파일 소유권 변경
RUN chown -R spring:spring /app
USER spring

# 포트 노출
EXPOSE 8080

# JVM 옵션 설정 (메모리 최적화)
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseContainerSupport -XX:MaxRAMPercentage=75"

# 헬스체크
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/api/health || exit 1

# 애플리케이션 실행
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]