import styled from 'styled-components';
import { colors, spacing, typography, breakpoints, shadows } from '../common.styles';

export const BoardListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.large};
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.medium};
  }
`;

export const BoardHeader = styled.div`
  margin-bottom: ${spacing.xlarge};
  text-align: center;
`;

export const BoardTitle = styled.h1`
  ${typography.h1};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.small};
`;

export const BoardDescription = styled.p`
  ${typography.body};
  color: ${colors.text.secondary};
  margin: 0;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: ${spacing.medium};
  margin-bottom: ${spacing.large};
  align-items: center;
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: ${spacing.medium};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  font-size: ${typography.fontSize.medium};
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px ${colors.primary.light}20;
  }
`;

export const WriteButton = styled.button`
  background-color: ${colors.primary.main};
  color: white;
  border: none;
  padding: ${spacing.medium} ${spacing.large};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  
  &:hover {
    background-color: ${colors.primary.dark};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  transition: all 0.2s ease;
`;

export const PostListContainer = styled.div`
  border: 1px solid ${colors.border.light};
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: ${shadows.small};
`;

export const PostItem = styled.div`
  padding: ${spacing.large};
  border-bottom: 1px solid ${colors.border.light};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${colors.background.hover};
    transform: translateY(-1px);
    box-shadow: ${shadows.medium};
  }
`;

export const PostTitle = styled.h3`
  ${typography.h3};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.small} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  
  span {
    color: ${colors.primary.main};
    font-size: ${typography.fontSize.small};
  }
`;

export const PostMeta = styled.div`
  display: flex;
  gap: ${spacing.medium};
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.small};
  margin-bottom: ${spacing.small};
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: ${spacing.small};
  }
`;

export const PostStats = styled.div`
  display: flex;
  gap: ${spacing.medium};
  color: ${colors.text.muted};
  font-size: ${typography.fontSize.small};
`;

export const PinnedBadge = styled.span`
  background-color: ${colors.status.error};
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: ${typography.fontSize.xsmall};
  font-weight: 600;
`;

export const SecretBadge = styled.span`
  background-color: ${colors.status.warning};
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: ${typography.fontSize.xsmall};
  font-weight: 600;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.small};
  margin-top: ${spacing.large};
  flex-wrap: wrap;
`;

export const PageButton = styled.button`
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid ${colors.border.medium};
  background-color: transparent;
  color: ${colors.primary.main};
  border-radius: 6px;
  cursor: pointer;
  min-height: 40px;
  min-width: 40px;
  
  &:hover:not(:disabled) {
    background-color: ${colors.primary.light}20;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  transition: all 0.2s ease;
`;