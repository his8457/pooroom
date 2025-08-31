import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, transitions, breakpoints } from '../common.styles';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.large};
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.medium};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacing.small};
  }
`;

export const Title = styled.h1`
  font-size: ${fontSize.xlarge};
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.large};
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fontSize.large};
    margin-bottom: ${spacing.medium};
  }
`;

export const CartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${spacing.large};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${spacing.medium};
  }
`;

export const CartItemsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CartSummarySection = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    order: -1;
  }
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xlarge};
  text-align: center;

  > div:first-child {
    font-size: 4rem;
    margin-bottom: ${spacing.medium};
    opacity: 0.3;
  }
`;

export const EmptyCartMessage = styled.p`
  font-size: ${fontSize.large};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.large};
`;

export const ContinueShoppingButton = styled.button`
  padding: ${spacing.medium} ${spacing.large};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  border: none;
  border-radius: ${borderRadius.medium};
  font-size: ${fontSize.medium};
  font-weight: 600;
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover {
    background-color: ${colors.primaryDark};
    transform: translateY(-2px);
  }
`;