import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardService } from '../api/boardService';
import type { BoardCategory, Post, PageResponse } from '../api/boardService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { 
  BoardListContainer,
  BoardHeader,
  BoardTitle,
  BoardDescription,
  PostListContainer,
  PostItem,
  PostTitle,
  PostMeta,
  PostStats,
  SearchContainer,
  SearchInput,
  WriteButton,
  PaginationContainer,
  PageButton,
  PinnedBadge,
  SecretBadge
} from '../styles/pages/boardListPage.styles';
import toast from 'react-hot-toast';

export const BoardListPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<BoardCategory | null>(null);
  const [posts, setPosts] = useState<PageResponse<Post> | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadCategoryAndPosts();
  }, [categoryId, currentPage]);

  const loadCategoryAndPosts = async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      
      // 카테고리 정보 로드
      const categories = await boardService.getCategories();
      const currentCategory = categories.find(cat => cat.id === parseInt(categoryId));
      
      if (!currentCategory) {
        toast.error('게시판을 찾을 수 없습니다.');
        navigate('/board');
        return;
      }
      
      setCategory(currentCategory);

      // 게시글 목록 로드
      const postsData = await boardService.getPostsByCategory(
        parseInt(categoryId), 
        currentPage, 
        20
      );
      setPosts(postsData);
    } catch (error) {
      console.error('게시판 로드 실패:', error);
      toast.error('게시판 정보를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!categoryId || !searchKeyword.trim()) return;

    try {
      setSearching(true);
      const searchResults = await boardService.searchPosts(
        parseInt(categoryId), 
        searchKeyword, 
        0, 
        20
      );
      setPosts(searchResults);
      setCurrentPage(0);
    } catch (error) {
      console.error('검색 실패:', error);
      toast.error('검색에 실패했습니다.');
    } finally {
      setSearching(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleWritePost = () => {
    navigate(`/board/${categoryId}/write`);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/board/post/${postId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <BoardListContainer>
        <LoadingSpinner type="ring" size="large" showText={true} text="게시판을 불러오는 중..." />
      </BoardListContainer>
    );
  }

  if (!category || !posts) {
    return (
      <BoardListContainer>
        <div>게시판을 찾을 수 없습니다.</div>
      </BoardListContainer>
    );
  }

  return (
    <BoardListContainer>
      <BoardHeader>
        <BoardTitle>{category.name}</BoardTitle>
        {category.description && (
          <BoardDescription>{category.description}</BoardDescription>
        )}
      </BoardHeader>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={searching}>
          {searching ? '검색 중...' : '검색'}
        </button>
        <WriteButton onClick={handleWritePost}>
          글쓰기
        </WriteButton>
      </SearchContainer>

      <PostListContainer>
        {posts.content.length === 0 ? (
          <div>게시글이 없습니다.</div>
        ) : (
          posts.content.map((post) => (
            <PostItem key={post.id} onClick={() => handlePostClick(post.id)}>
              <PostTitle>
                {post.isPinned && <PinnedBadge>공지</PinnedBadge>}
                {post.isSecret && <SecretBadge>비밀글</SecretBadge>}
                {post.title}
                {post.commentCount > 0 && (
                  <span> [{post.commentCount}]</span>
                )}
              </PostTitle>
              <PostMeta>
                <span>{post.authorNickname || post.authorName}</span>
                <span>{formatDate(post.createdAt)}</span>
                {post.productName && (
                  <span>상품: {post.productName}</span>
                )}
              </PostMeta>
              <PostStats>
                <span>조회 {post.viewCount}</span>
                <span>좋아요 {post.likeCount}</span>
              </PostStats>
            </PostItem>
          ))
        )}
      </PostListContainer>

      {posts.totalPages > 1 && (
        <PaginationContainer>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={posts.first}
          >
            이전
          </PageButton>
          
          {Array.from({ length: Math.min(posts.totalPages, 10) }, (_, i) => {
            const pageNum = Math.floor(currentPage / 10) * 10 + i;
            if (pageNum >= posts.totalPages) return null;
            
            return (
              <PageButton
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                disabled={pageNum === currentPage}
                style={{ 
                  backgroundColor: pageNum === currentPage ? '#007bff' : 'transparent',
                  color: pageNum === currentPage ? 'white' : '#007bff'
                }}
              >
                {pageNum + 1}
              </PageButton>
            );
          })}
          
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={posts.last}
          >
            다음
          </PageButton>
        </PaginationContainer>
      )}
    </BoardListContainer>
  );
};