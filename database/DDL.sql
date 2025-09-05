-- ===========================================
-- POOROOM 쇼핑몰 데이터베이스 DDL
-- ===========================================
-- 생성일: 2024-08-30
-- 버전: 1.0
-- 설명: POOROOM 온라인 쇼핑몰의 전체 데이터베이스 스키마

-- 기본 character set 설정
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS `pooroom_db` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `pooroom_db`;

-- ===========================================
-- 사용자 관리 테이블
-- ===========================================

-- 사용자 테이블 (쇼핑몰 고객)
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '고객 고유 ID',
  `email` VARCHAR(100) NOT NULL UNIQUE COMMENT '로그인용 이메일 주소',
  `password` VARCHAR(255) NOT NULL COMMENT '암호화된 비밀번호 (BCrypt)',
  `name` VARCHAR(50) NOT NULL COMMENT '고객 실명 (배송시 사용)',
  `nickname` VARCHAR(100) COMMENT '화면 표시용 닉네임 (선택사항)',
  `phone_number` VARCHAR(20) NOT NULL COMMENT '휴대폰 번호 (배송, 주문 알림용)',
  `birth_date` DATE NOT NULL COMMENT '생년월일 (연령대 분석 및 생일 혜택용)',
  `gender` ENUM('FEMALE', 'MALE', 'OTHER') NOT NULL COMMENT '성별 (타겟 상품 추천용)',
  `profile_image_url` VARCHAR(500) COMMENT '프로필 이미지 URL',
  `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER' COMMENT '사용자 역할 (고객/관리자)',
  `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE' COMMENT '계정 상태 (활성/비활성/정지)',
  `email_verified` BOOLEAN NOT NULL DEFAULT FALSE COMMENT '이메일 인증 완료 여부',
  `phone_verified` BOOLEAN NOT NULL DEFAULT FALSE COMMENT '휴대폰 번호 인증 완료 여부',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '가입일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '마지막 정보 수정일시',
  `last_login_at` TIMESTAMP NULL COMMENT '마지막 로그인 일시 (JWT 로그인 추적용)',
  INDEX `idx_email` (`email`) COMMENT '이메일 검색용 인덱스',
  INDEX `idx_phone` (`phone_number`) COMMENT '휴대폰 번호 검색용 인덱스',
  INDEX `idx_status` (`status`) COMMENT '계정 상태별 검색용 인덱스'
) ENGINE=InnoDB COMMENT='쇼핑몰 고객 정보 테이블';

-- 배송지 테이블
CREATE TABLE IF NOT EXISTS `user_addresses` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '배송지 고유 ID',
  `user_id` BIGINT NOT NULL COMMENT '고객 ID (users 테이블 참조)',
  `name` VARCHAR(50) NOT NULL COMMENT '배송지명 (예: 집, 회사)',
  `recipient` VARCHAR(50) NOT NULL COMMENT '받는 사람 이름',
  `phone` VARCHAR(20) NOT NULL COMMENT '받는 사람 연락처',
  `zipcode` VARCHAR(10) NOT NULL COMMENT '우편번호',
  `address` VARCHAR(200) NOT NULL COMMENT '기본 주소',
  `detail_address` VARCHAR(100) COMMENT '상세 주소 (동/호수 등)',
  `is_default` BOOLEAN DEFAULT FALSE COMMENT '기본 배송지 여부',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '배송지 등록일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '배송지 수정일시',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_id` (`user_id`) COMMENT '고객별 배송지 검색용 인덱스',
  INDEX `idx_default` (`user_id`, `is_default`) COMMENT '기본 배송지 검색용 인덱스'
) ENGINE=InnoDB COMMENT='고객 배송지 정보 테이블';

