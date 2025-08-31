import React from 'react';
import { 
  NavigationContainer, 
  CategoryList, 
  CategoryItem, 
  CategoryLink 
} from '../../styles/layout/navigation.styles';

const categories = [
  { id: 1, name: '상의', path: '/products?category=tops' },
  { id: 2, name: '하의', path: '/products?category=bottoms' },
  { id: 3, name: '아우터', path: '/products?category=outerwear' },
  { id: 4, name: '원피스', path: '/products?category=dresses' },
  { id: 5, name: '신발', path: '/products?category=shoes' },
  { id: 6, name: '액세서리', path: '/products?category=accessories' },
  { id: 7, name: 'SALE', path: '/products?sale=true' },
];

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <CategoryList>
        {categories.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryLink to={category.path}>
              {category.name}
            </CategoryLink>
          </CategoryItem>
        ))}
      </CategoryList>
    </NavigationContainer>
  );
};