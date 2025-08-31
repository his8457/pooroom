import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, transitions, breakpoints } from '../common.styles';

export const SummaryContainer = styled.div`
  background-color: ${colors.background.card};
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.large};
  padding: ${spacing.large};
  position: sticky;
  top: ${spacing.large};

  @media (max-width: ${breakpoints.tablet}) {
    position: static;
    margin-top: ${spacing.large};
  }
`;

export const SummaryTitle = styled.h3`
  font-size: ${fontSize.large};
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.medium};
  padding-bottom: ${spacing.small};
  border-bottom: 1px solid ${colors.border.light};
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.small};
`;

export const SummaryLabel = styled.span`
  font-size: ${fontSize.medium};
  color: ${colors.text.secondary};
`;

export const SummaryValue = styled.span`
  font-size: ${fontSize.medium};
  color: ${colors.text.primary};
  font-weight: 600;
`;

export const TotalRow = styled(SummaryRow)`
  margin-top: ${spacing.medium};
  padding-top: ${spacing.medium};
  border-top: 1px solid ${colors.border.light};
  font-weight: 700;

  ${SummaryLabel} {
    font-size: ${fontSize.large};
    color: ${colors.text.primary};
    font-weight: 700;
  }

  ${SummaryValue} {
    font-size: ${fontSize.large};
    color: ${colors.accent};
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
  margin-top: ${spacing.large};
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: ${spacing.medium};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  border: none;
  border-radius: ${borderRadius.medium};
  font-size: ${fontSize.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${transitions.fast};
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: ${colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${colors.background.disabled};
    color: ${colors.text.disabled};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const ClearButton = styled.button`
  width: 100%;
  padding: ${spacing.small};
  background-color: transparent;
  color: ${colors.danger};
  border: 1px solid ${colors.danger};
  border-radius: ${borderRadius.medium};
  font-size: ${fontSize.small};
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${colors.danger};
    color: ${colors.text.inverse};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;