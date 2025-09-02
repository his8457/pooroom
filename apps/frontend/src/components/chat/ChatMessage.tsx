import React from 'react';
import type { ChatMessage } from '../../api/chatService';
import {
  MessageContainer,
  MessageBubble,
  MessageText,
  MessageTime,
  BotAvatar,
  UserAvatar
} from '../../styles/components/chatMessage.styles';

interface ChatMessageProps {
  message: ChatMessage;
}

export const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isBot = message.sender === 'bot';

  return (
    <MessageContainer isBot={isBot}>
      {isBot && <BotAvatar>🤖</BotAvatar>}
      
      <div>
        <MessageBubble isBot={isBot}>
          <MessageText>{message.message}</MessageText>
        </MessageBubble>
        <MessageTime isBot={isBot}>
          {formatTime(message.timestamp)}
        </MessageTime>
      </div>
      
      {!isBot && <UserAvatar>👤</UserAvatar>}
    </MessageContainer>
  );
};