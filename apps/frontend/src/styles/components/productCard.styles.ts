import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../styles/common.styles';

export const CardContainer = styled.div`
  background: ${colors.background.white};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${shadows.sm};
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.lg};
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const Badge = styled.div`
  position: absolute;
  top: ${spacing.md};
  left: ${spacing.md};
  display: flex;
  gap: ${spacing.xs};
`;

export const NewBadge = styled.span`
  background: ${colors.success};
  color: white;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSize.xs};
  font-weight: 600;
`;

export const SaleBadge = styled.span`
  background: ${colors.error};
  color: white;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSize.xs};
  font-weight: 600;
`;

export const ProductInfo = styled.div`
  padding: ${spacing.lg};
`;

export const ProductBrand = styled.p`
  font-size: ${fontSize.sm};
  color: ${colors.text.secondary};
  margin: 0 0 ${spacing.xs} 0;
  font-weight: 500;
`;

export const ProductName = styled.h3`
  font-size: ${fontSize.lg};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.md} 0;
  font-weight: 600;
  line-height: 1.4;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

export const OriginalPrice = styled.span`
  font-size: ${fontSize.sm};
  color: ${colors.text.muted};
  text-decoration: line-through;
`;

export const DiscountPrice = styled.span`
  font-size: ${fontSize.lg};
  color: ${colors.text.primary};
  font-weight: 700;
`;