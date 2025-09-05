import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { productService, type ProductSearchParams } from '../api/productService';
import { ProductList } from '../components/product/ProductList';
import { ProductDetailModal } from '../components/common/ProductDetailModal';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import {
  Container,
  Content,
  Title,
  FilterSection,
  SortSection,
  SortSelect,
} from '../styles/pages/productListPage.styles';

export const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // URL 파라미터에서 검색 조건 추출
  const searchOptions: ProductSearchParams = {
    keyword: searchParams.get('keyword') || undefined,
    categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
    brandId: searchParams.get('brandId') ? Number(searchParams.get('brandId')) : undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortDirection: (searchParams.get('sortDirection') as 'asc' | 'desc') || 'desc',
    page: currentPage,
    size: 20,
  };

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', searchOptions],
    queryFn: () => productService.getProducts(searchOptions),
  });

  const handleSortChange = (sortValue: string) => {
    const [sortBy, sortDirection] = sortValue.split('-');
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('sortBy', sortBy);
      newParams.set('sortDirection', sortDirection);
      return newParams;
    });
    setCurrentPage(0);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
  };

  const getPageTitle = () => {
    if (searchOptions.keyword) {
      return `"${searchOptions.keyword}" 검색 결과`;
    }
    if (searchOptions.categoryId) {
      return '카테고리 상품';
    }
    if (searchOptions.brandId) {
      return '브랜드 상품';
    }
    return '전체 상품';
  };

  const sortOptions = [
    { value: 'createdAt-desc', label: '최신순' },
    { value: 'createdAt-asc', label: '오래된순' },
    { value: 'price-asc', label: '가격 낮은순' },
    { value: 'price-desc', label: '가격 높은순' },
    { value: 'name-asc', label: '이름순' },
  ];

  const currentSortValue = `${searchOptions.sortBy}-${searchOptions.sortDirection}`;

  if (error) {
    return (
      <Container>
        <Header />
        <Navigation />
        <Content>
          <div>상품을 불러오는데 실패했습니다.</div>
        </Content>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Navigation />
      <Content>
        <Title>{getPageTitle()}</Title>
        
        <FilterSection>
          <SortSection>
            <SortSelect
              value={currentSortValue}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SortSelect>
          </SortSection>
        </FilterSection>

        <ProductList
          products={productData?.content || []}
          isLoading={isLoading}
          hasMore={productData ? !productData.last : false}
          onLoadMore={handleLoadMore}
          onProductClick={handleProductClick}
        />
      </Content>
      <Footer />
      
      {selectedProductId && (
        <ProductDetailModal
          productId={selectedProductId}
          isOpen={!!selectedProductId}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};