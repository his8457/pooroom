import styled from 'styled-components';
import { colors, spacing, typography, breakpoints, shadows } from '../common.styles';

export const BoardMainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.large};
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.medium};
  }
`;

export const BoardTitle = styled.h1`
  ${typography.h1};
  color: ${colors.text.primary};
  text-align: center;
  margin-bottom: ${spacing.xlarge};
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${spacing.large};
  
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${spacing.medium};
  }
`;

export const CategoryCard = styled.div`
  background-color: white;
  border: 1px solid ${colors.border.light};
  border-radius: 12px;
  padding: ${spacing.xlarge};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${shadows.small};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.large};
    border-color: ${colors.primary.light};
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

export const CategoryIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${spacing.medium};
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 36px;
  }
`;

export const CategoryName = styled.h2`
  ${typography.h2};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.small} 0;
`;

export const CategoryDescription = styled.p`
  ${typography.body};
  color: ${colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;