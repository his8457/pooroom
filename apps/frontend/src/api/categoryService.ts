import { apiClient } from './apiClient';

export interface Category {
  id: number;
  name: string;
  level: number;
  sortOrder: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  parent?: {
    id: number;
    name: string;
    level: number;
  };
  children: {
    id: number;
    name: string;
    level: number;
  }[];
  hasChildren: boolean;
}

export const categoryService = {
  // 전체 카테고리 트리
  async getAllCategories(): Promise<Category[]> {
    const { data } = await apiClient.get('/categories');
    return data.data;
  },

  // 1차 카테고리만
  async getRootCategories(): Promise<Category[]> {
    const { data } = await apiClient.get('/categories/root');
    return data.data;
  },

  // 카테고리 상세 정보
  async getCategory(id: number): Promise<Category> {
    const { data } = await apiClient.get(`/categories/${id}`);
    return data.data;
  },

  // 하위 카테고리
  async getChildCategories(parentId: number): Promise<Category[]> {
    const { data } = await apiClient.get(`/categories/${parentId}/children`);
    return data.data;
  },

  // 레벨별 카테고리
  async getCategoriesByLevel(level: number): Promise<Category[]> {
    const { data } = await apiClient.get(`/categories/level/${level}`);
    return data.data;
  },
};