import styled from 'styled-components';
import { colors, spacing, borderRadius, fontSize, shadows } from '../../styles/common.styles';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primary.gradient};
  padding: ${spacing.lg};
`;

export const FormCard = styled.div`
  background: ${colors.background.white};
  border-radius: ${borderRadius.xxl};
  padding: ${spacing.xxl};
  width: 100%;
  max-width: 420px;
  box-shadow: ${shadows['2xl']};
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Title = styled.h1`
  font-size: ${fontSize['4xl']};
  font-weight: 700;
  text-align: center;
  margin-bottom: ${spacing.sm};
  background: ${colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  color: ${colors.text.secondary};
  text-align: center;
  margin-bottom: ${spacing.xl};
  font-size: ${fontSize.lg};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${colors.text.primary};
  font-size: ${fontSize.sm};
`;

export const Input = styled.input<{ hasError?: boolean }>`
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

export const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: ${fontSize.xs};
  margin-top: ${spacing.xs};
`;

export const SubmitButton = styled.button<{ isLoading?: boolean }>`
  background: ${colors.primary.gradient};
  color: white;
  border: none;
  border-radius: ${borderRadius.md};
  padding: ${spacing.md} ${spacing.lg};
  font-size: ${fontSize.lg};
  font-weight: 600;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  margin-top: ${spacing.sm};
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

export const SignUpLink = styled.div`
  text-align: center;
  margin-top: ${spacing.lg};
  color: ${colors.text.secondary};
  
  a {
    color: ${colors.primary.main};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;