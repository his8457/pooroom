import styled from 'styled-components';
import { colors, spacing, typography, breakpoints, shadows } from '../common.styles';

export const WriteContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.large};
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.medium};
  }
`;

export const WriteHeader = styled.div`
  margin-bottom: ${spacing.xlarge};
  text-align: center;
`;

export const WriteTitle = styled.h1`
  ${typography.h1};
  color: ${colors.text.primary};
  margin: 0;
`;

export const FormContainer = styled.form`
  background-color: white;
  border: 1px solid ${colors.border.light};
  border-radius: 12px;
  padding: ${spacing.xlarge};
  box-shadow: ${shadows.small};
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing.large};
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.small};
  ${typography.body};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${spacing.medium};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  font-size: ${typography.fontSize.medium};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px ${colors.primary.light}20;
  }
  
  &::placeholder {
    color: ${colors.text.muted};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${spacing.medium};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  font-size: ${typography.fontSize.medium};
  resize: vertical;
  min-height: 200px;
  font-family: inherit;
  line-height: 1.6;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px ${colors.primary.light}20;
  }
  
  &::placeholder {
    color: ${colors.text.muted};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${spacing.medium};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  font-size: ${typography.fontSize.medium};
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px ${colors.primary.light}20;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  margin-bottom: ${spacing.large};
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  ${typography.body};
  color: ${colors.text.secondary};
  cursor: pointer;
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing.medium};
  justify-content: flex-end;
  margin-top: ${spacing.xlarge};
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const SubmitButton = styled.button`
  background-color: ${colors.primary.main};
  color: white;
  border: none;
  padding: ${spacing.medium} ${spacing.xlarge};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background-color: ${colors.primary.dark};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  transition: all 0.2s ease;
`;

export const CancelButton = styled.button`
  background-color: transparent;
  color: ${colors.text.secondary};
  border: 1px solid ${colors.border.medium};
  padding: ${spacing.medium} ${spacing.xlarge};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  min-width: 120px;
  
  &:hover {
    background-color: ${colors.background.hover};
    border-color: ${colors.border.dark};
  }
  
  transition: all 0.2s ease;
`;