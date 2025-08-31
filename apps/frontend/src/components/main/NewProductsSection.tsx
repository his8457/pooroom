import React, { useState, useEffect } from 'react';
import { ProductCard } from '../common/ProductCard';
import { getProductImages } from '../../api/unsplashService';
import { 
  SectionContainer, 
  SectionTitle, 
  ProductGrid 
} from '../../styles/main/newProductsSection.styles';

const initialNewProducts = [
  {
    id: 5,
    name: '울 혼방 터틀넥',
    price: 59000,
    imageUrl: '',
    brand: 'POOROOM',
    isNew: true,
    isSale: false
  },
  {
    id: 6,
    name: '하이웨스트 와이드 팬츠',
    price: 85000,
    imageUrl: '',
    brand: 'POOROOM',
    isNew: true,
    isSale: false
  },
  {
    id: 7,
    name: '크롭 카디건',
    price: 69000,
    imageUrl: '',
    brand: 'POOROOM',
    isNew: true,
    isSale: false
  },
  {
    id: 8,
    name: '플랫 로퍼',
    price: 129000,
    imageUrl: '',
    brand: 'POOROOM',
    isNew: true,
    isSale: false
  }
];

export const NewProductsSection: React.FC = () => {
  const [products, setProducts] = useState(initialNewProducts);

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
      <SectionTitle>신상품</SectionTitle>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </SectionContainer>
  );
};