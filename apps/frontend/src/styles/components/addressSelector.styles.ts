import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows } from '../common.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const AddressCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${spacing.lg};
  border: 2px solid ${props => props.isSelected ? colors.primary.main : colors.border.normal};
  border-radius: ${borderRadius.md};
  background-color: ${props => props.isSelected ? '#fef7f0' : colors.background.white};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.primary.main};
    box-shadow: ${shadows.sm};
  }
`;

export const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  flex: 1;
`;

export const AddressLabel = styled.div`
  font-size: ${fontSize.base};
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const AddressText = styled.div`
  font-size: ${fontSize.sm};
  color: ${colors.text.secondary};
  line-height: 1.4;
`;

export const SelectButton = styled.button<{ isSelected: boolean }>`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${props => props.isSelected ? colors.primary.main : colors.border.normal};
  border-radius: ${borderRadius.sm};
  background-color: ${props => props.isSelected ? colors.primary.main : colors.background.white};
  color: ${props => props.isSelected ? colors.text.inverse : colors.text.primary};
  font-size: ${fontSize.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 60px;
  
  &:hover {
    background-color: ${props => props.isSelected ? colors.primary.dark : colors.background.hover};
  }
`;

export const AddNewButton = styled.button`
  padding: ${spacing.lg};
  border: 2px dashed ${colors.border.normal};
  border-radius: ${borderRadius.md};
  background-color: ${colors.background.light};
  color: ${colors.text.secondary};
  font-size: ${fontSize.base};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.primary.main};
    color: ${colors.primary.main};
    background-color: #fef7f0;
  }
`;

export const AddressForm = styled.div`
  padding: ${spacing.lg};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.md};
  background-color: ${colors.background.light};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const Label = styled.label`
  font-size: ${fontSize.sm};
  font-weight: 500;
  color: ${colors.text.primary};
`;

export const Input = styled.input`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSize.base};
  background-color: ${colors.background.white};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: ${colors.text.muted};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-top: ${spacing.sm};
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.sm};
  background-color: ${colors.background.white};
  color: ${colors.text.secondary};
  font-size: ${fontSize.base};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.text.secondary};
    color: ${colors.text.primary};
  }
`;

export const SaveButton = styled.button`
  flex: 1;
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.sm};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  font-size: ${fontSize.base};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${colors.primary.dark};
  }
  
  &:disabled {
    background-color: ${colors.border.normal};
    cursor: not-allowed;
  }
`;

export const AddressSearchGroup = styled.div`
  display: flex;
  gap: ${spacing.sm};
  align-items: center;
`;

export const SearchButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.primary.main};
  border-radius: ${borderRadius.sm};
  background-color: ${colors.background.white};
  color: ${colors.primary.main};
  font-size: ${fontSize.sm};
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background-color: ${colors.primary.main};
    color: ${colors.text.inverse};
  }
  
  &:active {
    transform: translateY(1px);
  }
`;