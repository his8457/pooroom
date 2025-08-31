import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, spacing, fontSize, borderRadius } from '../../styles/common.styles';

export const NavigationContainer = styled.nav`
  background: ${colors.background.white};
  border-bottom: 1px solid ${colors.border.normal};
`;

export const CategoryList = styled.ul`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0 auto;
`;

export const CategoryItem = styled.li`
  flex: 1;
  text-align: center;
`;

export const CategoryLink = styled(Link)`
  display: block;
  padding: ${spacing.md} ${spacing.lg};
  color: ${colors.text.primary};
  text-decoration: none;
  font-size: ${fontSize.base};
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: ${borderRadius.sm};
  
  &:hover {
    background: ${colors.primary.gradient};
    color: white;
    transform: translateY(-2px);
  }
  
  &:last-child {
    color: ${colors.error};
    font-weight: 600;
  }
`;