-- ===========================================
-- POOROOM 쇼핑몰 초기 데이터 DML
-- ===========================================
-- 생성일: 2024-08-30
-- 버전: 1.0
-- 설명: POOROOM 온라인 쇼핑몰의 초기 데이터 삽입 스크립트

-- 데이터베이스 선택
USE `pooroom_db`;

-- ===========================================
-- 초기 카테고리 데이터
-- ===========================================

-- 1차 카테고리 (메인 카테고리)
INSERT INTO `categories` (`name`, `parent_id`, `level`, `sort_order`, `description`) VALUES
('신상품', NULL, 1, 1, '최신 출시 상품'),
('베스트', NULL, 1, 2, '인기 상품'),
('세일', NULL, 1, 3, '할인 상품'),
('상의', NULL, 1, 4, '상의 전체'),
('하의', NULL, 1, 5, '하의 전체'),
('아우터', NULL, 1, 6, '아우터 전체'),
('원피스', NULL, 1, 7, '원피스'),
('액세서리', NULL, 1, 8, '액세서리 전체'),
('지속가능', NULL, 1, 9, '친환경 상품');

-- 2차 카테고리 (상의 하위)
INSERT INTO `categories` (`name`, `parent_id`, `level`, `sort_order`, `description`) VALUES
('블라우스', 4, 2, 1, '블라우스'),
('셔츠', 4, 2, 2, '셔츠'),
('티셔츠', 4, 2, 3, '티셔츠'),
('니트', 4, 2, 4, '니트웨어');

-- 2차 카테고리 (하의 하위)
INSERT INTO `categories` (`name`, `parent_id`, `level`, `sort_order`, `description`) VALUES
('청바지', 5, 2, 1, '데님 팬츠'),
('슬랙스', 5, 2, 2, '슬랙스'),
('스커트', 5, 2, 3, '스커트'),
('반바지', 5, 2, 4, '반바지');

-- 2차 카테고리 (아우터 하위)
INSERT INTO `categories` (`name`, `parent_id`, `level`, `sort_order`, `description`) VALUES
('재킷', 6, 2, 1, '재킷'),
('코트', 6, 2, 2, '코트'),
('패딩', 6, 2, 3, '패딩'),
('가디건', 6, 2, 4, '가디건');

-- 2차 카테고리 (액세서리 하위)
INSERT INTO `categories` (`name`, `parent_id`, `level`, `sort_order`, `description`) VALUES
('가방', 8, 2, 1, '핸드백, 숄더백 등'),
('신발', 8, 2, 2, '구두, 스니커즈 등'),
('모자', 8, 2, 3, '모자'),
('벨트', 8, 2, 4, '벨트');

-- ===========================================
-- 초기 브랜드 데이터
-- ===========================================

INSERT INTO `brands` (`name`, `description`) VALUES
('POOROOM', 'POOROOM 자체 브랜드'),
('POOROOM BASIC', 'POOROOM 베이직 라인'),
('POOROOM PREMIUM', 'POOROOM 프리미엄 라인');

-- ===========================================
-- 초기 게시판 카테고리 데이터
-- ===========================================

INSERT INTO `board_categories` (`name`, `description`, `is_active`, `sort_order`, `admin_only`) VALUES
('공지사항', '중요한 공지사항을 확인하세요', true, 1, false),
('자유게시판', '자유롭게 소통하는 공간', true, 2, false),
('상품문의', '상품에 대한 궁금한 점을 문의하세요', true, 3, false),
('리뷰', '구매하신 상품의 후기를 남겨주세요', true, 4, false),
('이벤트', '진행 중인 이벤트를 확인하세요', true, 5, false);

-- 초기 데이터 삽입 완료
SELECT 'POOROOM 쇼핑몰 초기 데이터 삽입 완료!' as status;