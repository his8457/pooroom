import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authService } from '../api/authService';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ProfileEdit } from '../components/mypage/ProfileEdit';
import { OrderHistory } from '../components/mypage/OrderHistory';
import { AddressManager } from '../components/mypage/AddressManager';
import {
  MyPageContainer,
  ContentWrapper,
  SideMenu,
  MenuItem,
  MainContent,
  SectionTitle,
  ProfileSection,
  UserInfo,
  UserName,
  UserEmail,
  EditButton,
} from '../styles/pages/myPage.styles';

type MenuType = 'profile' | 'orders' | 'addresses' | 'reviews' | 'coupons' | 'settings';

export const MyPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: authService.getCurrentUser,
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingSpinner type="ring" size="large" showText={true} text="사용자 정보를 불러오는 중..." />
      </div>
    );
  }

  const menuItems = [
    { key: 'profile' as const, label: '개인정보 수정', icon: '👤' },
    { key: 'orders' as const, label: '주문 내역', icon: '📦' },
    { key: 'addresses' as const, label: '배송지 관리', icon: '🏠' },
    { key: 'reviews' as const, label: '리뷰 관리', icon: '⭐' },
    { key: 'coupons' as const, label: '쿠폰 관리', icon: '🎫' },
    { key: 'settings' as const, label: '설정', icon: '⚙️' },
  ];

  const renderMainContent = () => {
    switch (activeMenu) {
      case 'profile':
        return isEditingProfile && user ? (
          <ProfileEdit 
            user={user} 
            onCancel={() => setIsEditingProfile(false)} 
          />
        ) : (
          <div>
            <SectionTitle>개인정보</SectionTitle>
            <ProfileSection>
              <UserInfo>
                <UserName>{user?.name}</UserName>
                <UserEmail>{user?.email}</UserEmail>
                <EditButton onClick={() => setIsEditingProfile(true)}>
                  정보 수정
                </EditButton>
              </UserInfo>
            </ProfileSection>
          </div>
        );
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return <AddressManager />;
      case 'reviews':
        return (
          <div>
            <SectionTitle>리뷰 관리</SectionTitle>
            <p>리뷰 관리 기능은 향후 구현 예정입니다.</p>
          </div>
        );
      case 'coupons':
        return (
          <div>
            <SectionTitle>쿠폰 관리</SectionTitle>
            <p>쿠폰 관리 기능은 향후 구현 예정입니다.</p>
          </div>
        );
      case 'settings':
        return (
          <div>
            <SectionTitle>설정</SectionTitle>
            <p>설정 기능은 향후 구현 예정입니다.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MyPageContainer>
      <Header />
      <ContentWrapper>
        <SideMenu>
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              isActive={activeMenu === item.key}
              onClick={() => setActiveMenu(item.key)}
            >
              <span style={{ marginRight: '8px' }}>{item.icon}</span>
              {item.label}
            </MenuItem>
          ))}
        </SideMenu>
        <MainContent>
          {renderMainContent()}
        </MainContent>
      </ContentWrapper>
      <Footer />
    </MyPageContainer>
  );
};