import React from 'react';
import { 
  FooterContainer, 
  FooterContent, 
  FooterSection, 
  FooterTitle, 
  FooterList, 
  FooterLink, 
  CompanyInfo, 
  Copyright 
} from '../../styles/layout/footer.styles';

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>고객센터</FooterTitle>
          <FooterList>
            <li><FooterLink type="button">FAQ</FooterLink></li>
            <li><FooterLink type="button">1:1 문의</FooterLink></li>
            <li><FooterLink type="button">배송조회</FooterLink></li>
            <li><FooterLink type="button">반품/교환</FooterLink></li>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>쇼핑정보</FooterTitle>
          <FooterList>
            <li><FooterLink type="button">이용약관</FooterLink></li>
            <li><FooterLink type="button">개인정보처리방침</FooterLink></li>
            <li><FooterLink type="button">청소년보호정책</FooterLink></li>
            <li><FooterLink type="button">사업자정보</FooterLink></li>
          </FooterList>
        </FooterSection>

        <FooterSection>
          <FooterTitle>POOROOM</FooterTitle>
          <CompanyInfo>
            <p>㈜푸룸</p>
            <p>대표이사: 홍길동</p>
            <p>사업자등록번호: 123-45-67890</p>
            <p>통신판매업신고: 2024-서울강남-1234</p>
            <p>주소: 서울특별시 강남구 테헤란로 123</p>
            <p>이메일: support@pooroom.com</p>
          </CompanyInfo>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © 2024 POOROOM. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};