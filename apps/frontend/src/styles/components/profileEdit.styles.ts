import styled from 'styled-components';
import { colors, spacing, typography, breakpoints } from '../common.styles';

export const ProfileEditContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h3 {
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.text.primary};
    margin-bottom: ${spacing.lg};
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const Label = styled.label`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
`;

export const Input = styled.input<{ hasError?: boolean }>`
  padding: ${spacing.md};
  border: 2px solid ${props => props.hasError ? colors.status.error : colors.border.primary};
  border-radius: 8px;
  font-size: ${typography.fontSize.md};
  background-color: ${colors.background.primary};
  color: ${colors.text.primary};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? colors.status.error : colors.primary.main};
  }

  &::placeholder {
    color: ${colors.text.placeholder};
  }

  &:disabled {
    background-color: ${colors.background.disabled};
    color: ${colors.text.disabled};
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  padding: ${spacing.md};
  border: 2px solid ${colors.border.primary};
  border-radius: 8px;
  font-size: ${typography.fontSize.md};
  background-color: ${colors.background.primary};
  color: ${colors.text.primary};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
  }

  &:disabled {
    background-color: ${colors.background.disabled};
    color: ${colors.text.disabled};
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: ${spacing.md};
  border: 2px solid ${props => props.hasError ? colors.status.error : colors.border.primary};
  border-radius: 8px;
  font-size: ${typography.fontSize.md};
  background-color: ${colors.background.primary};
  color: ${colors.text.primary};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? colors.status.error : colors.primary.main};
  }

  &::placeholder {
    color: ${colors.text.placeholder};
  }

  &:disabled {
    background-color: ${colors.background.disabled};
    color: ${colors.text.disabled};
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  justify-content: flex-end;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const SaveButton = styled.button`
  padding: ${spacing.md} ${spacing.xl};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  border: none;
  border-radius: 8px;
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  min-height: 48px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${colors.primary.dark};
  }

  &:disabled {
    background-color: ${colors.background.disabled};
    color: ${colors.text.disabled};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const CancelButton = styled.button`
  padding: ${spacing.md} ${spacing.xl};
  background-color: ${colors.background.secondary};
  color: ${colors.text.primary};
  border: 2px solid ${colors.border.primary};
  border-radius: 8px;
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  min-height: 48px;
  min-width: 120px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.background.hover};
    border-color: ${colors.border.hover};
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${typography.fontSize.sm};
  color: ${colors.status.error};
  margin-top: 4px;
`;