import axios from 'axios';
import type { SignUpRequest } from '../types/auth';
import type { LoginRequest } from '../types/auth';
import type { LoginResponse } from '../types/auth';
import type { UserResponse } from '../types/auth';
import type { ApiResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  signUp: async (data: SignUpRequest): Promise<UserResponse> => {
    const response = await authApi.post<ApiResponse<UserResponse>>('/signup', data);
    if (!response.data.success) {
      throw new Error(response.data.error?.message || '회원가입에 실패했습니다.');
    }
    return response.data.data!;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await authApi.post<ApiResponse<LoginResponse>>('/login', data);
    if (!response.data.success) {
      throw new Error(response.data.error?.message || '로그인에 실패했습니다.');
    }
    return response.data.data!;
  },

  checkEmailDuplication: async (email: string): Promise<boolean> => {
    const response = await authApi.get<ApiResponse<boolean>>(`/check-email?email=${email}`);
    return response.data.data!;
  },
};