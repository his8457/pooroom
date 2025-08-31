import { apiClient } from './apiClient';
import { getProductImageByCategory } from './unsplashService';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  sku: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SOLDOUT';
  isFeatured: boolean;
  sustainabilityScore: number;
  materialInfo?: string;
  sizeGuide?: string;
  careInstructions?: string;
  createdAt: string;
  updatedAt: string;
  brand: {
    id: number;
    name: string;
    logoUrl?: string;
  };
  category: {
    id: number;
    name: string;
    level: number;
  };
  isOnSale: boolean;
  isInStock: boolean;
  effectivePrice: number;
  unsplashImageUrl?: string;
}

export interface ProductListResponse {
  content: Product[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ProductSearchParams {
  keyword?: string;
  categoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export const productService = {
  // 상품 목록 조회
  async getProducts(params: ProductSearchParams = {}): Promise<ProductListResponse> {
    const { data } = await apiClient.get('/products', { params });
    const response = data.data;
    
    // 각 상품에 Unsplash 이미지 URL 추가
    const productsWithImages = await Promise.all(
      response.content.map(async (product: Product) => {
        try {
          const imageUrl = await getProductImageByCategory(product.category.name, product.id);
          return {
            ...product,
            unsplashImageUrl: imageUrl
          };
        } catch (error) {
          console.error(`상품 ${product.id} 이미지 로드 실패:`, error);
          return product;
        }
      })
    );

    return {
      ...response,
      content: productsWithImages
    };
  },

  // 상품 상세 조회
  async getProduct(id: number): Promise<Product> {
    const { data } = await apiClient.get(`/products/${id}`);
    return data.data;
  },

  // 추천 상품 목록
  async getFeaturedProducts(page = 0, size = 20): Promise<ProductListResponse> {
    const { data } = await apiClient.get('/products/featured', {
      params: { page, size }
    });
    return data.data;
  },

  // 신상품 목록 (TOP 10)
  async getNewProducts(): Promise<Product[]> {
    const { data } = await apiClient.get('/products/new');
    const products = data.data;
    
    // 각 상품에 Unsplash 이미지 URL 추가
    return await Promise.all(
      products.map(async (product: Product) => {
        try {
          const imageUrl = await getProductImageByCategory(product.category.name, product.id);
          return { ...product, unsplashImageUrl: imageUrl };
        } catch (error) {
          console.error(`상품 ${product.id} 이미지 로드 실패:`, error);
          return product;
        }
      })
    );
  },

  // 추천 상품 목록 (TOP 10)
  async getRecommendedProducts(): Promise<Product[]> {
    const { data } = await apiClient.get('/products/recommended');
    const products = data.data;
    
    // 각 상품에 Unsplash 이미지 URL 추가
    return await Promise.all(
      products.map(async (product: Product) => {
        try {
          const imageUrl = await getProductImageByCategory(product.category.name, product.id);
          return { ...product, unsplashImageUrl: imageUrl };
        } catch (error) {
          console.error(`상품 ${product.id} 이미지 로드 실패:`, error);
          return product;
        }
      })
    );
  },

  // 상품 검색
  async searchProducts(params: ProductSearchParams): Promise<ProductListResponse> {
    const { data } = await apiClient.get('/products/search', { params });
    return data.data;
  },

  // 카테고리별 상품
  async getProductsByCategory(categoryId: number, params: ProductSearchParams = {}): Promise<ProductListResponse> {
    const { data } = await apiClient.get(`/products/category/${categoryId}`, { params });
    return data.data;
  },

  // 브랜드별 상품
  async getProductsByBrand(brandId: number, params: ProductSearchParams = {}): Promise<ProductListResponse> {
    const { data } = await apiClient.get(`/products/brand/${brandId}`, { params });
    return data.data;
  },

  // 필터링된 상품
  async getFilteredProducts(params: ProductSearchParams): Promise<ProductListResponse> {
    const { data } = await apiClient.get('/products/filter', { params });
    return data.data;
  },
};