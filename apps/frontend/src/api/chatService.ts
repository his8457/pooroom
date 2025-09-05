import { apiClient } from './apiClient';
import type { ApiResponse } from '../types/auth';

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  message: string;
  sender: string;
  timestamp: string;
}

export const chatService = {
  // 챗봇에게 메시지 전송
  sendMessage: async (message: string): Promise<ChatResponse> => {
    const response = await apiClient.post<ApiResponse<ChatResponse>>('/chat/message', {
      message
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message || '메시지 전송에 실패했습니다.');
    }
    
    return response.data.data!;
  },
};