import React, { useState, useEffect } from 'react';
import { ProductCard } from '../common/ProductCard';
import { getProductImages } from '../../api/unsplashService';
import { 
  SectionContainer, 
  SectionTitle, 
  ProductGrid 
} from '../../styles/main/recommendedSection.styles';

const initialRecommendedProducts = [
  {
    id: 1,
    name: '캐시미어 니트 스웨터',
    price: 89000,
    discountPrice: 71200,
    imageUrl: '',
    brand: 'POOROOM',
    isNew: false,
    isSale: true
  },
  {
    id: 2,
    name: '플리츠 미디 스커트',
    price: 65000,
    imageUrl: '',
    brand: 'POOROOM',
    isNew: true,
    isSale: false
  },
  {
    id: 3,
    name: '오버핏 블레이저',
    price: 125000,
    discountPrice: 100000,
    imageUrl: '',
    brand: 'POOROOM',
    isNew: false,
    isSale: true
  },
  {
    id: 4,
    name: '슬림핏 데님 팬츠',
    price: 79000,
    imageUrl: '',
    brand: 'POOROOM',
    isNew: true,
    isSale: false
  }
];

export const RecommendedSection: React.FC = () => {
  const [products, setProducts] = useState(initialRecommendedProducts);

  useEffect(() => {
    const loadProductImages = async () => {
      const unsplashImages = await getProductImages(4);
      
      if (unsplashImages.length > 0) {
        setProducts(prev => prev.map((product, index) => ({
          ...product,
          imageUrl: unsplashImages[index]?.urls.regular || product.imageUrl
        })));
      }
    };

    loadProductImages();
  }, []);

  return (
    <SectionContainer>
      <SectionTitle>당신을 위한 추천 상품</SectionTitle>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </SectionContainer>
  );
};