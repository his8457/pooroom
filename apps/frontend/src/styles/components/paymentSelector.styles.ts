import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows } from '../common.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const PaymentOption = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: ${spacing.lg};
  border: 2px solid ${props => props.isSelected ? colors.primary.main : colors.border.normal};
  border-radius: ${borderRadius.md};
  background-color: ${props => props.isSelected ? '#fef7f0' : colors.background.white};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.primary.main};
    box-shadow: ${shadows.sm};
  }
`;

export const PaymentIcon = styled.div`
  font-size: 24px;
  margin-right: ${spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

export const PaymentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const PaymentName = styled.div`
  font-size: ${fontSize.base};
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const PaymentDescription = styled.div`
  font-size: ${fontSize.sm};
  color: ${colors.text.secondary};
`;

export const RadioButton = styled.div<{ isSelected: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.isSelected ? colors.primary.main : colors.border.normal};
  border-radius: 50%;
  background-color: ${colors.background.white};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  > div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.isSelected ? colors.primary.main : 'transparent'};
    transition: background-color 0.2s ease;
  }
`;