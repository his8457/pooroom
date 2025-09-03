#!/bin/bash
# === POOROOM EC2 초기 환경 설정 스크립트 ===
# 새로운 EC2 인스턴스에서 최초 1회 실행

set -e  # 오류 발생 시 중단

echo "🚀 POOROOM EC2 환경 설정 시작..."

# 시스템 업데이트
echo "📦 시스템 패키지 업데이트..."
sudo apt update && sudo apt upgrade -y

# Docker 설치
echo "🐳 Docker 설치..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Docker Compose 설치
echo "🐙 Docker Compose 설치..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 사용자를 docker 그룹에 추가
echo "👥 Docker 권한 설정..."
sudo usermod -aG docker $USER

# Git 설치
echo "📂 Git 설치..."
sudo apt install -y git

# 프로젝트 클론 디렉토리 생성
echo "📁 프로젝트 디렉토리 생성..."
mkdir -p /home/ubuntu/pooroom

# 방화벽 설정 (UFW)
echo "🔥 방화벽 설정..."
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 8080
sudo ufw --force enable

# 시스템 리소스 모니터링 도구 설치
echo "📊 모니터링 도구 설치..."
sudo apt install -y htop iotop

# 로그 로테이션 설정
echo "📝 로그 로테이션 설정..."
sudo tee /etc/logrotate.d/pooroom > /dev/null <<EOF
/home/ubuntu/pooroom/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    copytruncate
    notifempty
}
EOF

echo "✅ EC2 환경 설정 완료!"
echo ""
echo "⚠️  다음 단계:"
echo "1. 로그아웃 후 다시 로그인 (Docker 권한 적용)"
echo "2. GitHub에서 프로젝트 클론"
echo "3. 환경변수 파일 설정"
echo "4. Docker Compose 실행"
echo ""
echo "🔄 로그아웃: exit"