#!/bin/bash

# pooroom 프로젝트 로컬 환경 중지 스크립트

echo "=== pooroom 로컬 환경 중지 ==="

# Docker 컨테이너 중지 및 제거
echo "Docker 컨테이너를 중지합니다..."
docker-compose down

echo "✅ 로컬 환경이 중지되었습니다!"
echo ""
echo "데이터를 완전히 삭제하려면:"
echo "docker-compose down -v"