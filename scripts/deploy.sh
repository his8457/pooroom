#!/bin/bash
# === POOROOM EC2 배포 스크립트 ===
# GitHub Actions에서 호출되거나 수동 배포 시 사용

set -e  # 오류 발생 시 중단

echo "🚀 POOROOM 배포 시작..."

# 프로젝트 디렉토리로 이동
cd /home/ubuntu/pooroom

# Git 최신 코드 pull
echo "📂 최신 코드 업데이트..."
git pull origin main

# 환경변수 설정 확인
if [ ! -f .env ]; then
    echo "⚠️  .env 파일이 없습니다. .env.production을 복사합니다."
    cp .env.production .env
fi

# 기존 컨테이너 정리
echo "🛑 기존 컨테이너 중지..."
docker compose down --remove-orphans

# Docker 시스템 정리 (디스크 공간 확보)
echo "🧹 Docker 시스템 정리..."
docker system prune -f

# 새 이미지 빌드 및 실행
echo "🐳 새 컨테이너 빌드 및 실행..."
docker compose -f docker-compose.prod.yml up --build -d

# 컨테이너 시작 대기
echo "⏳ 서비스 시작 대기..."
sleep 30

# 헬스체크
echo "🔍 서비스 상태 확인..."

# MySQL 헬스체크
echo "  - MySQL 상태 확인..."
docker compose exec -T mysql mysqladmin ping -h localhost -u root -p$MYSQL_ROOT_PASSWORD

# Redis 헬스체크  
echo "  - Redis 상태 확인..."
docker compose exec -T redis redis-cli ping

# Backend 헬스체크
echo "  - Backend API 상태 확인..."
for i in {1..10}; do
    if curl -f http://localhost:8080/api/health; then
        echo "✅ Backend API 정상 응답"
        break
    fi
    echo "⏳ Backend 시작 대기 중... ($i/10)"
    sleep 10
done

# Nginx 헬스체크
echo "  - Nginx 프록시 확인..."
if curl -f http://localhost/api/health; then
    echo "✅ Nginx 프록시 정상 동작"
else
    echo "❌ Nginx 프록시 오류"
    exit 1
fi

# 최종 상태 출력
echo ""
echo "📊 최종 컨테이너 상태:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "🎉 POOROOM 배포 완료!"
echo ""
echo "📍 접속 URL:"
echo "  - API: http://$(curl -s http://checkip.amazonaws.com):80/api/health"
echo "  - Grafana: http://$(curl -s http://checkip.amazonaws.com):3000"
echo "  - Prometheus: http://$(curl -s http://checkip.amazonaws.com):9090"