import React from 'react';
import { ChatButtonContainer, ChatIcon, NotificationDot } from '../../styles/components/chatButton.styles';

interface ChatButtonProps {
  onClick: () => void;
  hasNewMessage?: boolean;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ 
  onClick, 
  hasNewMessage = false 
}) => {
  return (
    <ChatButtonContainer onClick={onClick}>
      <ChatIcon>💬</ChatIcon>
      {hasNewMessage && <NotificationDot />}
    </ChatButtonContainer>
  );
};