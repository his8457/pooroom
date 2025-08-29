# Docker 설정 치트시트

## 빠른 시작
```bash
# 환경 시작
docker-compose up -d

# 환경 종료  
docker-compose down

# 데이터 삭제하며 종료
docker-compose down -v
```

## 접속 정보
| 서비스 | 주소 | 계정 정보 |
|--------|------|-----------|
| MySQL | localhost:3307 | [.env 파일 참조] |
| Redis | localhost:6379 | (패스워드 없음) |
| Adminer | http://localhost:9080 | [.env 파일의 MySQL 계정 사용] |

## 주요 명령어
```bash
# 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs [서비스명]

# 컨테이너 재시작
docker-compose restart [서비스명]

# MySQL 접속
docker exec -it pooroom-mysql mysql -u ${DB_USERNAME} -p

# Redis 접속
docker exec -it pooroom-redis redis-cli
```

## 파일 구조
```
docker/
├── mysql/
│   ├── conf/my.cnf           # MySQL 설정
│   └── init/01-init-database.sql  # 초기 DB 스크립트
└── redis/
    └── redis.conf            # Redis 설정

scripts/
├── start-local.sh            # 로컬 환경 시작
└── stop-local.sh             # 로컬 환경 종료
```

## Spring Boot 설정
```properties
# MySQL 연결 (포트 3307 주의!)
# 실제 값은 apps/backend/.env 파일에서 관리됨
spring.datasource.url=jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# Redis 연결
spring.data.redis.host=${REDIS_HOST}
spring.data.redis.port=${REDIS_PORT}
```

## 문제 해결
- **포트 충돌**: MySQL 3307 포트 사용으로 기본 3306과 분리
- **문자셋 오류**: utf8mb4 설정됨
- **타임존**: Asia/Seoul로 설정됨
- **헬스체크**: MySQL 40초, Redis 10초 대기시간