-- Refresh Token 테이블
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Refresh Token 고유 ID',
  `user_id` BIGINT NOT NULL COMMENT '사용자 ID (users 테이블 참조)',
  `token` VARCHAR(500) NOT NULL UNIQUE COMMENT 'Refresh Token 값',
  `expires_at` TIMESTAMP NOT NULL COMMENT 'Token 만료 일시',
  `is_revoked` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Token 폐기 여부',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Token 생성 일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Token 수정 일시',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_id` (`user_id`) COMMENT '사용자별 토큰 검색용 인덱스',
  INDEX `idx_token` (`token`) COMMENT '토큰 검색용 인덱스',
  INDEX `idx_expires_at` (`expires_at`) COMMENT '만료 시간별 검색용 인덱스',
  INDEX `idx_user_active` (`user_id`, `is_revoked`, `expires_at`) COMMENT '활성 토큰 검색용 복합 인덱스'
) ENGINE=InnoDB COMMENT='JWT Refresh Token 관리 테이블';

-- ===========================================
-- 상품 관리 테이블
-- ===========================================

-- 카테고리 테이블 (의류 카테고리 - 계층형 구조)
CREATE TABLE IF NOT EXISTS `categories` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '카테고리 고유 ID',
  `name` VARCHAR(50) NOT NULL UNIQUE COMMENT '카테고리명 (예: 상의, 블라우스)',
  `parent_id` BIGINT NULL COMMENT '상위 카테고리 ID (1차 카테고리는 NULL)',
  `level` INT NOT NULL DEFAULT 1 COMMENT '카테고리 레벨 (1차=1, 2차=2)',
  `sort_order` INT DEFAULT 0 COMMENT '카테고리 정렬 순서',
  `description` TEXT COMMENT '카테고리 설명',
  `is_active` BOOLEAN DEFAULT TRUE COMMENT '활성 상태 여부',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '카테고리 생성일시',
  FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL,
  INDEX `idx_parent` (`parent_id`) COMMENT '상위 카테고리별 검색용 인덱스',
  INDEX `idx_level` (`level`) COMMENT '레벨별 카테고리 검색용 인덱스',
  INDEX `idx_sort` (`sort_order`) COMMENT '정렬 순서용 인덱스'
) ENGINE=InnoDB COMMENT='상품 카테고리 테이블 (계층형 구조)';

-- 브랜드 테이블
CREATE TABLE IF NOT EXISTS `brands` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '브랜드 고유 ID',
  `name` VARCHAR(100) NOT NULL UNIQUE COMMENT '브랜드명 (예: POOROOM, Nike)',
  `description` TEXT COMMENT '브랜드 설명 및 소개',
  `logo_url` VARCHAR(500) COMMENT '브랜드 로고 이미지 URL',
  `is_active` BOOLEAN DEFAULT TRUE COMMENT '브랜드 활성 상태',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '브랜드 등록일시'
) ENGINE=InnoDB COMMENT='브랜드 정보 테이블';

-- 상품 테이블
CREATE TABLE IF NOT EXISTS `products` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '상품 고유 ID',
  `name` VARCHAR(200) NOT NULL COMMENT '상품명',
  `brand_id` BIGINT NOT NULL COMMENT '브랜드 ID (brands 테이블 참조)',
  `category_id` BIGINT NOT NULL COMMENT '카테고리 ID (categories 테이블 참조)',
  `description` TEXT COMMENT '상품 상세 설명',
  `price` DECIMAL(10,2) NOT NULL COMMENT '판매 가격',
  `discount_price` DECIMAL(10,2) COMMENT '할인 가격 (세일 시 사용)',
  `cost_price` DECIMAL(10,2) COMMENT '원가 (관리용)',
  `stock_quantity` INT NOT NULL DEFAULT 0 COMMENT '재고 수량',
  `sku` VARCHAR(50) UNIQUE COMMENT '상품 고유 코드 (SKU)',
  `status` ENUM('ACTIVE', 'INACTIVE', 'SOLDOUT') DEFAULT 'ACTIVE' COMMENT '상품 상태 (판매중/중단/품절)',
  `is_featured` BOOLEAN DEFAULT FALSE COMMENT '추천 상품 여부',
  `sustainability_score` TINYINT DEFAULT 0 COMMENT '지속가능성 점수 (0-10, 친환경 등급)',
  `material_info` JSON COMMENT '소재 정보 (면, 폴리에스터 비율 등)',
  `size_guide` JSON COMMENT '사이즈 가이드 (S/M/L 치수표)',
  `care_instructions` TEXT COMMENT '세탁 및 관리 방법',
  `main_image_url` VARCHAR(500) COMMENT '상품 메인 이미지 URL',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '상품 등록일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '상품 정보 수정일시',
  FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`),
  INDEX `idx_brand` (`brand_id`) COMMENT '브랜드별 상품 검색용 인덱스',
  INDEX `idx_category` (`category_id`) COMMENT '카테고리별 상품 검색용 인덱스',
  INDEX `idx_status` (`status`) COMMENT '상품 상태별 검색용 인덱스',
  INDEX `idx_featured` (`is_featured`) COMMENT '추천 상품 검색용 인덱스',
  INDEX `idx_price` (`price`) COMMENT '가격 범위별 검색용 인덱스'
) ENGINE=InnoDB COMMENT='상품 정보 테이블';

