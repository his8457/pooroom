import styled from 'styled-components';
import { colors, spacing, typography, breakpoints } from '../common.styles';

export const OrderHistoryContainer = styled.div`
  h3 {
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.text.primary};
    margin-bottom: ${spacing.lg};
  }
`;

export const FilterSection = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
  padding: ${spacing.sm} ${spacing.md};
  border: 2px solid ${props => props.isActive ? colors.primary.main : colors.border.primary};
  background-color: ${props => props.isActive ? colors.primary.main : colors.background.primary};
  color: ${props => props.isActive ? colors.text.inverse : colors.text.primary};
  border-radius: 20px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.primary.main};
    background-color: ${props => props.isActive ? colors.primary.dark : colors.background.hover};
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const OrderItem = styled.div`
  background-color: ${colors.background.primary};
  border: 1px solid ${colors.border.primary};
  border-radius: 12px;
  padding: ${spacing.lg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${colors.border.light};

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: ${spacing.sm};
  }
`;

export const OrderNumber = styled.h4`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin: 0 0 4px 0;
`;

export const OrderDate = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  margin: 0;
`;

export const OrderStatus = styled.span<{ color: string }>`
  padding: ${spacing.xs} ${spacing.sm};
  background-color: ${props => props.color};
  color: white;
  border-radius: 12px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

export const OrderProducts = styled.div`
  margin-bottom: ${spacing.md};
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} 0;
  border-bottom: 1px solid ${colors.border.light};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-wrap: wrap;
    gap: ${spacing.sm};
  }
`;

export const ProductImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${colors.background.secondary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  div {
    font-size: 24px;
    color: ${colors.text.secondary};
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProductName = styled.h5`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProductQuantity = styled.span`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  margin-right: ${spacing.md};

  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 0;
  }
`;

export const ProductPrice = styled.span`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
`;

export const OrderTotal = styled.div`
  text-align: right;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  padding: ${spacing.md} 0;
  border-top: 1px solid ${colors.border.light};
  margin-bottom: ${spacing.md};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const ViewDetailButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  border: none;
  border-radius: 6px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.primary.dark};
  }
`;

export const CancelButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.background.secondary};
  color: ${colors.text.primary};
  border: 1px solid ${colors.border.primary};
  border-radius: 6px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.background.hover};
    border-color: ${colors.border.hover};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.xxl};
  color: ${colors.text.secondary};

  p {
    margin: ${spacing.sm} 0;
    font-size: ${typography.fontSize.md};
  }
`;