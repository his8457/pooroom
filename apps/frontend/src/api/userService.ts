import { apiClient } from './apiClient';
import type { UserResponse, ApiResponse } from '../types/auth';

interface UpdateUserRequest {
  name: string;
  nickname?: string;
  phoneNumber: string;
  birthDate: string;
  gender: 'FEMALE' | 'MALE' | 'OTHER';
  profileImageUrl?: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const userService = {
  updateProfile: async (data: UpdateUserRequest): Promise<UserResponse> => {
    const response = await apiClient.put<ApiResponse<UserResponse>>('/users/me', data);
    if (!response.data.success) {
      throw new Error(response.data.message || '개인정보 수정에 실패했습니다.');
    }
    return response.data.data!;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    const response = await apiClient.post<ApiResponse<void>>('/users/change-password', data);
    if (!response.data.success) {
      throw new Error(response.data.message || '비밀번호 변경에 실패했습니다.');
    }
  },
};