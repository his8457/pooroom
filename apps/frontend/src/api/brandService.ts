import { apiClient } from './apiClient';

export interface Brand {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
  createdAt: string;
  productCount?: number;
}

export const brandService = {
  // 활성 브랜드 목록
  async getAllBrands(): Promise<Brand[]> {
    const { data } = await apiClient.get('/brands');
    return data.data;
  },

  // 브랜드 상세 정보
  async getBrand(id: number): Promise<Brand> {
    const { data } = await apiClient.get(`/brands/${id}`);
    return data.data;
  },
};