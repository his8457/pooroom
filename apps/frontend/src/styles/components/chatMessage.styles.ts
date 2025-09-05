import styled from 'styled-components';
import { colors, spacing, typography } from '../common.styles';

export const MessageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isBot'].includes(prop),
})<{ isBot: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: ${spacing.small};
  margin-bottom: ${spacing.medium};
  justify-content: ${props => props.isBot ? 'flex-start' : 'flex-end'};
`;

export const MessageBubble = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isBot'].includes(prop),
})<{ isBot: boolean }>`
  background: ${props => props.isBot ? 'white' : colors.primary.main};
  color: ${props => props.isBot ? colors.text.primary : 'white'};
  padding: ${spacing.medium} ${spacing.large};
  border-radius: ${props => props.isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px'};
  max-width: 240px;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: ${props => props.isBot ? `1px solid ${colors.border.light}` : 'none'};
`;

export const MessageText = styled.p`
  ${typography.body};
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const MessageTime = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isBot'].includes(prop),
})<{ isBot: boolean }>`
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.muted};
  margin-top: 4px;
  text-align: ${props => props.isBot ? 'left' : 'right'};
  padding: 0 ${spacing.small};
`;

export const BotAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${colors.primary.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${colors.secondary.main};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;