import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '../../api/productService';
import { useCartStore } from '../../store/cartStore';
import { LoadingSpinner } from './LoadingSpinner';
import { PlaceholderImage } from './PlaceholderImage';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ProductContainer,
  ImageSection,
  InfoSection,
  BrandName,
  ProductTitle,
  PriceSection,
  OriginalPrice,
  DiscountPrice,
  Badge,
  Description,
  ProductDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  StockInfo,
  ActionSection,
  AddToCartButton,
  LoadingContainer,
  ErrorContainer,
} from '../../styles/components/productDetailModal.styles';

interface ProductDetailModalProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  productId,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCartStore();
  
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productService.getProduct(productId),
    enabled: isOpen && !!productId,
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = async () => {
    if (!product || !product.isInStock) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
      onClose();
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && (!product || newQuantity <= product.stockQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const formatMaterialInfo = (materialInfoStr: string) => {
    if (!materialInfoStr || typeof materialInfoStr !== 'string') {
      return '';
    }

    try {
      const materialInfo = JSON.parse(materialInfoStr);
      if (typeof materialInfo !== 'object') {
        return materialInfoStr;
      }

      return Object.entries(materialInfo)
        .map(([material, percentage]) => {
          const materialName = getMaterialName(material);
          return `${materialName} ${percentage}%`;
        })
        .join(', ');
    } catch (error) {
      console.error('소재 정보 파싱 오류:', error);
      return materialInfoStr;
    }
  };

  const getMaterialName = (material: string): string => {
    const materialNames: Record<string, string> = {
      'cotton': '면',
      'polyester': '폴리에스터',
      'wool': '울',
      'silk': '실크',
      'linen': '린넨',
      'acrylic': '아크릴',
      'spandex': '스판덱스',
      'viscose': '비스코스',
      'alpaca': '알파카',
      'organic_cotton': '오가닉 코튼',
    };
    return materialNames[material] || material;
  };

  const formatSizeGuide = (sizeGuideStr: string) => {
    if (!sizeGuideStr || typeof sizeGuideStr !== 'string') {
      return '';
    }

    try {
      const sizeGuide = JSON.parse(sizeGuideStr);
      if (typeof sizeGuide !== 'object') {
        return sizeGuideStr;
      }

      return Object.entries(sizeGuide)
        .map(([size, measurement]) => `${size}: ${measurement}`)
        .join(', ');
    } catch (error) {
      console.error('사이즈 가이드 파싱 오류:', error);
      return sizeGuideStr;
    }
  };

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

  if (isLoading) {
    return (
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContent>
          <LoadingContainer>
            <LoadingSpinner type="ring" size="large" showText={true} text="상품 정보를 불러오는 중..." />
          </LoadingContainer>
        </ModalContent>
      </ModalOverlay>
    );
  }

  if (error || !product) {
    return (
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          <ErrorContainer>
            <h2>상품을 찾을 수 없습니다</h2>
            <p>요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
          </ErrorContainer>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <ProductContainer>
          <ImageSection>
            <PlaceholderImage
              src={product.unsplashImageUrl || ''}
              alt={product.name}
              width={400}
              height={500}
              fallbackText={product.name}
              fallbackColor={getProductColor(product.name)}
            />
          </ImageSection>

          <InfoSection>
            <BrandName>{product.brand.name}</BrandName>
            <ProductTitle>{product.name}</ProductTitle>
            
            <PriceSection>
              {product.isOnSale ? (
                <>
                  <OriginalPrice>{product.price.toLocaleString()}원</OriginalPrice>
                  <DiscountPrice>{product.effectivePrice.toLocaleString()}원</DiscountPrice>
                  <Badge>SALE</Badge>
                </>
              ) : (
                <DiscountPrice>{product.price.toLocaleString()}원</DiscountPrice>
              )}
            </PriceSection>

            <Description>{product.description}</Description>

            <ProductDetails>
              <DetailItem>
                <DetailLabel>상품코드</DetailLabel>
                <DetailValue>{product.sku}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>브랜드</DetailLabel>
                <DetailValue>{product.brand.name}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>카테고리</DetailLabel>
                <DetailValue>{product.category.name}</DetailValue>
              </DetailItem>
              
              {product.sustainabilityScore > 0 && (
                <DetailItem>
                  <DetailLabel>지속가능성 점수</DetailLabel>
                  <DetailValue>{product.sustainabilityScore}/10</DetailValue>
                </DetailItem>
              )}
              
              {product.materialInfo && (
                <DetailItem>
                  <DetailLabel>소재 정보</DetailLabel>
                  <DetailValue>{formatMaterialInfo(product.materialInfo)}</DetailValue>
                </DetailItem>
              )}
              
              {product.sizeGuide && (
                <DetailItem>
                  <DetailLabel>사이즈 가이드</DetailLabel>
                  <DetailValue>{formatSizeGuide(product.sizeGuide)}</DetailValue>
                </DetailItem>
              )}
              
              {product.careInstructions && (
                <DetailItem>
                  <DetailLabel>관리 방법</DetailLabel>
                  <DetailValue>{product.careInstructions}</DetailValue>
                </DetailItem>
              )}
            </ProductDetails>

            <StockInfo isInStock={product.isInStock}>
              {product.isInStock ? 
                `재고 ${product.stockQuantity}개 남음` : 
                '품절'
              }
            </StockInfo>

            <ActionSection>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span>수량:</span>
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    border: '1px solid #ddd', 
                    background: 'white',
                    cursor: 'pointer' 
                  }}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max={product.stockQuantity}
                  style={{ 
                    width: '60px', 
                    height: '32px', 
                    textAlign: 'center', 
                    border: '1px solid #ddd' 
                  }}
                />
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stockQuantity}
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    border: '1px solid #ddd', 
                    background: 'white',
                    cursor: 'pointer' 
                  }}
                >
                  +
                </button>
              </div>
              
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={!product.isInStock || isAddingToCart}
                isInStock={product.isInStock}
              >
                {isAddingToCart ? (
                  <LoadingSpinner type="dots" size="small" showText={false} />
                ) : product.isInStock ? (
                  '장바구니 담기'
                ) : (
                  '품절'
                )}
              </AddToCartButton>
            </ActionSection>
          </InfoSection>
        </ProductContainer>
      </ModalContent>
    </ModalOverlay>
  );
};