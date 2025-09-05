# 멀티스테이지 빌드를 사용하여 프론트엔드 빌드 및 Nginx 서빙
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스코드 복사
COPY . .

# 프론트엔드 빌드
RUN npm run build

# Nginx를 사용하여 정적 파일 서빙
FROM nginx:alpine

# 빌드된 파일을 Nginx의 기본 경로로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 파일 복사 (SPA 라우팅을 위한 설정)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 80 노출
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]