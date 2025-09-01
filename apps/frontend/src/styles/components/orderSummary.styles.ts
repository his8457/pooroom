import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius } from '../common.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const ItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const OrderItem = styled.div`
  display: flex;
  gap: ${spacing.md};
  padding: ${spacing.md};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.sm};
  background-color: ${colors.background.light};
`;

export const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${borderRadius.sm};
  overflow: hidden;
  background-color: ${colors.border.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  > div {
    width: 24px;
    height: 24px;
    background-color: ${colors.text.muted};
    border-radius: 2px;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const ItemName = styled.div`
  font-size: ${fontSize.base};
  font-weight: 500;
  color: ${colors.text.primary};
  line-height: 1.4;
`;

export const ItemPrice = styled.div`
  font-size: ${fontSize.base};
  font-weight: 600;
  color: ${colors.primary.main};
`;

export const ItemQuantity = styled.div`
  font-size: ${fontSize.sm};
  color: ${colors.text.secondary};
`;

export const MemoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const MemoLabel = styled.label`
  font-size: ${fontSize.sm};
  font-weight: 500;
  color: ${colors.text.primary};
`;

export const MemoTextarea = styled.textarea`
  padding: ${spacing.md};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSize.base};
  background-color: ${colors.background.white};
  resize: vertical;
  min-height: 80px;
  max-height: 120px;
  line-height: 1.4;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: ${colors.text.muted};
  }
`;

export const PriceSection = styled.div`
  padding: ${spacing.lg};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.md};
  background-color: ${colors.background.light};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceLabel = styled.span`
  font-size: ${fontSize.base};
  color: ${colors.text.secondary};
`;

export const PriceValue = styled.span`
  font-size: ${fontSize.base};
  font-weight: 500;
  color: ${colors.text.primary};
`;

export const TotalPrice = styled(PriceRow)`
  padding-top: ${spacing.md};
  border-top: 1px solid ${colors.border.normal};
  
  ${PriceLabel} {
    font-size: ${fontSize.lg};
    font-weight: 600;
    color: ${colors.text.primary};
  }
  
  ${PriceValue} {
    font-size: ${fontSize.lg};
    font-weight: 700;
    color: ${colors.primary.main};
  }
`;