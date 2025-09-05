export interface SignUpRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname?: string;
  phoneNumber: string;
  birthDate: string;
  gender: 'FEMALE' | 'MALE' | 'OTHER';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserResponse;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  nickname?: string;
  phoneNumber: string;
  birthDate: string;
  gender: 'FEMALE' | 'MALE' | 'OTHER';
  profileImageUrl?: string;
  phoneVerified: boolean;
  role: string;
  status: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
  timestamp: string;
}
