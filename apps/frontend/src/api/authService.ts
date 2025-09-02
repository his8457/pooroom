import { apiClient } from './apiClient';
import type { SignUpRequest } from '../types/auth';
import type { LoginRequest } from '../types/auth';
import type { LoginResponse } from '../types/auth';
import type { RefreshTokenRequest } from '../types/auth';
import type { UserResponse } from '../types/auth';
import type { ApiResponse } from '../types/auth';

export const authService = {
  signUp: async (data: SignUpRequest): Promise<UserResponse> => {
    const response = await apiClient.post<ApiResponse<UserResponse>>('/auth/signup', data);
    if (!response.data.success) {
      throw new Error(response.data.message || '회원가입에 실패했습니다.');
    }
    return response.data.data!;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data);
    if (!response.data.success) {
      throw new Error(response.data.message || '로그인에 실패했습니다.');
    }
    return response.data.data!;
  },

  refresh: async (data: RefreshTokenRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/refresh', data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Token 갱신에 실패했습니다.');
    }
    return response.data.data!;
  },

  logout: async (data: RefreshTokenRequest): Promise<void> => {
    const response = await apiClient.post<ApiResponse<void>>('/auth/logout', data);
    if (!response.data.success) {
      throw new Error(response.data.message || '로그아웃에 실패했습니다.');
    }
  },

  checkEmailDuplication: async (email: string): Promise<boolean> => {
    const response = await apiClient.get<ApiResponse<boolean>>(`/auth/check-email?email=${email}`);
    return response.data.data!;
  },

  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await apiClient.get<ApiResponse<UserResponse>>('/auth/me');
    if (!response.data.success) {
      throw new Error(response.data.message || '사용자 정보를 가져올 수 없습니다.');
    }
    return response.data.data!;
  },
};