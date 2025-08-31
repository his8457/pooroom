import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { CartIconContainer, CartIconButton, CartBadge } from '../../styles/components/cartIcon.styles';

export const CartIcon: React.FC = () => {
  const navigate = useNavigate();
  const { cartItemCount, fetchCartItemCount } = useCartStore();

  useEffect(() => {
    fetchCartItemCount();
  }, [fetchCartItemCount]);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <CartIconContainer>
      <CartIconButton onClick={handleCartClick}>
        🛒
        {cartItemCount > 0 && (
          <CartBadge>
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </CartBadge>
        )}
      </CartIconButton>
    </CartIconContainer>
  );
};