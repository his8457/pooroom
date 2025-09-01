import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows } from '../common.styles';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background.light};
`;

export const Content = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.lg};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${spacing.lg};
`;

export const Title = styled.h1`
  font-size: ${fontSize.xl};
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.md};
`;

export const Message = styled.p`
  font-size: ${fontSize.base};
  color: ${colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${spacing.xl};
`;

export const OrderInfo = styled.div`
  width: 100%;
  background-color: ${colors.background.white};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.md};
  padding: ${spacing.lg};
  margin-bottom: ${spacing.xl};
  box-shadow: ${shadows.sm};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.div`
  font-size: ${fontSize.sm};
  font-weight: 600;
  color: ${colors.text.secondary};
  min-width: 80px;
  text-align: left;
  margin-right: ${spacing.md};
  flex-shrink: 0;
`;

export const InfoValue = styled.div`
  font-size: ${fontSize.base};
  color: ${colors.text.primary};
  line-height: 1.4;
  text-align: left;
  flex: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  width: 100%;
  max-width: 400px;
`;

export const ContinueShoppingButton = styled.button`
  flex: 1;
  padding: ${spacing.md} ${spacing.lg};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.md};
  background-color: ${colors.background.white};
  color: ${colors.text.primary};
  font-size: ${fontSize.base};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${colors.primary.main};
    color: ${colors.primary.main};
    box-shadow: ${shadows.sm};
  }
`;

export const OrderHistoryButton = styled.button`
  flex: 1;
  padding: ${spacing.md} ${spacing.lg};
  border: none;
  border-radius: ${borderRadius.md};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  font-size: ${fontSize.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${shadows.sm};
  
  &:hover {
    background-color: ${colors.primary.dark};
    box-shadow: ${shadows.md};
  }
`;