import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../api/userService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import type { UserResponse } from '../../types/auth';
import {
  ProfileEditContainer,
  FormSection,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  SaveButton,
  CancelButton,
  ErrorMessage,
} from '../../styles/components/profileEdit.styles';

interface ProfileEditProps {
  user: UserResponse;
  onCancel: () => void;
}

interface UpdateProfileRequest {
  name: string;
  nickname?: string;
  phoneNumber: string;
  birthDate: string;
  gender: 'FEMALE' | 'MALE' | 'OTHER';
  profileImageUrl?: string;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({ user, onCancel }) => {
  const [formData, setFormData] = useState<UpdateProfileRequest>({
    name: user.name,
    nickname: user.nickname || '',
    phoneNumber: user.phoneNumber,
    birthDate: user.birthDate,
    gender: user.gender,
    profileImageUrl: user.profileImageUrl || '',
  });
  
  const [errors, setErrors] = useState<Partial<UpdateProfileRequest>>({});
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      toast.success('개인정보가 성공적으로 수정되었습니다! 🎉');
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
      onCancel();
    },
    onError: (error: any) => {
      toast.error('개인정보 수정에 실패했습니다. 😢');
      console.error('Profile update error:', error);
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<UpdateProfileRequest> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = '휴대폰 번호를 입력해주세요.';
    } else if (!/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = '올바른 휴대폰 번호 형식이 아닙니다.';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = '생년월일을 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    updateProfileMutation.mutate(formData);
  };

  const handleChange = (field: keyof UpdateProfileRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <ProfileEditContainer>
      <h3>개인정보 수정</h3>
      
      <form onSubmit={handleSubmit}>
        <FormSection>
          <FormGroup>
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="이름을 입력해주세요"
              hasError={!!errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              type="text"
              value={formData.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              placeholder="닉네임을 입력해주세요 (선택사항)"
              hasError={!!errors.nickname}
            />
            {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phoneNumber">휴대폰 번호 *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              placeholder="010-1234-5678"
              hasError={!!errors.phoneNumber}
            />
            {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="birthDate">생년월일 *</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              hasError={!!errors.birthDate}
            />
            {errors.birthDate && <ErrorMessage>{errors.birthDate}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="gender">성별 *</Label>
            <Select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="FEMALE">여성</option>
              <option value="MALE">남성</option>
              <option value="OTHER">기타</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="profileImageUrl">프로필 이미지 URL</Label>
            <Input
              id="profileImageUrl"
              type="url"
              value={formData.profileImageUrl}
              onChange={(e) => handleChange('profileImageUrl', e.target.value)}
              placeholder="프로필 이미지 URL을 입력해주세요 (선택사항)"
            />
          </FormGroup>
        </FormSection>

        <ButtonGroup>
          <CancelButton type="button" onClick={onCancel}>
            취소
          </CancelButton>
          <SaveButton 
            type="submit" 
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? (
              <LoadingSpinner type="dots" size="small" showText={false} />
            ) : (
              '저장'
            )}
          </SaveButton>
        </ButtonGroup>
      </form>
    </ProfileEditContainer>
  );
};