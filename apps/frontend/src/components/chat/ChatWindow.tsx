import React, { useState, useEffect, useRef } from 'react';
import { chatService } from '../../api/chatService';
import type { ChatMessage } from '../../api/chatService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import {
  ChatWindowContainer,
  ChatHeader,
  ChatTitle,
  CloseButton,
  ChatMessagesContainer,
  ChatInputContainer,
  ChatInput,
  SendButton
} from '../../styles/components/chatWindow.styles';
import { ChatMessageComponent } from './ChatMessage';
import toast from 'react-hot-toast';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // 초기 환영 메시지
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        message: '안녕하세요! POOROOM 고객지원 챗봇입니다. 😊\n궁금한 점이 있으시면 언제든 문의해주세요!',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(inputMessage.trim());
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: response.message,
        sender: 'bot',
        timestamp: response.timestamp
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: '죄송합니다. 일시적인 오류가 발생했습니다. 😅\n잠시 후 다시 시도해주시거나 게시판을 이용해주세요.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error('메시지 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!isOpen) return null;

  return (
    <ChatWindowContainer>
      <ChatHeader>
        <ChatTitle>POOROOM 고객지원</ChatTitle>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </ChatHeader>

      <ChatMessagesContainer>
        {messages.map((message) => (
          <ChatMessageComponent key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '8px 16px' }}>
            <LoadingSpinner type="dots" size="small" showText={false} />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </ChatMessagesContainer>

      <ChatInputContainer>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
          <ChatInput
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
            maxLength={1000}
          />
          <SendButton type="submit" disabled={!inputMessage.trim() || isLoading}>
            📤
          </SendButton>
        </form>
      </ChatInputContainer>
    </ChatWindowContainer>
  );
};