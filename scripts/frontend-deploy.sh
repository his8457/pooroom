#!/bin/bash
# === POOROOM 프론트엔드 S3 배포 스크립트 ===
# React 앱을 S3 + CloudFront에 배포

set -e  # 오류 발생 시 중단

echo "🌐 POOROOM 프론트엔드 배포 시작..."

# 프론트엔드 디렉토리로 이동
cd apps/frontend

# 의존성 설치
echo "📦 의존성 설치..."
npm ci

# 프로덕션 빌드
echo "🔨 프로덕션 빌드..."
npm run build

# 타입 체크
echo "🔍 타입 체크..."
npm run type-check

# 빌드 결과 확인
if [ ! -d "dist" ]; then
    echo "❌ 빌드 실패: dist 디렉토리가 생성되지 않았습니다."
    exit 1
fi

echo "✅ 빌드 완료! dist 디렉토리 생성됨"

# S3 업로드 (AWS CLI 필요)
if command -v aws &> /dev/null; then
    echo "☁️  S3 업로드 시작..."
    
    # S3 버킷 동기화
    aws s3 sync dist/ s3://${S3_BUCKET_NAME} --delete --cache-control max-age=31536000
    
    # index.html은 캐시 안함
    aws s3 cp dist/index.html s3://${S3_BUCKET_NAME}/index.html --cache-control no-cache
    
    echo "📡 CloudFront 캐시 무효화..."
    aws cloudfront create-invalidation \
        --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
        --paths "/*"
    
    echo "🎉 프론트엔드 배포 완료!"
else
    echo "⚠️  AWS CLI가 설치되지 않았습니다."
    echo "dist 폴더를 수동으로 S3에 업로드해주세요."
fi

echo ""
echo "📂 빌드 파일 위치: $(pwd)/dist"
echo "📊 빌드 파일 크기:"
du -sh dist/