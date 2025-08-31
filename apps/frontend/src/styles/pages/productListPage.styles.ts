import styled from 'styled-components';
import { colors, spacing, borderRadius, fontSize } from '../common.styles';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: ${spacing.lg};
`;

export const Title = styled.h1`
  font-size: ${fontSize['3xl']};
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.xl};
  text-align: center;

  @media (max-width: 768px) {
    font-size: ${fontSize['2xl']};
    margin-bottom: ${spacing.lg};
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xl};
  padding: ${spacing.md};
  background: ${colors.background.white};
  border-radius: ${borderRadius.md};
  border: 1px solid ${colors.border.normal};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${spacing.md};
    align-items: stretch;
  }
`;

export const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

export const SortSelect = styled.select`
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.border.normal};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSize.sm};
  color: ${colors.text.primary};
  background: ${colors.background.white};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
  }
`;