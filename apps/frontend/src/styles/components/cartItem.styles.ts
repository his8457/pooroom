import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, transitions, breakpoints } from '../common.styles';

export const CartItemContainer = styled.div`
  display: flex;
  gap: ${spacing.medium};
  padding: ${spacing.medium};
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.medium};
  background-color: ${colors.background.card};
  margin-bottom: ${spacing.medium};
  transition: ${transitions.fast};

  &:hover {
    border-color: ${colors.border.hover};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: ${spacing.small};
    padding: ${spacing.small};
  }
`;

export const ProductImage = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: ${borderRadius.medium};
  overflow: hidden;
  background-color: ${colors.background.light};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 80px;
    height: 80px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
`;

export const BrandName = styled.div`
  font-size: ${fontSize.small};
  color: ${colors.text.secondary};
  font-weight: 500;
`;

export const ProductName = styled.div`
  font-size: ${fontSize.medium};
  color: ${colors.text.primary};
  font-weight: 600;
  line-height: 1.4;
`;

export const ProductPrice = styled.div`
  display: flex;
  gap: ${spacing.xs};
  align-items: center;

  .original-price {
    font-size: ${fontSize.small};
    color: ${colors.text.secondary};
    text-decoration: line-through;
  }

  .current-price {
    font-size: ${fontSize.medium};
    color: ${colors.accent};
    font-weight: 600;
  }
`;

export const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  margin: ${spacing.xs} 0;
`;

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${colors.border.light};
  background-color: ${colors.background.card};
  border-radius: ${borderRadius.small};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${colors.background.hover};
    border-color: ${colors.border.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuantityInput = styled.input`
  width: 60px;
  height: 32px;
  text-align: center;
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.small};
  font-size: ${fontSize.medium};
  padding: ${spacing.xs};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TotalPrice = styled.div`
  font-size: ${fontSize.large};
  color: ${colors.text.primary};
  font-weight: 700;
  margin-top: auto;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.small};
  margin-top: ${spacing.small};
`;

export const RemoveButton = styled.button`
  padding: ${spacing.xs} ${spacing.small};
  background-color: transparent;
  border: 1px solid ${colors.danger};
  color: ${colors.danger};
  border-radius: ${borderRadius.small};
  font-size: ${fontSize.small};
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${colors.danger};
    color: ${colors.text.inverse};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;