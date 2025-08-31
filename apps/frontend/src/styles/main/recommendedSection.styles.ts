import styled from 'styled-components';
import { colors, spacing, fontSize } from '../../styles/common.styles';

export const SectionContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xxl} ${spacing.lg};
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

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.md};
  }
`;