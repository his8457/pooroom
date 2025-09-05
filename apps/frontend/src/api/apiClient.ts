import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from '../utils/tokenManager';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Access Token 자동 추가
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Token 만료 시 자동 갱신
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Token 갱신 시도
        const newAccessToken = await tokenManager.refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // 원래 요청 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh 실패 시 로그인 페이지로 리다이렉트
        tokenManager.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;