import styled from 'styled-components';
import { colors, spacing, typography, breakpoints, shadows } from '../common.styles';

export const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.large};
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing.medium};
  }
`;

export const PostContainer = styled.div`
  background-color: white;
  border: 1px solid ${colors.border.light};
  border-radius: 12px;
  padding: ${spacing.xlarge};
  box-shadow: ${shadows.small};
  margin-bottom: ${spacing.large};
`;

export const PostHeader = styled.div`
  margin-bottom: ${spacing.large};
  padding-bottom: ${spacing.large};
  border-bottom: 1px solid ${colors.border.light};
`;

export const PostTitle = styled.h1`
  ${typography.h1};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.medium} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  flex-wrap: wrap;
`;

export const PostMeta = styled.div`
  display: flex;
  gap: ${spacing.medium};
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.small};
  flex-wrap: wrap;
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: ${spacing.small};
  }
`;

export const PostContent = styled.div`
  ${typography.body};
  color: ${colors.text.primary};
  line-height: 1.8;
  margin-bottom: ${spacing.large};
  word-break: break-word;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const PostStats = styled.div`
  display: flex;
  gap: ${spacing.medium};
  color: ${colors.text.muted};
  font-size: ${typography.fontSize.small};
  margin-bottom: ${spacing.large};
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.medium};
  
  > div {
    display: flex;
    gap: ${spacing.small};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    
    > div {
      justify-content: center;
    }
  }
`;

export const BackButton = styled.button`
  background-color: ${colors.secondary.main};
  color: white;
  border: none;
  padding: ${spacing.medium} ${spacing.large};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  
  &:hover {
    background-color: ${colors.secondary.dark};
    transform: translateY(-1px);
  }
  
  transition: all 0.2s ease;
`;

export const EditButton = styled.button`
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
  
  transition: all 0.2s ease;
`;

export const DeleteButton = styled.button`
  background-color: ${colors.status.error};
  color: white;
  border: none;
  padding: ${spacing.medium} ${spacing.large};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  
  &:hover {
    background-color: #dc2626;
    transform: translateY(-1px);
  }
  
  transition: all 0.2s ease;
`;

export const CommentSection = styled.div`
  background-color: white;
  border: 1px solid ${colors.border.light};
  border-radius: 12px;
  padding: ${spacing.xlarge};
  box-shadow: ${shadows.small};
`;

export const CommentTitle = styled.h2`
  ${typography.h2};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.large} 0;
`;

export const CommentForm = styled.form`
  margin-bottom: ${spacing.large};
  padding-bottom: ${spacing.large};
  border-bottom: 1px solid ${colors.border.light};
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  padding: ${spacing.medium};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  font-size: ${typography.fontSize.medium};
  resize: vertical;
  min-height: 100px;
  margin-bottom: ${spacing.medium};
  font-family: inherit;
  line-height: 1.6;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px ${colors.primary.light}20;
  }
  
  &::placeholder {
    color: ${colors.text.muted};
  }
`;

export const CommentSubmitButton = styled.button`
  background-color: ${colors.primary.main};
  color: white;
  border: none;
  padding: ${spacing.medium} ${spacing.large};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background-color: ${colors.primary.dark};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  transition: all 0.2s ease;
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};
`;

export const CommentItem = styled.div`
  padding: ${spacing.large};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  background-color: ${colors.background.light};
`;

export const CommentAuthor = styled.div`
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.small};
  ${typography.body};
`;

export const CommentContent = styled.div`
  ${typography.body};
  color: ${colors.text.primary};
  line-height: 1.6;
  margin-bottom: ${spacing.small};
  word-break: break-word;
`;

export const CommentMeta = styled.div`
  display: flex;
  gap: ${spacing.medium};
  color: ${colors.text.muted};
  font-size: ${typography.fontSize.small};
  margin-bottom: ${spacing.small};
`;

export const CommentActions = styled.div`
  display: flex;
  gap: ${spacing.small};
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary.main};
  cursor: pointer;
  font-size: ${typography.fontSize.small};
  padding: ${spacing.xs} ${spacing.small};
  
  &:hover {
    text-decoration: underline;
  }
`;

interface BadgeProps {
  color: 'error' | 'warning' | 'success' | 'info';
}

export const Badge = styled.span<BadgeProps>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${typography.fontSize.xs};
  font-weight: 600;
  color: white;
  background-color: ${props => {
    switch (props.color) {
      case 'error': return colors.status.error;
      case 'warning': return colors.status.warning;
      case 'success': return colors.status.success;
      case 'info': return colors.primary.main;
      default: return colors.primary.main;
    }
  }};
`;