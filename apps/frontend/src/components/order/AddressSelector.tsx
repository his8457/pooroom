import React, { useState, useRef } from 'react';
import type { ShippingAddress } from '../../pages/CheckoutPage';
import toast from 'react-hot-toast';
import {
  Container,
  AddressCard,
  AddressInfo,
  AddressLabel,
  AddressText,
  SelectButton,
  AddNewButton,
  AddressForm,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  CancelButton,
  SaveButton,
  AddressSearchGroup,
  SearchButton,
} from '../../styles/components/addressSelector.styles';

interface Props {
  onAddressSelect: (address: ShippingAddress) => void;
  selectedAddress: ShippingAddress | null;
}

export const AddressSelector: React.FC<Props> = ({ onAddressSelect, selectedAddress }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ShippingAddress>({
    recipient: '',
    phone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
  });
  
  // 저장된 배송지 목록을 state로 관리
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([
    {
      recipient: '홍길동',
      phone: '010-1234-5678',
      zipcode: '12345',
      address: '서울시 강남구 테헤란로 123',
      detailAddress: '456호',
    },
  ]);
  
  const detailAddressRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearchAddress = () => {
    if (!window.daum) {
      toast.error('주소 검색 서비스를 불러올 수 없습니다.');
      return;
    }

    const isMobile = window.innerWidth <= 768;

    new window.daum.Postcode({
      oncomplete: function(data: any) {
        // 도로명 주소를 우선 사용, 없으면 지번 주소 사용
        const fullAddress = data.roadAddress || data.jibunAddress;
        
        setFormData(prev => ({
          ...prev,
          zipcode: data.zonecode,
          address: fullAddress,
        }));

        // 상세주소 입력란에 포커스
        setTimeout(() => {
          detailAddressRef.current?.focus();
        }, 100);

        toast.success('주소가 입력되었습니다.');
      },
      width: isMobile ? '100%' : 500,
      height: isMobile ? '100%' : 600,
      animation: true,
      focusInput: true,
      autoMapping: true,
    }).open();
  };

  const handleSaveAddress = () => {
    console.log('폼 데이터:', formData);

    if (!formData.recipient.trim()) {
      toast.error('받는 분 이름을 입력해주세요.');
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('연락처를 입력해주세요.');
      return;
    }

    if (!formData.zipcode.trim()) {
      toast.error('주소 검색을 통해 우편번호를 입력해주세요.');
      return;
    }

    if (!formData.address.trim()) {
      toast.error('주소 검색을 통해 주소를 입력해주세요.');
      return;
    }

    // 새 주소를 저장된 주소 목록에 추가
    setSavedAddresses(prev => [...prev, formData]);
    
    // 새 주소를 바로 선택 상태로 설정
    onAddressSelect(formData);
    
    // 폼 초기화
    setShowForm(false);
    setFormData({
      recipient: '',
      phone: '',
      zipcode: '',
      address: '',
      detailAddress: '',
    });
    
    toast.success('새 배송지가 추가되었습니다! 🎉');
  };

  // 저장 버튼 활성화 조건
  const isFormValid = formData.recipient.trim() && 
                     formData.phone.trim() && 
                     formData.zipcode.trim() && 
                     formData.address.trim();

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      recipient: '',
      phone: '',
      zipcode: '',
      address: '',
      detailAddress: '',
    });
  };

  return (
    <Container>
      {savedAddresses.map((address, index) => (
        <AddressCard 
          key={index}
          isSelected={selectedAddress === address}
        >
          <AddressInfo>
            <AddressLabel>{address.recipient}</AddressLabel>
            <AddressText>{address.phone}</AddressText>
            <AddressText>
              ({address.zipcode}) {address.address}
              {address.detailAddress && ` ${address.detailAddress}`}
            </AddressText>
          </AddressInfo>
          <SelectButton 
            onClick={() => onAddressSelect(address)}
            isSelected={selectedAddress === address}
          >
            {selectedAddress === address ? '선택됨' : '선택'}
          </SelectButton>
        </AddressCard>
      ))}

      {!showForm ? (
        <AddNewButton onClick={() => setShowForm(true)}>
          + 새 배송지 추가
        </AddNewButton>
      ) : (
        <AddressForm>
          <FormGroup>
            <Label>받는 분</Label>
            <Input
              type="text"
              value={formData.recipient}
              onChange={(e) => handleInputChange('recipient', e.target.value)}
              placeholder="받는 분 이름을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label>연락처</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="010-0000-0000"
            />
          </FormGroup>

          <FormGroup>
            <Label>우편번호</Label>
            <AddressSearchGroup>
              <Input
                type="text"
                value={formData.zipcode}
                readOnly
                placeholder="우편번호"
              />
              <SearchButton 
                type="button"
                onClick={handleSearchAddress}
              >
                주소 검색
              </SearchButton>
            </AddressSearchGroup>
          </FormGroup>

          <FormGroup>
            <Label>주소</Label>
            <Input
              type="text"
              value={formData.address}
              readOnly
              placeholder="주소 검색 버튼을 클릭하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label>상세주소</Label>
            <Input
              ref={detailAddressRef}
              type="text"
              value={formData.detailAddress || ''}
              onChange={(e) => handleInputChange('detailAddress', e.target.value)}
              placeholder="상세주소 (선택사항)"
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton onClick={handleCancel}>
              취소
            </CancelButton>
            <SaveButton 
              onClick={handleSaveAddress}
              disabled={!isFormValid}
            >
              저장
            </SaveButton>
          </ButtonGroup>
        </AddressForm>
      )}
    </Container>
  );
};