package com.pooroom.domain.chat.service;

import com.pooroom.domain.chat.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final RestTemplate restTemplate = new RestTemplate();
    
    @Value("${openai.api.key:}")
    private String openaiApiKey;
    
    @Value("${openai.api.url:https://api.openai.com/v1/chat/completions}")
    private String openaiApiUrl;

    public ChatResponse sendMessage(String userMessage, String userEmail) {
        if (openaiApiKey.isEmpty()) {
            log.warn("OpenAI API 키가 설정되지 않음, 기본 응답 반환");
            return getFallbackResponse(userMessage);
        }

        try {
            return callOpenAiApi(userMessage, userEmail);
        } catch (Exception e) {
            log.error("OpenAI API 호출 실패: {}", e.getMessage());
            return getFallbackResponse(userMessage);
        }
    }

    private ChatResponse callOpenAiApi(String userMessage, String userEmail) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        String systemPrompt = """
                당신은 POOROOM 온라인 쇼핑몰의 고객 지원 챗봇입니다.
                
                # 브랜드 정보
                - POOROOM: 20-30대 여성을 위한 트렌디한 패션 쇼핑몰
                - 모바일 퍼스트 디자인으로 언제 어디서나 쇼핑 가능
                - 개인화된 상품 추천과 큐레이션 서비스 제공
                
                # 상품 카테고리
                1. 의류: 티셔츠, 블라우스, 원피스, 팬츠, 스커트, 아우터
                2. 액세서리: 가방, 지갑, 주얼리, 선글라스, 시계
                3. 신발: 플랫, 힐, 부츠, 스니커즈, 샌들
                4. 뷰티: 스킨케어, 메이크업, 헤어케어, 향수
                
                # 서비스 정책
                - 배송: 평일 오후 2시 이전 주문 시 당일 발송, 일반적으로 2-3일 배송
                - 배송비: 30,000원 이상 구매 시 무료배송
                - 교환/환불: 배송완료 후 7일 이내, 단순변심 가능
                - 사이즈 교환: 1회 무료, 배송비 고객 부담
                - 적립금: 구매 시 1% 적립, 3,000원 이상 사용 가능
                
                # 회원 혜택
                - 신규가입: 즉시 10% 할인쿠폰 지급
                - 생일 혜택: 생일월 20% 특별 할인
                - VIP 등급: 월 구매 10만원 이상 시 무료배송 + 5% 추가 할인
                
                # 고객센터 정보
                - 운영시간: 평일 09:00-18:00 (점심시간 12:00-13:00 제외)
                - 전화: 1588-0000
                - 게시판 문의: 상품문의, 주문문의 게시판 24시간 가능
                
                # 답변 가이드라인
                - 친근하고 상냥한 톤으로 응답 (반말 사용, 이모지 활용)
                - 2-3문장으로 간결하게 답변
                - 구체적 정보 필요 시 게시판 문의나 고객센터 연결
                - 상품 추천 시 트렌드와 개성을 고려한 제안
                - 모르는 정보는 솔직히 인정하고 적절한 안내 제공
                """;

        Map<String, Object> requestBody = Map.of(
            "model", "gpt-4o-mini",
            "messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userMessage)
            ),
            "max_tokens", 200,
            "temperature", 0.7
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        
        ResponseEntity<Map> response = restTemplate.postForEntity(openaiApiUrl, request, Map.class);
        
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            
            if (!choices.isEmpty()) {
                Map<String, Object> firstChoice = choices.get(0);
                Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");
                String content = (String) message.get("content");
                
                return ChatResponse.bot(content.trim());
            }
        }
        
        return getFallbackResponse(userMessage);
    }

    private ChatResponse getFallbackResponse(String userMessage) {
        String message = userMessage.toLowerCase();
        
        if (message.contains("배송") || message.contains("언제")) {
            return ChatResponse.bot("배송은 주문 후 2-3일 소요됩니다. 📦\n자세한 배송 조회는 마이페이지 > 주문내역에서 확인 가능해요!");
        }
        
        if (message.contains("사이즈") || message.contains("크기")) {
            return ChatResponse.bot("상품 상세페이지에서 사이즈 가이드를 확인하실 수 있어요! 📏\n궁금한 점이 있으시면 상품문의 게시판을 이용해주세요.");
        }
        
        if (message.contains("환불") || message.contains("교환")) {
            return ChatResponse.bot("교환/환불은 배송완료 후 7일 이내 가능합니다. 💫\n마이페이지에서 신청하시거나 고객센터로 연락주세요!");
        }
        
        if (message.contains("회원가입") || message.contains("로그인")) {
            return ChatResponse.bot("회원가입은 이메일로 간편하게! ✨\n로그인 문제가 있으시면 비밀번호 찾기를 이용해보세요.");
        }
        
        if (message.contains("할인") || message.contains("이벤트") || message.contains("세일")) {
            return ChatResponse.bot("현재 진행 중인 이벤트는 메인페이지와 이벤트 게시판에서 확인하세요! 🎉\n신규회원 10% 할인도 놓치지 마세요!");
        }
        
        return ChatResponse.bot("안녕하세요! POOROOM 고객지원팀입니다. 😊\n\n더 자세한 문의는 게시판 > 상품문의를 이용해주시거나\n고객센터(1588-0000)로 연락주세요!");
    }
}