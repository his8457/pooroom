import styled from 'styled-components';

// 공통 색상 시스템
export const colors = {
  primary: {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    main: '#667eea',
    dark: '#764ba2',
    light: '#8b94f7',
  },
  primaryDark: '#764ba2',
  accent: '#ef4444',
  danger: '#ef4444',
  text: {
    primary: '#374151',
    secondary: '#6b7280',
    muted: '#9ca3af',
    inverse: '#ffffff',
    disabled: '#9ca3af',
    placeholder: '#9ca3af',
  },
  border: {
    normal: '#e5e7eb',
    error: '#ef4444',
    light: '#e5e7eb',
    hover: '#d1d5db',
    primary: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
  background: {
    light: '#fafafa',
    white: '#ffffff',
    card: '#ffffff',
    hover: '#f9fafb',
    disabled: '#f3f4f6',
    primary: '#ffffff',
    secondary: '#f9fafb',
    normal: '#ffffff',
    medium: '#f3f4f6',
    dark: '#374151',
  },
  error: '#ef4444',
  success: '#10b981',
  secondary: {
    main: '#6b7280',
    dark: '#4b5563',
    light: '#9ca3af',
  },
  status: {
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
  },
};

// 공통 스페이싱
export const spacing = {
  xs: '4px',
  small: '8px',
  sm: '8px',
  medium: '16px',
  md: '16px',
  large: '24px',
  lg: '24px',
  xlarge: '32px',
  xl: '32px',
  xxl: '48px',
};

// 공통 border radius
export const borderRadius = {
  small: '8px',
  sm: '8px',
  medium: '12px',
  md: '12px',
  large: '16px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  full: '50%',
};

// 공통 폰트 크기
export const fontSize = {
  xs: '0.75rem',
  xsmall: '0.75rem',
  xxsmall: '0.75rem',
  small: '0.875rem',
  sm: '0.875rem',
  base: '1rem',
  medium: '1rem',
  lg: '1.125rem',
  large: '1.125rem',
  xl: '1.25rem',
  xlarge: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
};

// 공통 타이포그래피
export const typography = {
  h1: `
    font-size: ${fontSize['2xl']};
    font-weight: 700;
    line-height: 1.2;
  `,
  h2: `
    font-size: ${fontSize.xl};
    font-weight: 600;
    line-height: 1.3;
  `,
  h3: `
    font-size: ${fontSize.lg};
    font-weight: 600;
    line-height: 1.4;
  `,
  body: `
    font-size: ${fontSize.base};
    font-weight: 400;
    line-height: 1.6;
  `,
  fontSize,
};

// 공통 박스 쉐도우
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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

// 공통 전환 효과
export const transitions = {
  fast: 'all 0.2s ease',
  medium: 'all 0.3s ease',
  slow: 'all 0.5s ease',
};

// 반응형 브레이크포인트
export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px',
};