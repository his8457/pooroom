import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { boardService } from '../api/boardService';
import type { BoardCategory } from '../api/boardService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import {
  BoardMainContainer,
  BoardTitle,
  CategoryGrid,
  CategoryCard,
  CategoryName,
  CategoryDescription,
  CategoryIcon
} from '../styles/pages/boardMainPage.styles';
import toast from 'react-hot-toast';

export const BoardMainPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<BoardCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await boardService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('카테고리 로드 실패:', error);
      toast.error('게시판 정보를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/board/${categoryId}`);
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case '공지사항': return '📢';
      case '자유게시판': return '💬';
      case '상품문의': return '❓';
      case '리뷰': return '⭐';
      case '이벤트': return '🎉';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <BoardMainContainer>
        <LoadingSpinner type="ring" size="large" showText={true} text="게시판을 불러오는 중..." />
      </BoardMainContainer>
    );
  }

  return (
    <BoardMainContainer>
      <BoardTitle>게시판</BoardTitle>
      
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            onClick={() => handleCategoryClick(category.id)}
          >
            <CategoryIcon>
              {getCategoryIcon(category.name)}
            </CategoryIcon>
            <CategoryName>{category.name}</CategoryName>
            {category.description && (
              <CategoryDescription>{category.description}</CategoryDescription>
            )}
          </CategoryCard>
        ))}
      </CategoryGrid>
    </BoardMainContainer>
  );
};