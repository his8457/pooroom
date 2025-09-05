import React, { useState } from 'react';
import type { CartItem as CartItemType } from '../../api/cartService';
import { useCartStore } from '../../store/cartStore';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { PlaceholderImage } from '../common/PlaceholderImage';
import {
  CartItemContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  BrandName,
  QuantitySection,
  QuantityButton,
  QuantityInput,
  TotalPrice,
  RemoveButton,
  ActionButtons,
} from '../../styles/components/cartItem.styles';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItem, removeFromCart, isLoading } = useCartStore();
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity === item.quantity) return;
    
    setIsUpdating(true);
    setLocalQuantity(newQuantity);
    
    try {
      await updateCartItem(item.id, newQuantity);
    } catch (error) {
      setLocalQuantity(item.quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (window.confirm('정말로 이 상품을 장바구니에서 제거하시겠습니까?')) {
      await removeFromCart(item.id);
    }
  };

  const displayPrice = item.product.isOnSale && item.product.discountPrice 
    ? item.product.discountPrice 
    : item.product.currentPrice;

  return (
    <CartItemContainer>
      <ProductImage>
        {item.product.unsplashImageUrl ? (
          <img src={item.product.unsplashImageUrl} alt={item.product.name} />
        ) : (
          <PlaceholderImage alt={item.product.name} />
        )}
      </ProductImage>
      
      <ProductInfo>
        <BrandName>{item.product.brand.name}</BrandName>
        <ProductName>{item.product.name}</ProductName>
        <ProductPrice>
          {item.product.isOnSale && item.product.discountPrice && (
            <span className="original-price">
              {item.product.currentPrice.toLocaleString()}원
            </span>
          )}
          <span className="current-price">
            {displayPrice.toLocaleString()}원
          </span>
        </ProductPrice>
        
        <QuantitySection>
          <QuantityButton 
            onClick={() => handleQuantityChange(localQuantity - 1)}
            disabled={localQuantity <= 1 || isUpdating || isLoading}
          >
            -
          </QuantityButton>
          <QuantityInput
            type="number"
            value={localQuantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1) {
                setLocalQuantity(value);
              }
            }}
            onBlur={() => handleQuantityChange(localQuantity)}
            disabled={isUpdating || isLoading}
            min="1"
          />
          <QuantityButton 
            onClick={() => handleQuantityChange(localQuantity + 1)}
            disabled={isUpdating || isLoading || localQuantity >= item.product.stockQuantity}
          >
            +
          </QuantityButton>
          {(isUpdating || isLoading) && (
            <LoadingSpinner type="dots" size="small" showText={false} />
          )}
        </QuantitySection>
        
        <TotalPrice>
          {item.totalPrice.toLocaleString()}원
        </TotalPrice>
        
        <ActionButtons>
          <RemoveButton 
            onClick={handleRemove}
            disabled={isLoading}
          >
            삭제
          </RemoveButton>
        </ActionButtons>
      </ProductInfo>
    </CartItemContainer>
  );
};