-- ===========================================
-- 장바구니 관리 테이블
-- ===========================================

-- 장바구니 테이블
CREATE TABLE IF NOT EXISTS `carts` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '장바구니 고유 ID',
  `user_id` BIGINT NOT NULL COMMENT '고객 ID (users 테이블 참조)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '장바구니 생성일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '장바구니 수정일시',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_user_cart` (`user_id`) COMMENT '사용자당 하나의 장바구니'
) ENGINE=InnoDB COMMENT='고객 장바구니 테이블';

-- 장바구니 상품 테이블
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '장바구니 아이템 고유 ID',
  `cart_id` BIGINT NOT NULL COMMENT '장바구니 ID (carts 테이블 참조)',
  `product_id` BIGINT NOT NULL COMMENT '상품 ID (products 테이블 참조)',
  `quantity` INT NOT NULL DEFAULT 1 COMMENT '상품 수량',
  `unit_price` DECIMAL(10,2) NOT NULL COMMENT '담을 당시의 단가 (가격 변동 추적)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '장바구니 담은 일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수량 변경 일시',
  FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_cart_product` (`cart_id`, `product_id`) COMMENT '장바구니당 상품 중복 방지',
  INDEX `idx_cart_id` (`cart_id`) COMMENT '장바구니별 아이템 검색용 인덱스',
  INDEX `idx_product_id` (`product_id`) COMMENT '상품별 장바구니 검색용 인덱스'
) ENGINE=InnoDB COMMENT='장바구니에 담긴 상품 테이블';

-- ===========================================
-- 주문 관리 테이블
-- ===========================================

