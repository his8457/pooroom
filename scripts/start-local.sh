#!/bin/bash

# pooroom 프로젝트 로컬 환경 시작 스크립트

echo "=== pooroom 로컬 환경 시작 ==="

# Docker 컨테이너 시작
echo "Docker 컨테이너를 시작합니다..."
docker-compose up -d

# 컨테이너 상태 확인
echo "컨테이너 상태를 확인합니다..."
docker-compose ps

# MySQL 연결 대기
echo "MySQL 연결을 기다립니다..."
until docker exec pooroom-mysql mysqladmin ping -h "127.0.0.1" -u root -p${MYSQL_ROOT_PASSWORD} --silent; do
    echo "MySQL이 준비되지 않았습니다. 5초 후 재시도..."
    sleep 5
done

echo "✅ MySQL이 준비되었습니다!"

# Redis 연결 확인
echo "Redis 연결을 확인합니다..."
until docker exec pooroom-redis redis-cli ping | grep -q PONG; do
    echo "Redis가 준비되지 않았습니다. 3초 후 재시도..."
    sleep 3
done

echo "✅ Redis가 준비되었습니다!"

echo ""
echo "=== 로컬 환경이 준비되었습니다! ===="
echo "🗄️  MySQL: localhost:${DB_PORT:-3307}"
echo "   - Database: ${DB_NAME:-pooroom_db}"
echo "   - User: ${DB_USERNAME}"
echo "   - Password: [환경변수에서 로드됨]"
echo ""
echo "📦 Redis: localhost:${REDIS_PORT:-6379}"
echo ""
echo "🔧 Adminer (DB 관리): http://localhost:9080"
echo ""
echo "컨테이너를 중지하려면: docker-compose down"