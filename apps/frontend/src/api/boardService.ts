import { apiClient } from './apiClient';
import type { ApiResponse } from '../types/auth';

export interface BoardCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  adminOnly: boolean;
  createdAt: string;
}

export interface Post {
  id: number;
  categoryId: number;
  categoryName: string;
  authorId: number;
  authorName: string;
  authorNickname?: string;
  productId?: number;
  productName?: string;
  title: string;
  content?: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isPinned: boolean;
  isHidden: boolean;
  status: string;
  isAnswered: boolean;
  isSecret: boolean;
  rating?: number;
  orderId?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  authorName: string;
  authorNickname?: string;
  parentId?: number;
  content: string;
  likeCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

export interface CreatePostRequest {
  categoryId: number;
  title: string;
  content: string;
  productId?: number;
  isSecret?: boolean;
  rating?: number;
  orderId?: number;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}

export interface CreateCommentRequest {
  content: string;
  parentId?: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const boardService = {
  // 게시판 카테고리 조회
  getCategories: async (): Promise<BoardCategory[]> => {
    const response = await apiClient.get<ApiResponse<BoardCategory[]>>('/board/categories');
    if (!response.data.success) {
      throw new Error(response.data.message || '게시판 목록을 가져올 수 없습니다.');
    }
    return response.data.data!;
  },

  // 카테고리별 게시글 목록 조회
  getPostsByCategory: async (categoryId: number, page = 0, size = 20): Promise<PageResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Post>>>(
      `/board/categories/${categoryId}/posts?page=${page}&size=${size}`
    );
    if (!response.data.success) {
      throw new Error(response.data.message || '게시글 목록을 가져올 수 없습니다.');
    }
    return response.data.data!;
  },

  // 게시글 검색
  searchPosts: async (categoryId: number, keyword: string, page = 0, size = 20): Promise<PageResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<PageResponse<Post>>>(
      `/board/categories/${categoryId}/posts/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`
    );
    if (!response.data.success) {
      throw new Error(response.data.message || '게시글 검색에 실패했습니다.');
    }
    return response.data.data!;
  },

  // 게시글 상세 조회
  getPost: async (postId: number): Promise<Post> => {
    const response = await apiClient.get<ApiResponse<Post>>(`/board/posts/${postId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || '게시글을 가져올 수 없습니다.');
    }
    return response.data.data!;
  },

  // 게시글 작성
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.post<ApiResponse<Post>>('/board/posts', data);
    if (!response.data.success) {
      throw new Error(response.data.message || '게시글 작성에 실패했습니다.');
    }
    return response.data.data!;
  },

  // 게시글 수정
  updatePost: async (postId: number, data: UpdatePostRequest): Promise<Post> => {
    const response = await apiClient.put<ApiResponse<Post>>(`/board/posts/${postId}`, data);
    if (!response.data.success) {
      throw new Error(response.data.message || '게시글 수정에 실패했습니다.');
    }
    return response.data.data!;
  },

  // 게시글 삭제
  deletePost: async (postId: number): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/board/posts/${postId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || '게시글 삭제에 실패했습니다.');
    }
  },

  // 댓글 목록 조회
  getComments: async (postId: number): Promise<Comment[]> => {
    const response = await apiClient.get<ApiResponse<Comment[]>>(`/board/posts/${postId}/comments`);
    if (!response.data.success) {
      throw new Error(response.data.message || '댓글 목록을 가져올 수 없습니다.');
    }
    return response.data.data!;
  },

  // 댓글 작성
  createComment: async (postId: number, data: CreateCommentRequest): Promise<Comment> => {
    const response = await apiClient.post<ApiResponse<Comment>>(`/board/posts/${postId}/comments`, data);
    if (!response.data.success) {
      throw new Error(response.data.message || '댓글 작성에 실패했습니다.');
    }
    return response.data.data!;
  },

  // 댓글 삭제
  deleteComment: async (commentId: number): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/board/comments/${commentId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || '댓글 삭제에 실패했습니다.');
    }
  },
};