import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../styles/common.styles';

export const SectionContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xxl} ${spacing.lg};
  background: ${colors.background.light};
`;

export const SectionTitle = styled.h2`
  font-size: ${fontSize['2xl']};
  font-weight: 700;
  color: ${colors.text.primary};
  text-align: center;
  margin-bottom: ${spacing.xl};
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: ${colors.primary.gradient};
    margin: ${spacing.md} auto 0;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing.md};
  }
`;

export const CategoryCard = styled.div`
  background: ${colors.background.white};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${shadows.sm};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${shadows.lg};
  }
`;

export const CategoryImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const CategoryName = styled.h3`
  padding: ${spacing.md};
  text-align: center;
  font-size: ${fontSize.lg};
  font-weight: 600;
  color: ${colors.text.primary};
  margin: 0;
`;