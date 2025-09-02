import styled from 'styled-components';
import { colors, spacing, typography, shadows } from '../common.styles';

export const ChatWindowContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: ${shadows.xl};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border: 1px solid ${colors.border.light};
  overflow: hidden;
  
  @media (max-width: 768px) {
    bottom: 80px;
    right: 20px;
    width: calc(100vw - 40px);
    max-width: 350px;
    height: 450px;
  }
  
  @media (max-width: 480px) {
    width: calc(100vw - 20px);
    right: 10px;
    height: 400px;
  }
`;

export const ChatHeader = styled.div`
  background: ${colors.primary.gradient};
  color: white;
  padding: ${spacing.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
`;

export const ChatTitle = styled.h3`
  ${typography.h3};
  margin: 0;
  color: white;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ChatMessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.medium};
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};
  background-color: ${colors.background.light};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.background.light};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.border.medium};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.border.dark};
  }
`;

export const ChatInputContainer = styled.div`
  padding: ${spacing.large};
  border-top: 1px solid ${colors.border.light};
  background: white;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: ${spacing.medium};
  border: 1px solid ${colors.border.light};
  border-radius: 20px;
  font-size: ${typography.fontSize.medium};
  outline: none;
  
  &:focus {
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 2px ${colors.primary.light}20;
  }
  
  &::placeholder {
    color: ${colors.text.muted};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SendButton = styled.button`
  width: 40px;
  height: 40px;
  background: ${colors.primary.main};
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${colors.primary.dark};
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const WelcomeMessage = styled.div`
  text-align: center;
  padding: ${spacing.large};
  color: ${colors.text.secondary};
  ${typography.body};
  
  strong {
    color: ${colors.primary.main};
  }
`;