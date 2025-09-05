import styled from 'styled-components';
import { colors, spacing, PrimaryButton } from '../common.styles';

export const Container = styled.div`
  width: 100%;
  padding: ${spacing.lg};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.md};
    margin-bottom: ${spacing.lg};
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${spacing.md};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxl};
  text-align: center;
`;

export const EmptyMessage = styled.p`
  color: ${colors.text.secondary};
  font-size: 1.125rem;
  margin: 0;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.xxl};
  min-height: 400px;
`;

export const LoadMoreButton = styled(PrimaryButton)<{ isLoading?: boolean }>`
  display: block;
  margin: 0 auto;
  min-width: 200px;
  text-align: center;
  
  &:disabled {
    pointer-events: none;
  }
`;