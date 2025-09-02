import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenManager } from '../../utils/tokenManager';
import { CartIcon } from '../cart/CartIcon';
import { 
  HeaderContainer, 
  HeaderContent, 
  Logo, 
  SearchContainer, 
  SearchInput, 
  SearchButton,
  UserActions,
  ActionButton,
  LogoutButton
} from '../../styles/layout/header.styles';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await tokenManager.logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={() => navigate('/')}>
          POOROOM
        </Logo>
        
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="상품을 검색해보세요" 
          />
          <SearchButton type="button">
            🔍
          </SearchButton>
        </SearchContainer>

        <UserActions>
          <CartIcon />
          <ActionButton type="button" onClick={() => navigate('/mypage')}>
            👤
          </ActionButton>
          <LogoutButton type="button" onClick={handleLogout}>
            로그아웃
          </LogoutButton>
        </UserActions>
      </HeaderContent>
    </HeaderContainer>
  );
};