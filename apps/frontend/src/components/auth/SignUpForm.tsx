import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../api/authService';
import type { SignUpRequest } from '../../types/auth';
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
  LoginLink,
  getSelectErrorStyles
} from '../../styles/auth/signUpForm.styles';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  birthDate: string;
  gender: 'FEMALE' | 'MALE' | 'OTHER' | '';
}

interface FormErrors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  name?: string;
  nickname?: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
}

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다! 🎉\n로그인 페이지로 이동합니다.');
      setTimeout(() => navigate('/login'), 2000);
    },
    onError: (error: Error) => {
      toast.error(error.message || '회원가입에 실패했습니다. 😢');
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
      newErrors.email = '이메일은 필수입니다.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    // 비밀번호 검증
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = '비밀번호는 필수입니다.';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.';
    }

    // 비밀번호 확인
    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호 확인은 필수입니다.';
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    // 이름 검증
    if (!formData.name) {
      newErrors.name = '이름은 필수입니다.';
    } else if (formData.name.length < 2 || formData.name.length > 50) {
      newErrors.name = '이름은 2자 이상 50자 이하여야 합니다.';
    }

    // 닉네임 검증 (선택사항)
    if (formData.nickname && (formData.nickname.length < 2 || formData.nickname.length > 100)) {
      newErrors.nickname = '닉네임은 2자 이상 100자 이하여야 합니다.';
    }

    // 휴대폰 번호 검증
    const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = '휴대폰 번호는 필수입니다.';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)';
    }

    // 생년월일 검증
    if (!formData.birthDate) {
      newErrors.birthDate = '생년월일은 필수입니다.';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      if (birthDate >= today) {
        newErrors.birthDate = '생년월일은 과거 날짜여야 합니다.';
      }
    }

    // 성별 검증
    if (!formData.gender) {
      newErrors.gender = '성별 선택은 필수입니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const requestData: SignUpRequest = {
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      name: formData.name,
      nickname: formData.nickname || undefined,
      phoneNumber: formData.phoneNumber,
      birthDate: formData.birthDate,
      gender: formData.gender as 'FEMALE' | 'MALE' | 'OTHER',
    };

    signUpMutation.mutate(requestData);
  };

  return (
    <Container>
      <FormCard>
        <Title>회원가입</Title>
        <Subtitle>새로운 계정을 만들어보세요</Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">이메일 *</Label>
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
            <Label htmlFor="password">비밀번호 *</Label>
            <Input
              id="password"
              type="password"
              placeholder="8자 이상, 대소문자·숫자·특수문자 포함"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              hasError={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="passwordConfirm">비밀번호 확인 *</Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.passwordConfirm}
              onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
              hasError={!!errors.passwordConfirm}
            />
            {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              type="text"
              placeholder="홍길동"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              hasError={!!errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="개발자홍길동 (선택사항)"
              value={formData.nickname}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
              hasError={!!errors.nickname}
            />
            {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="phoneNumber">휴대폰 번호 *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="010-1234-5678"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              hasError={!!errors.phoneNumber}
            />
            {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="birthDate">생년월일 *</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              hasError={!!errors.birthDate}
            />
            {errors.birthDate && <ErrorMessage>{errors.birthDate}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="gender">성별 *</Label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              style={getSelectErrorStyles(!!errors.gender)}
            >
              <option value="">성별을 선택해주세요</option>
              <option value="FEMALE">여성</option>
              <option value="MALE">남성</option>
              <option value="OTHER">기타</option>
            </select>
            {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
          </InputGroup>

          <SubmitButton
            type="submit"
            isLoading={signUpMutation.isPending}
            disabled={signUpMutation.isPending}
          >
            {signUpMutation.isPending ? (
              <LoadingSpinner type="dots" size="small" showText={false} />
            ) : (
              '회원가입'
            )}
          </SubmitButton>
        </Form>

        <LoginLink>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </LoginLink>
      </FormCard>
    </Container>
  );
};