-- 주문 테이블
CREATE TABLE IF NOT EXISTS `orders` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '주문 고유 ID',
  `user_id` BIGINT NOT NULL COMMENT '주문한 고객 ID (users 테이블 참조)',
  `order_number` VARCHAR(50) NOT NULL UNIQUE COMMENT '주문번호 (고유, 사용자 표시용)',
  `order_status` ENUM('PENDING', 'PAID', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED') 
    NOT NULL DEFAULT 'PENDING' COMMENT '주문 상태',
  
  -- 배송지 정보 스냅샷 (주문 시점 정보 보존)
  `shipping_recipient` VARCHAR(50) NOT NULL COMMENT '받는 사람 이름',
  `shipping_phone` VARCHAR(20) NOT NULL COMMENT '받는 사람 연락처',
  `shipping_zipcode` VARCHAR(10) NOT NULL COMMENT '배송지 우편번호',
  `shipping_address` VARCHAR(200) NOT NULL COMMENT '배송지 기본 주소',
  `shipping_detail_address` VARCHAR(100) COMMENT '배송지 상세 주소',
  
  -- 주문 금액 정보
  `subtotal_amount` DECIMAL(12,2) NOT NULL COMMENT '상품 총 금액',
  `shipping_fee` DECIMAL(8,2) NOT NULL DEFAULT 0 COMMENT '배송비',
  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT '할인 금액',
  `total_amount` DECIMAL(12,2) NOT NULL COMMENT '최종 결제 금액',
  
  -- 결제 정보
  `payment_method` ENUM('CARD', 'BANK_TRANSFER', 'VIRTUAL_ACCOUNT', 'MOBILE_PAYMENT') 
    COMMENT '결제 방법',
  `payment_status` ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED') 
    NOT NULL DEFAULT 'PENDING' COMMENT '결제 상태',
  
  -- 주문 메모 및 요청사항
  `order_memo` TEXT COMMENT '주문 시 요청사항',
  `admin_memo` TEXT COMMENT '관리자 메모',
  
  -- 타임스탬프
  `ordered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '주문 일시',
  `paid_at` TIMESTAMP NULL COMMENT '결제 완료 일시',
  `shipped_at` TIMESTAMP NULL COMMENT '배송 시작 일시',
  `delivered_at` TIMESTAMP NULL COMMENT '배송 완료 일시',
  `cancelled_at` TIMESTAMP NULL COMMENT '주문 취소 일시',
  
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '레코드 생성일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '레코드 수정일시',
  
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT,
  INDEX `idx_user_id` (`user_id`) COMMENT '고객별 주문 검색용 인덱스',
  INDEX `idx_order_number` (`order_number`) COMMENT '주문번호 검색용 인덱스',
  INDEX `idx_order_status` (`order_status`) COMMENT '주문 상태별 검색용 인덱스',
  INDEX `idx_payment_status` (`payment_status`) COMMENT '결제 상태별 검색용 인덱스',
  INDEX `idx_ordered_at` (`ordered_at`) COMMENT '주문일시별 검색용 인덱스'
) ENGINE=InnoDB COMMENT='주문 정보 테이블';

-- 주문 상품 테이블
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '주문 상품 고유 ID',
  `order_id` BIGINT NOT NULL COMMENT '주문 ID (orders 테이블 참조)',
  `product_id` BIGINT NOT NULL COMMENT '상품 ID (products 테이블 참조)',
  
  -- 주문 시점 상품 정보 스냅샷 (상품 정보 변경되어도 주문 내역 보존)
  `product_name` VARCHAR(200) NOT NULL COMMENT '주문 시점 상품명',
  `brand_name` VARCHAR(100) NOT NULL COMMENT '주문 시점 브랜드명',
  `category_name` VARCHAR(50) NOT NULL COMMENT '주문 시점 카테고리명',
  `product_sku` VARCHAR(50) COMMENT '주문 시점 상품 SKU',
  `product_image_url` VARCHAR(500) COMMENT '주문 시점 상품 이미지',
  
  -- 주문 수량 및 가격
  `quantity` INT NOT NULL COMMENT '주문 수량',
  `unit_price` DECIMAL(10,2) NOT NULL COMMENT '주문 시점 단가',
  `total_price` DECIMAL(12,2) NOT NULL COMMENT '해당 상품 총 금액 (unit_price * quantity)',
  
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '주문 상품 생성일시',
  
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT,
  INDEX `idx_order_id` (`order_id`) COMMENT '주문별 상품 검색용 인덱스',
  INDEX `idx_product_id` (`product_id`) COMMENT '상품별 주문 검색용 인덱스'
) ENGINE=InnoDB COMMENT='주문에 포함된 상품 테이블';

-- 결제 정보 테이블
CREATE TABLE IF NOT EXISTS `payments` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '결제 고유 ID',
  `order_id` BIGINT NOT NULL COMMENT '주문 ID (orders 테이블 참조)',
  
  -- PG사 연동 정보
  `payment_key` VARCHAR(200) UNIQUE COMMENT 'PG사 결제 고유키 (토스페이먼츠 paymentKey)',
  `transaction_id` VARCHAR(200) COMMENT 'PG사 거래 ID',
  `pg_provider` ENUM('TOSS', 'IAMPORT', 'KAKAO', 'NAVER') COMMENT 'PG사 구분',
  
  -- 결제 상세 정보
  `payment_method` ENUM('CARD', 'BANK_TRANSFER', 'VIRTUAL_ACCOUNT', 'MOBILE_PAYMENT') 
    NOT NULL COMMENT '결제 방법',
  `payment_status` ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED') 
    NOT NULL DEFAULT 'PENDING' COMMENT '결제 상태',
  
  `amount` DECIMAL(12,2) NOT NULL COMMENT '결제 금액',
  `currency` VARCHAR(3) DEFAULT 'KRW' COMMENT '통화 (KRW, USD 등)',
  
  -- 카드 결제 정보 (PG사에서 제공하는 마스킹된 정보만)
  `card_company` VARCHAR(50) COMMENT '카드사명',
  `card_number_masked` VARCHAR(20) COMMENT '마스킹된 카드번호 (예: **** **** **** 1234)',
  `card_type` ENUM('CREDIT', 'DEBIT', 'GIFT') COMMENT '카드 종류',
  
  -- 가상계좌 정보
  `virtual_account_bank` VARCHAR(50) COMMENT '가상계좌 은행명',
  `virtual_account_number` VARCHAR(50) COMMENT '가상계좌 번호',
  `virtual_account_holder` VARCHAR(50) COMMENT '가상계좌 예금주',
  `virtual_account_due_date` TIMESTAMP COMMENT '가상계좌 입금 마감일',
  
  -- 결제 처리 일시
  `requested_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '결제 요청 일시',
  `approved_at` TIMESTAMP NULL COMMENT '결제 승인 일시',
  `failed_at` TIMESTAMP NULL COMMENT '결제 실패 일시',
  `cancelled_at` TIMESTAMP NULL COMMENT '결제 취소 일시',
  
  -- 실패/취소 사유
  `failure_reason` VARCHAR(500) COMMENT '결제 실패 사유',
  `cancel_reason` VARCHAR(500) COMMENT '결제 취소 사유',
  
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '레코드 생성일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '레코드 수정일시',
  
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  INDEX `idx_order_id` (`order_id`) COMMENT '주문별 결제 검색용 인덱스',
  INDEX `idx_payment_key` (`payment_key`) COMMENT 'PG사 결제키 검색용 인덱스',
  INDEX `idx_payment_status` (`payment_status`) COMMENT '결제 상태별 검색용 인덱스',
  INDEX `idx_requested_at` (`requested_at`) COMMENT '결제 요청일시별 검색용 인덱스'
) ENGINE=InnoDB COMMENT='결제 정보 테이블';

