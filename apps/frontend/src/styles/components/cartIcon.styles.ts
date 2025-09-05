import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, transitions } from '../common.styles';

export const CartIconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const CartIconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: ${fontSize.large};
  cursor: pointer;
  padding: ${spacing.xs};
  border-radius: ${borderRadius.medium};
  transition: ${transitions.fast};
  
  &:hover {
    background-color: ${colors.background.hover};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  font-size: ${fontSize.small};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: ${borderRadius.full};
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;