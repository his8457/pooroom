import React from 'react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { TestContainer, TestSection, TestTitle, SpinnerDemo, TestLabel } from '../styles/pages/spinnerTestPage.styles';

export const SpinnerTestPage: React.FC = () => {
  return (
    <TestContainer>
      <TestTitle>🎨 LoadingSpinner 테스트 페이지</TestTitle>
      
      <TestSection>
        <TestLabel>Ring Spinner (링 스피너)</TestLabel>
        <SpinnerDemo>
          <div>
            <p>Small</p>
            <LoadingSpinner type="ring" size="small" text="작은 링" />
          </div>
          <div>
            <p>Medium</p>
            <LoadingSpinner type="ring" size="medium" text="중간 링" />
          </div>
          <div>
            <p>Large</p>
            <LoadingSpinner type="ring" size="large" text="큰 링" />
          </div>
        </SpinnerDemo>
      </TestSection>

      <TestSection>
        <TestLabel>Dots Spinner (도트 스피너)</TestLabel>
        <SpinnerDemo>
          <div>
            <p>Small</p>
            <LoadingSpinner type="dots" size="small" text="작은 도트" />
          </div>
          <div>
            <p>Medium</p>
            <LoadingSpinner type="dots" size="medium" text="중간 도트" />
          </div>
          <div>
            <p>Large</p>
            <LoadingSpinner type="dots" size="large" text="큰 도트" />
          </div>
        </SpinnerDemo>
      </TestSection>

      <TestSection>
        <TestLabel>버튼 내부 사용 (텍스트 없이)</TestLabel>
        <SpinnerDemo>
          <button style={{ 
            padding: '12px 24px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            minWidth: '120px'
          }}>
            <LoadingSpinner type="dots" size="small" showText={false} />
          </button>
          <button style={{ 
            padding: '12px 24px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            minWidth: '120px'
          }}>
            <LoadingSpinner type="ring" size="small" showText={false} />
          </button>
        </SpinnerDemo>
      </TestSection>

      <TestSection>
        <TestLabel>페이지 로딩 (전체 화면)</TestLabel>
        <div style={{ 
          background: '#f8fafc', 
          padding: '40px', 
          borderRadius: '12px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <LoadingSpinner type="ring" size="large" text="페이지를 불러오는 중..." />
        </div>
      </TestSection>
    </TestContainer>
  );
};