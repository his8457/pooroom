import React from 'react';
import { ProductCard } from '../common/ProductCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { Product } from '../../api/productService';
import {
  Container,
  Grid,
  EmptyState,
  EmptyMessage,
  LoadMoreButton,
  LoadingContainer,
} from '../../styles/components/productList.styles';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  onProductClick?: (productId: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  isLoadingMore = false,
  onProductClick,
}) => {
  if (isLoading && products.length === 0) {
    return (
      <LoadingContainer>
        <LoadingSpinner type="ring" size="large" showText={true} text="상품을 불러오는 중..." />
      </LoadingContainer>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <EmptyState>
        <EmptyMessage>등록된 상품이 없습니다.</EmptyMessage>
      </EmptyState>
    );
  }

  const convertToProductCardFormat = (product: Product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.discountPrice,
    imageUrl: product.unsplashImageUrl || '', // Unsplash 이미지 URL 사용
    brand: product.brand.name,
    isNew: isNewProduct(product.createdAt),
    isSale: product.isOnSale,
  });

  const isNewProduct = (createdAt: string): boolean => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // 7일 이내면 신상품
  };

  return (
    <Container>
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={convertToProductCardFormat(product)}
            onClick={onProductClick}
          />
        ))}
      </Grid>
      
      {hasMore && (
        <LoadMoreButton
          onClick={onLoadMore}
          disabled={isLoadingMore}
          isLoading={isLoadingMore}
        >
          {isLoadingMore ? (
            <LoadingSpinner type="dots" size="small" showText={false} />
          ) : (
            '더 보기'
          )}
        </LoadMoreButton>
      )}
    </Container>
  );
};