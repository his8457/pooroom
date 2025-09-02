import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  AddressManagerContainer,
  AddressHeader,
  AddNewButton,
  AddressList,
  AddressItem,
  AddressInfo,
  AddressName,
  RecipientInfo,
  AddressText,
  DefaultBadge,
  AddressActions,
  EditButton,
  DeleteButton,
  SetDefaultButton,
  EmptyState,
  AddressForm,
  FormOverlay,
} from '../../styles/components/addressManager.styles';

interface Address {
  id: number;
  name: string;
  recipient: string;
  phone: string;
  zipcode: string;
  address: string;
  detailAddress?: string;
  isDefault: boolean;
}


export const AddressManager: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const queryClient = useQueryClient();

  // 임시 데이터 - 백엔드 API 구현 후 실제 데이터로 교체
  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const mockAddresses: Address[] = [
        {
          id: 1,
          name: '집',
          recipient: '김철수',
          phone: '010-1234-5678',
          zipcode: '12345',
          address: '서울특별시 강남구 테헤란로 123',
          detailAddress: '456호',
          isDefault: true,
        },
        {
          id: 2,
          name: '회사',
          recipient: '김철수',
          phone: '010-1234-5678',
          zipcode: '54321',
          address: '서울특별시 종로구 종로 456',
          detailAddress: '7층',
          isDefault: false,
        },
      ];
      return mockAddresses;
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (_addressId: number) => {
      // 백엔드 API 구현 후 실제 삭제 로직
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success('배송지가 삭제되었습니다! ✅');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: () => {
      toast.error('배송지 삭제에 실패했습니다. 😢');
    },
  });

  const setDefaultAddressMutation = useMutation({
    mutationFn: async (_addressId: number) => {
      // 백엔드 API 구현 후 실제 기본 배송지 설정 로직
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success('기본 배송지가 변경되었습니다! ✅');
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: () => {
      toast.error('기본 배송지 설정에 실패했습니다. 😢');
    },
  });

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDelete = (addressId: number) => {
    if (window.confirm('정말로 이 배송지를 삭제하시겠습니까?')) {
      deleteAddressMutation.mutate(addressId);
    }
  };

  const handleSetDefault = (addressId: number) => {
    setDefaultAddressMutation.mutate(addressId);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <LoadingSpinner type="ring" size="large" showText={true} text="배송지 정보를 불러오는 중..." />
      </div>
    );
  }

  return (
    <AddressManagerContainer>
      <AddressHeader>
        <h3>배송지 관리</h3>
        <AddNewButton onClick={handleAddNew}>
          + 새 배송지 추가
        </AddNewButton>
      </AddressHeader>

      {!addresses || addresses.length === 0 ? (
        <EmptyState>
          <p>등록된 배송지가 없습니다.</p>
          <p>새 배송지를 추가해보세요! 🏠</p>
        </EmptyState>
      ) : (
        <AddressList>
          {addresses.map((address) => (
            <AddressItem key={address.id}>
              <AddressInfo>
                <AddressName>
                  {address.name}
                  {address.isDefault && <DefaultBadge>기본 배송지</DefaultBadge>}
                </AddressName>
                <RecipientInfo>
                  {address.recipient} | {address.phone}
                </RecipientInfo>
                <AddressText>
                  ({address.zipcode}) {address.address}
                  {address.detailAddress && ` ${address.detailAddress}`}
                </AddressText>
              </AddressInfo>
              
              <AddressActions>
                {!address.isDefault && (
                  <SetDefaultButton 
                    onClick={() => handleSetDefault(address.id)}
                    disabled={setDefaultAddressMutation.isPending}
                  >
                    기본배송지 설정
                  </SetDefaultButton>
                )}
                <EditButton onClick={() => handleEdit(address)}>
                  수정
                </EditButton>
                <DeleteButton 
                  onClick={() => handleDelete(address.id)}
                  disabled={deleteAddressMutation.isPending}
                >
                  삭제
                </DeleteButton>
              </AddressActions>
            </AddressItem>
          ))}
        </AddressList>
      )}

      {isFormOpen && (
        <FormOverlay onClick={handleFormClose}>
          <AddressForm onClick={(e) => e.stopPropagation()}>
            <h4>{editingAddress ? '배송지 수정' : '새 배송지 추가'}</h4>
            <p>배송지 폼 컴포넌트가 여기에 구현됩니다.</p>
            <button onClick={handleFormClose}>닫기</button>
          </AddressForm>
        </FormOverlay>
      )}
    </AddressManagerContainer>
  );
};