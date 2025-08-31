import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../api/authService';
import type { LoginRequest } from '../../types/auth';
import { LoadingSpinner } from '../common/LoadingSpinner';
import {
  Container,
  FormCard,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  SignUpLink,
} from '../../styles/auth/loginForm.styles';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('로그인되었습니다! 🎉');
      setTimeout(() => navigate('/'), 1000);
    },
    onError: (error: Error) => {
      toast.error(error.message || '로그인에 실패했습니다. 😢');
    },
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const requestData: LoginRequest = {
      email: formData.email,
      password: formData.password,
    };

    loginMutation.mutate(requestData);
  };

  return (
    <Container>
      <FormCard>
        <Title>로그인</Title>
        <Subtitle>계정에 로그인하세요</Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@pooroom.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              hasError={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <SubmitButton
            type="submit"
            isLoading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <LoadingSpinner type="dots" size="small" showText={false} />
            ) : (
              '로그인'
            )}
          </SubmitButton>
        </Form>

        <SignUpLink>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </SignUpLink>
      </FormCard>
    </Container>
  );
};