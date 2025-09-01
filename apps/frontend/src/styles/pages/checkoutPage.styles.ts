import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows } from '../common.styles';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background.light};
`;

export const Content = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.lg};
  width: 100%;
`;

export const Title = styled.h1`
  font-size: ${fontSize.xl};
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.xl};
  text-align: center;
`;

export const Section = styled.section`
  margin-bottom: ${spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${fontSize.lg};
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.md};
`;

export const OrderButton = styled.button`
  width: 100%;
  padding: ${spacing.lg};
  border: none;
  border-radius: ${borderRadius.md};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  font-size: ${fontSize.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  min-height: 56px;
  box-shadow: ${shadows.md};
  
  &:hover:not(:disabled) {
    background-color: ${colors.primary.dark};
    box-shadow: ${shadows.lg};
  }
  
  &:disabled {
    background-color: ${colors.border.normal};
    color: ${colors.text.muted};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const LoadingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;