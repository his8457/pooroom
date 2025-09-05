import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../styles/common.styles';

export const HeaderContainer = styled.header`
  background: ${colors.background.white};
  border-bottom: 1px solid ${colors.border.normal};
  box-shadow: ${shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.md} ${spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.xl};
`;

export const Logo = styled.button`
  font-size: ${fontSize['2xl']};
  font-weight: 700;
  background: ${colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
  display: flex;
  position: relative;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: ${spacing.md} ${spacing.lg};
  border: 2px solid ${colors.border.normal};
  border-radius: ${borderRadius.xl} 0 0 ${borderRadius.xl};
  font-size: ${fontSize.base};
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
  }
`;

export const SearchButton = styled.button`
  padding: ${spacing.md} ${spacing.lg};
  background: ${colors.primary.gradient};
  border: none;
  border-radius: 0 ${borderRadius.xl} ${borderRadius.xl} 0;
  color: white;
  cursor: pointer;
  font-size: ${fontSize.lg};
  
  &:hover {
    opacity: 0.9;
  }
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

export const ActionButton = styled.button`
  padding: ${spacing.md};
  background: none;
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.md};
  font-size: ${fontSize.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.background.light};
    border-color: ${colors.primary.main};
  }
`;

export const LogoutButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.background.light};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.md};
  color: ${colors.text.secondary};
  font-size: ${fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.error};
    color: white;
    border-color: ${colors.error};
  }
`;