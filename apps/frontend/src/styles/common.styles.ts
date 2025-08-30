import styled from 'styled-components';

// 공통 색상 시스템
export const colors = {
  primary: {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    main: '#667eea',
    dark: '#764ba2',
  },
  text: {
    primary: '#374151',
    secondary: '#6b7280',
    muted: '#9ca3af',
  },
  border: {
    normal: '#e5e7eb',
    error: '#ef4444',
  },
  background: {
    light: '#fafafa',
    white: '#ffffff',
  },
  error: '#ef4444',
  success: '#10b981',
};

// 공통 스페이싱
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

// 공통 border radius
export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
};

// 공통 폰트 크기
export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
};

// 공통 박스 쉐도우
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  focus: () => `0 0 0 3px rgba(102, 126, 234, 0.1)`,
  focusError: '0 0 0 3px rgba(239, 68, 68, 0.1)',
};

// 공통 Input 스타일 컴포넌트
export const BaseInput = styled.input<{ hasError?: boolean }>`
  padding: ${spacing.md};
  border: 2px solid ${props => props.hasError ? colors.border.error : colors.border.normal};
  border-radius: ${borderRadius.md};
  font-size: ${fontSize.base};
  transition: all 0.2s ease;
  background: ${colors.background.light};

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? colors.border.error : colors.primary.main};
    background: ${colors.background.white};
    box-shadow: ${props => props.hasError ? shadows.focusError : shadows.focus()};
  }

  &::placeholder {
    color: ${colors.text.muted};
  }
`;

// 공통 Button 스타일 컴포넌트
export const PrimaryButton = styled.button<{ isLoading?: boolean; size?: 'sm' | 'md' | 'lg' }>`
  background: ${colors.primary.gradient};
  color: white;
  border: none;
  border-radius: ${borderRadius.md};
  padding: ${props => {
    switch (props.size) {
      case 'sm': return `${spacing.sm} ${spacing.md}`;
      case 'lg': return `${spacing.lg} ${spacing.xl}`;
      default: return `${spacing.md} ${spacing.lg}`;
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'sm': return fontSize.sm;
      case 'lg': return fontSize.xl;
      default: return fontSize.lg;
    }
  }};
  font-weight: 600;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${props => props.isLoading ? 0.7 : 1};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// 공통 Label 스타일 컴포넌트
export const BaseLabel = styled.label`
  font-weight: 600;
  color: ${colors.text.primary};
  font-size: ${fontSize.sm};
`;

// 공통 ErrorMessage 스타일 컴포넌트
export const BaseErrorMessage = styled.span`
  color: ${colors.error};
  font-size: ${fontSize.xs};
  margin-top: ${spacing.xs};
`;

// 공통 Form 레이아웃 컴포넌트
export const BaseForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const BaseInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;