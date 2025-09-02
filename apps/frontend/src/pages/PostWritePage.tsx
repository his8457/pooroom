import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardService } from '../api/boardService';
import type { BoardCategory, CreatePostRequest } from '../api/boardService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import {
  WriteContainer,
  WriteHeader,
  WriteTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  Textarea,
  Select,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  ButtonContainer,
  SubmitButton,
  CancelButton
} from '../styles/pages/postWritePage.styles';
import toast from 'react-hot-toast';

export const PostWritePage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<BoardCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isSecret: false,
    rating: undefined as number | undefined,
    productId: undefined as number | undefined,
    orderId: undefined as number | undefined
  });

  useEffect(() => {
    loadCategory();
  }, [categoryId]);

  const loadCategory = async () => {
    if (!categoryId) return;

    try {
      const categories = await boardService.getCategories();
      const currentCategory = categories.find(cat => cat.id === parseInt(categoryId));
      
      if (!currentCategory) {
        toast.error('게시판을 찾을 수 없습니다.');
        navigate('/board');
        return;
      }
      
      setCategory(currentCategory);
    } catch (error) {
      console.error('카테고리 로드 실패:', error);
      toast.error('게시판 정보를 불러올 수 없습니다.');
      navigate('/board');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'rating' || name === 'productId' || name === 'orderId') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value ? parseInt(value) : undefined 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    if (!categoryId) return;

    try {
      setSubmitting(true);
      
      const createRequest: CreatePostRequest = {
        categoryId: parseInt(categoryId),
        title: formData.title.trim(),
        content: formData.content.trim(),
        isSecret: formData.isSecret,
        ...(formData.productId && { productId: formData.productId }),
        ...(formData.rating && { rating: formData.rating }),
        ...(formData.orderId && { orderId: formData.orderId })
      };

      await boardService.createPost(createRequest);
      toast.success('게시글이 작성되었습니다! 🎉');
      navigate(`/board/${categoryId}`);
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      toast.error('게시글 작성에 실패했습니다. 😢');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/board/${categoryId}`);
  };

  if (loading) {
    return (
      <WriteContainer>
        <LoadingSpinner type="ring" size="large" showText={true} text="게시판을 불러오는 중..." />
      </WriteContainer>
    );
  }

  if (!category) {
    return (
      <WriteContainer>
        <div>게시판을 찾을 수 없습니다.</div>
      </WriteContainer>
    );
  }

  const isReviewBoard = category.name === '리뷰';
  const isInquiryBoard = category.name === '상품문의';

  return (
    <WriteContainer>
      <WriteHeader>
        <WriteTitle>{category.name} 글쓰기</WriteTitle>
      </WriteHeader>

      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">제목 *</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목을 입력하세요"
            maxLength={200}
            required
          />
        </FormGroup>

        {(isReviewBoard || isInquiryBoard) && (
          <FormGroup>
            <Label htmlFor="productId">상품 ID</Label>
            <Input
              id="productId"
              name="productId"
              type="number"
              value={formData.productId || ''}
              onChange={handleInputChange}
              placeholder="관련 상품 ID (선택사항)"
            />
          </FormGroup>
        )}

        {isReviewBoard && (
          <>
            <FormGroup>
              <Label htmlFor="orderId">주문 ID</Label>
              <Input
                id="orderId"
                name="orderId"
                type="number"
                value={formData.orderId || ''}
                onChange={handleInputChange}
                placeholder="주문 ID (선택사항)"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="rating">별점</Label>
              <Select
                id="rating"
                name="rating"
                value={formData.rating || ''}
                onChange={handleInputChange}
              >
                <option value="">별점 선택 (선택사항)</option>
                <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
                <option value="4">⭐⭐⭐⭐ (4점)</option>
                <option value="3">⭐⭐⭐ (3점)</option>
                <option value="2">⭐⭐ (2점)</option>
                <option value="1">⭐ (1점)</option>
              </Select>
            </FormGroup>
          </>
        )}

        <FormGroup>
          <Label htmlFor="content">내용 *</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="내용을 입력하세요"
            rows={15}
            maxLength={10000}
            required
          />
        </FormGroup>

        {isInquiryBoard && (
          <CheckboxContainer>
            <Checkbox
              id="isSecret"
              name="isSecret"
              type="checkbox"
              checked={formData.isSecret}
              onChange={handleInputChange}
            />
            <CheckboxLabel htmlFor="isSecret">
              비밀글로 작성 (본인과 관리자만 볼 수 있습니다)
            </CheckboxLabel>
          </CheckboxContainer>
        )}

        <ButtonContainer>
          <CancelButton type="button" onClick={handleCancel}>
            취소
          </CancelButton>
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? (
              <LoadingSpinner type="dots" size="small" showText={false} />
            ) : (
              '작성완료'
            )}
          </SubmitButton>
        </ButtonContainer>
      </FormContainer>
    </WriteContainer>
  );
};