-- 주문 상태 이력 테이블
CREATE TABLE IF NOT EXISTS `order_status_history` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '주문 상태 이력 고유 ID',
  `order_id` BIGINT NOT NULL COMMENT '주문 ID (orders 테이블 참조)',
  `previous_status` ENUM('PENDING', 'PAID', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED') 
    COMMENT '이전 주문 상태',
  `new_status` ENUM('PENDING', 'PAID', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED') 
    NOT NULL COMMENT '변경된 주문 상태',
  `changed_by` BIGINT COMMENT '상태 변경한 사용자 ID (관리자 또는 시스템)',
  `change_reason` VARCHAR(500) COMMENT '상태 변경 사유',
  `admin_note` TEXT COMMENT '관리자 메모',
  `changed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '상태 변경 일시',
  
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`changed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL,
  INDEX `idx_order_id` (`order_id`) COMMENT '주문별 이력 검색용 인덱스',
  INDEX `idx_changed_at` (`changed_at`) COMMENT '변경일시별 검색용 인덱스'
) ENGINE=InnoDB COMMENT='주문 상태 변경 이력 테이블';

-- 배송 추적 테이블
CREATE TABLE IF NOT EXISTS `deliveries` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '배송 고유 ID',
  `order_id` BIGINT NOT NULL COMMENT '주문 ID (orders 테이블 참조)',
  `courier_company` VARCHAR(50) COMMENT '택배사명 (예: CJ대한통운, 한진택배)',
  `tracking_number` VARCHAR(50) COMMENT '송장번호',
  `delivery_status` ENUM('PREPARING', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED') 
    NOT NULL DEFAULT 'PREPARING' COMMENT '배송 상태',
  `estimated_delivery_date` DATE COMMENT '배송 예정일',
  `actual_delivery_date` TIMESTAMP COMMENT '실제 배송 완료 일시',
  `delivery_memo` TEXT COMMENT '배송 메모',
  
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '배송 정보 생성일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '배송 정보 수정일시',
  
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_order_delivery` (`order_id`) COMMENT '주문당 하나의 배송 정보',
  INDEX `idx_tracking_number` (`tracking_number`) COMMENT '송장번호 검색용 인덱스',
  INDEX `idx_delivery_status` (`delivery_status`) COMMENT '배송 상태별 검색용 인덱스'
) ENGINE=InnoDB COMMENT='배송 추적 정보 테이블';

-- ===========================================
-- 게시판 관리 테이블
-- ===========================================

-- 게시판 카테고리 테이블
CREATE TABLE IF NOT EXISTS `board_categories` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '게시판 카테고리 고유 ID',
  `name` VARCHAR(50) NOT NULL UNIQUE COMMENT '게시판 카테고리명 (예: 공지사항, 자유게시판, 상품문의)',
  `description` TEXT COMMENT '게시판 카테고리 설명',
  `is_active` BOOLEAN DEFAULT TRUE COMMENT '게시판 활성 상태',
  `sort_order` INT DEFAULT 0 COMMENT '게시판 정렬 순서',
  `admin_only` BOOLEAN DEFAULT FALSE COMMENT '관리자 전용 게시판 여부',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '게시판 생성일시',
  INDEX `idx_sort_order` (`sort_order`) COMMENT '정렬 순서용 인덱스',
  INDEX `idx_active` (`is_active`) COMMENT '활성 상태별 검색용 인덱스'
) ENGINE=InnoDB COMMENT='게시판 카테고리 테이블';

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS `posts` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '게시글 고유 ID',
  `category_id` BIGINT NOT NULL COMMENT '게시판 카테고리 ID (board_categories 참조)',
  `user_id` BIGINT NOT NULL COMMENT '작성자 ID (users 테이블 참조)',
  `product_id` BIGINT NULL COMMENT '연관 상품 ID (상품문의/리뷰 시 사용)',
  `title` VARCHAR(200) NOT NULL COMMENT '게시글 제목',
  `content` TEXT NOT NULL COMMENT '게시글 내용',
  `view_count` INT DEFAULT 0 COMMENT '조회수',
  `like_count` INT DEFAULT 0 COMMENT '좋아요 수',
  `comment_count` INT DEFAULT 0 COMMENT '댓글 수',
  `is_pinned` BOOLEAN DEFAULT FALSE COMMENT '상단 고정 여부 (공지사항)',
  `is_hidden` BOOLEAN DEFAULT FALSE COMMENT '숨김 처리 여부',
  `status` ENUM('ACTIVE', 'HIDDEN', 'DELETED') DEFAULT 'ACTIVE' COMMENT '게시글 상태',
  
  -- 상품문의 전용 필드
  `is_answered` BOOLEAN DEFAULT FALSE COMMENT '답변 완료 여부 (상품문의)',
  `is_secret` BOOLEAN DEFAULT FALSE COMMENT '비밀글 여부 (상품문의)',
  
  -- 리뷰 전용 필드  
  `rating` TINYINT NULL COMMENT '별점 (1-5, 리뷰 전용)',
  `order_id` BIGINT NULL COMMENT '주문 ID (리뷰 작성 시 참조)',
  
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '게시글 작성일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '게시글 수정일시',
  
  FOREIGN KEY (`category_id`) REFERENCES `board_categories`(`id`) ON DELETE RESTRICT,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE SET NULL,
  
  INDEX `idx_category_id` (`category_id`) COMMENT '게시판별 게시글 검색용 인덱스',
  INDEX `idx_user_id` (`user_id`) COMMENT '작성자별 게시글 검색용 인덱스',
  INDEX `idx_product_id` (`product_id`) COMMENT '상품별 게시글 검색용 인덱스',
  INDEX `idx_status` (`status`) COMMENT '게시글 상태별 검색용 인덱스',
  INDEX `idx_created_at` (`created_at`) COMMENT '작성일시별 검색용 인덱스',
  INDEX `idx_pinned` (`is_pinned`, `created_at`) COMMENT '공지사항 정렬용 인덱스',
  INDEX `idx_category_status` (`category_id`, `status`, `created_at`) COMMENT '게시판별 활성 게시글 검색용 복합 인덱스'
) ENGINE=InnoDB COMMENT='게시글 테이블';

-- 게시글 첨부파일 테이블
CREATE TABLE IF NOT EXISTS `post_attachments` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '첨부파일 고유 ID',
  `post_id` BIGINT NOT NULL COMMENT '게시글 ID (posts 테이블 참조)',
  `original_filename` VARCHAR(255) NOT NULL COMMENT '원본 파일명',
  `stored_filename` VARCHAR(255) NOT NULL COMMENT '저장된 파일명 (UUID)',
  `file_path` VARCHAR(500) NOT NULL COMMENT '파일 저장 경로',
  `file_size` BIGINT NOT NULL COMMENT '파일 크기 (bytes)',
  `file_type` VARCHAR(100) NOT NULL COMMENT 'MIME 타입',
  `download_count` INT DEFAULT 0 COMMENT '다운로드 횟수',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '파일 업로드 일시',
  
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
  INDEX `idx_post_id` (`post_id`) COMMENT '게시글별 첨부파일 검색용 인덱스'
) ENGINE=InnoDB COMMENT='게시글 첨부파일 테이블';

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS `comments` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '댓글 고유 ID',
  `post_id` BIGINT NOT NULL COMMENT '게시글 ID (posts 테이블 참조)',
  `user_id` BIGINT NOT NULL COMMENT '작성자 ID (users 테이블 참조)',
  `parent_id` BIGINT NULL COMMENT '상위 댓글 ID (대댓글인 경우)',
  `content` TEXT NOT NULL COMMENT '댓글 내용',
  `like_count` INT DEFAULT 0 COMMENT '댓글 좋아요 수',
  `status` ENUM('ACTIVE', 'HIDDEN', 'DELETED') DEFAULT 'ACTIVE' COMMENT '댓글 상태',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '댓글 작성일시',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '댓글 수정일시',
  
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`parent_id`) REFERENCES `comments`(`id`) ON DELETE CASCADE,
  
  INDEX `idx_post_id` (`post_id`) COMMENT '게시글별 댓글 검색용 인덱스',
  INDEX `idx_user_id` (`user_id`) COMMENT '작성자별 댓글 검색용 인덱스',
  INDEX `idx_parent_id` (`parent_id`) COMMENT '대댓글 검색용 인덱스',
  INDEX `idx_post_status` (`post_id`, `status`, `created_at`) COMMENT '게시글별 활성 댓글 검색용 복합 인덱스'
) ENGINE=InnoDB COMMENT='댓글 테이블 (대댓글 지원)';

-- 게시글/댓글 좋아요 테이블
CREATE TABLE IF NOT EXISTS `post_likes` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '좋아요 고유 ID',
  `post_id` BIGINT NULL COMMENT '게시글 ID (posts 테이블 참조)',
  `comment_id` BIGINT NULL COMMENT '댓글 ID (comments 테이블 참조)',
  `user_id` BIGINT NOT NULL COMMENT '좋아요한 사용자 ID',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '좋아요 일시',
  
  FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  
  UNIQUE KEY `idx_post_user` (`post_id`, `user_id`) COMMENT '게시글당 사용자별 중복 좋아요 방지',
  UNIQUE KEY `idx_comment_user` (`comment_id`, `user_id`) COMMENT '댓글당 사용자별 중복 좋아요 방지',
  INDEX `idx_user_id` (`user_id`) COMMENT '사용자별 좋아요 검색용 인덱스',
  
  CONSTRAINT `chk_post_or_comment` CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR 
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
) ENGINE=InnoDB COMMENT='게시글/댓글 좋아요 테이블';

-- 스키마 생성 완료
SELECT 'POOROOM 쇼핑몰 데이터베이스 스키마 생성 완료!' as status;