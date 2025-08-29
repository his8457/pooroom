# Docker 설정 참고 문서

## 개요
pooroom 프로젝트의 Docker 개발 환경 설정 문서입니다. 현재 정상적으로 작동하는 설정을 기준으로 작성되었습니다.

## 프로젝트 구조

```
pooroom/
├── docker-compose.yml              # 메인 Docker Compose 설정
├── docker/                         # Docker 관련 설정 파일들
│   ├── mysql/
│   │   ├── conf/
│   │   │   └── my.cnf             # MySQL 커스텀 설정
│   │   └── init/
│   │       └── 01-init-database.sql # MySQL 초기화 스크립트
│   └── redis/
│       └── redis.conf             # Redis 설정
├── scripts/                        # 로컬 환경 스크립트
│   ├── start-local.sh             # 로컬 환경 시작
│   └── stop-local.sh              # 로컬 환경 종료
└── .env.local.pooroom             # 로컬 환경 변수
```

## Docker 서비스 구성

### 1. MySQL 8.4.5
- **컨테이너명**: `pooroom-mysql`
- **포트**: `3307:3306` (호스트:컨테이너)
- **X Protocol 포트**: `33061:33060`
- **데이터베이스**: `pooroom_db`
- **사용자**: `pooroom_user`
- **비밀번호**: [.env 파일 참조]
- **Root 비밀번호**: [.env 파일 참조]
- **타임존**: `Asia/Seoul`
- **문자셋**: `utf8mb4`
- **콜레이션**: `utf8mb4_unicode_ci`

### 2. Redis 7-alpine
- **컨테이너명**: `pooroom-redis`
- **포트**: `6379:6379`
- **타임존**: `Asia/Seoul`
- **설정파일**: `/docker/redis/redis.conf`

### 3. Adminer 4.8.1 (DB 관리도구)
- **컨테이너명**: `pooroom-adminer`
- **포트**: `9080:8080`
- **접속**: http://localhost:9080
- **기본 서버**: mysql

## 주요 설정 파일

### docker-compose.yml
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.4.5
    container_name: pooroom-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      TZ: Asia/Seoul
    ports:
      - "3307:3306"
      - "33061:33060"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./docker/mysql/init:/docker-entrypoint-initdb.d
      - ./docker/mysql/conf/my.cnf:/etc/mysql/conf.d/custom.cnf
    command: >
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
    networks:
      - pooroom-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${MYSQL_ROOT_PASSWORD}"]
      timeout: 20s
      retries: 10
      start_period: 40s
      interval: 30s
```

### Spring Boot 연결 설정
**파일**: `apps/backend/src/main/resources/application.properties`

```properties
# Database Configuration (MySQL)
# 실제 값은 apps/backend/.env 파일에서 관리됨
spring.datasource.url=jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}?useSSL=false&serverTimezone=Asia/Seoul&characterEncoding=UTF-8
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Redis Configuration
spring.data.redis.host=localhost
spring.data.redis.port=6379
```

### MySQL 초기 데이터베이스 구조
**파일**: `docker/mysql/init/01-init-database.sql`

기본 테이블:
- `users`: 사용자 정보
- `projects`: 포트폴리오 프로젝트
- `categories`: 카테고리
- `project_categories`: 프로젝트-카테고리 연결

### MySQL 설정 최적화
**파일**: `docker/mysql/conf/my.cnf`

주요 설정:
- Character Set: utf8mb4
- InnoDB Buffer Pool: 256M
- 타임존: +09:00 (Asia/Seoul)
- 최대 연결수: 200

### Redis 설정
**파일**: `docker/redis/redis.conf`

주요 설정:
- 메모리 제한: 256MB
- 메모리 정책: allkeys-lru
- AOF 활성화
- 데이터베이스 수: 16

## 사용 방법

### 개발 환경 시작
```bash
# Docker Compose로 직접 시작
docker-compose up -d

# 스크립트로 시작 (권장)
./scripts/start-local.sh
```

### 개발 환경 종료
```bash
# Docker Compose로 직접 종료
docker-compose down

# 스크립트로 종료
./scripts/stop-local.sh
```

### 데이터 완전 삭제
```bash
docker-compose down -v
```

### 컨테이너 상태 확인
```bash
docker-compose ps
```

### 로그 확인
```bash
# 전체 로그
docker-compose logs

# 특정 서비스 로그
docker-compose logs mysql
docker-compose logs redis
docker-compose logs adminer
```

## 접속 정보

### 데이터베이스 연결
- **호스트**: localhost
- **포트**: 3307
- **데이터베이스**: pooroom_db
- **사용자**: pooroom_user
- **비밀번호**: [.env 파일 참조]

### Redis 연결
- **호스트**: localhost
- **포트**: 6379

### 관리 도구
- **Adminer**: http://localhost:9080
  - 서버: mysql
  - 사용자명: [.env 파일 참조]
  - 비밀번호: [.env 파일 참조]
  - 데이터베이스: pooroom_db

## 볼륨 관리

### 영구 볼륨
- `mysql_data`: MySQL 데이터 저장
- `redis_data`: Redis 데이터 저장

### 볼륨 확인
```bash
docker volume ls
```

### 볼륨 삭제 (데이터 완전 삭제 시)
```bash
docker volume rm pooroom_mysql_data pooroom_redis_data
```

## 네트워크
- **네트워크명**: pooroom-network
- **타입**: bridge
- 모든 서비스가 동일한 네트워크에서 통신

## 헬스체크

### MySQL
- 명령어: `mysqladmin ping`
- 타임아웃: 20초
- 재시도: 10회
- 시작 대기: 40초

### Redis
- 명령어: `redis-cli ping`
- 타임아웃: 10초
- 재시도: 5회
- 시작 대기: 10초

## 문제 해결

### 포트 충돌 시
기본 MySQL 포트(3306) 대신 3307 사용하므로 로컬 MySQL과 충돌하지 않음

### 컨테이너 재시작
```bash
docker-compose restart [서비스명]
```

### 완전 재구축
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 주의사항

1. **포트 설정**: MySQL은 3307 포트 사용 (Spring Boot 설정과 일치)
2. **문자셋**: 반드시 utf8mb4 사용
3. **타임존**: Asia/Seoul로 통일
4. **환경변수**: 현재 하드코딩, 필요 시 .env 파일 활용 가능
5. **백업**: 중요한 데이터는 정기적으로 백업 필요

## 업데이트 이력

- 2024-08-26: 초기 Docker 설정 구성
- MySQL 8.4.5, Redis 7, Adminer 4.8.1 버전으로 설정
- 포트 3307로 MySQL 설정하여 로컬 충돌 방지