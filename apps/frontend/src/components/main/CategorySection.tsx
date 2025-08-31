import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceholderImage } from '../common/PlaceholderImage';
import { getCategoryImages } from '../../api/unsplashService';
import { 
  SectionContainer, 
  SectionTitle, 
  CategoryGrid, 
  CategoryCard, 
  CategoryName 
} from '../../styles/main/categorySection.styles';

const initialCategories = [
  {
    id: 1,
    name: '상의',
    key: 'tops',
    fallbackUrl: '', // CSS fallback 사용
    imageUrl: '',
    path: '/products?category=tops'
  },
  {
    id: 2,
    name: '하의',
    key: 'bottoms',
    fallbackUrl: '', // CSS fallback 사용
    imageUrl: '',
    path: '/products?category=bottoms'
  },
  {
    id: 3,
    name: '아우터',
    key: 'outerwear',
    fallbackUrl: '', // CSS fallback 사용
    imageUrl: '',
    path: '/products?category=outerwear'
  },
  {
    id: 4,
    name: '원피스',
    key: 'dress',
    fallbackUrl: '', // CSS fallback 사용
    imageUrl: '',
    path: '/products?category=dresses'
  },
  {
    id: 5,
    name: '신발',
    key: 'shoes',
    fallbackUrl: '', // CSS fallback 사용
    imageUrl: '',
    path: '/products?category=shoes'
  },
  {
    id: 6,
    name: '액세서리',
    key: 'accessories',
    fallbackUrl: '', // CSS fallback 사용
    imageUrl: '',
    path: '/products?category=accessories'
  }
];

export const CategorySection: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    const loadCategoryImages = async () => {
      const unsplashImages = await getCategoryImages();
      
      setCategories(prev => prev.map(category => ({
        ...category,
        imageUrl: unsplashImages[category.key] || category.fallbackUrl
      })));
    };

    loadCategoryImages();
  }, []);

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <SectionContainer>
      <SectionTitle>카테고리별 쇼핑</SectionTitle>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            onClick={() => handleCategoryClick(category.path)}
          >
            <PlaceholderImage 
              src={category.imageUrl}
              alt={category.name}
              width={200}
              height={200}
              fallbackText={category.name}
            />
            <CategoryName>{category.name}</CategoryName>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </SectionContainer>
  );
};