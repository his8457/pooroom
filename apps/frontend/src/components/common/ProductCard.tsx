import React from 'react';
import { PlaceholderImage } from './PlaceholderImage';
import { 
  CardContainer, 
  ProductInfo, 
  ProductBrand, 
  ProductName, 
  PriceContainer, 
  OriginalPrice, 
  DiscountPrice, 
  Badge,
  NewBadge,
  SaleBadge
} from '../../styles/components/productCard.styles';

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  brand: string;
  isNew: boolean;
  isSale: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, price, discountPrice, imageUrl, brand, isNew, isSale } = product;

  // 색상 매핑
  const getProductColor = (productName: string) => {
    if (productName.includes('니트')) return '#667eea';
    if (productName.includes('스커트')) return '#764ba2';
    if (productName.includes('블레이저')) return '#10b981';
    if (productName.includes('데님')) return '#ef4444';
    if (productName.includes('터틀넥')) return '#8b5cf6';
    if (productName.includes('팬츠')) return '#f59e0b';
    if (productName.includes('카디건')) return '#06b6d4';
    if (productName.includes('로퍼')) return '#84cc16';
    return '#667eea';
  };

  return (
    <CardContainer>
      <PlaceholderImage 
        src={imageUrl}
        alt={name}
        width={300}
        height={400}
        fallbackText={name}
        fallbackColor={getProductColor(name)}
      />
      
      {(isNew || isSale) && (
        <Badge>
          {isNew && <NewBadge>NEW</NewBadge>}
          {isSale && <SaleBadge>SALE</SaleBadge>}
        </Badge>
      )}

      <ProductInfo>
        <ProductBrand>{brand}</ProductBrand>
        <ProductName>{name}</ProductName>
        <PriceContainer>
          {discountPrice ? (
            <>
              <OriginalPrice>{price.toLocaleString()}원</OriginalPrice>
              <DiscountPrice>{discountPrice.toLocaleString()}원</DiscountPrice>
            </>
          ) : (
            <DiscountPrice>{price.toLocaleString()}원</DiscountPrice>
          )}
        </PriceContainer>
      </ProductInfo>
    </CardContainer>
  );
};