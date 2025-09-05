import { createApi } from 'unsplash-js';

// Unsplash API 클라이언트 생성
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || ''
});


export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description?: string | null;
  description?: string | null;
  user: {
    name: string;
    username: string;
  };
}

// 패션 관련 이미지 검색
export const searchFashionImages = async (
  query: string, 
  page: number = 1, 
  perPage: number = 10
): Promise<UnsplashImage[]> => {
  try {
    const result = await unsplash.search.getPhotos({
      query: `fashion ${query}`,
      page,
      perPage,
      orientation: 'portrait'
    });

    if (result.errors) {
      console.error('Unsplash API 에러:', result.errors);
      return [];
    }

    return result.response?.results || [];
  } catch (error) {
    console.error('Unsplash 이미지 검색 실패:', error);
    return [];
  }
};

// 카테고리별 이미지 가져오기 (200x200 정사각형)
export const getCategoryImages = async (): Promise<Record<string, string>> => {
  const categoryQueries = [
    { key: 'tops', query: 'fashion tops shirt blouse' },
    { key: 'bottoms', query: 'fashion pants trousers jeans' },
    { key: 'outerwear', query: 'fashion jacket coat blazer' },
    { key: 'dress', query: 'fashion dress elegant' },
    { key: 'shoes', query: 'fashion shoes heels sneakers' },
    { key: 'accessories', query: 'fashion accessories jewelry bag' }
  ];
  
  const categoryImages: Record<string, string> = {};

  try {
    const promises = categoryQueries.map(async ({ key, query }) => {
      const result = await unsplash.search.getPhotos({
        query,
        page: 1,
        perPage: 1,
        orientation: 'squarish' // 정사각형 이미지 선호
      });
      
      if (result.response?.results && result.response.results.length > 0) {
        // 200x200 크기로 리사이즈된 URL 생성
        const image = result.response.results[0];
        categoryImages[key] = `${image.urls.raw}&w=200&h=200&fit=crop&crop=center`;
      }
    });

    await Promise.all(promises);
    return categoryImages;
  } catch (error) {
    console.error('카테고리 이미지 로드 실패:', error);
    return {};
  }
};

// 제품 이미지 가져오기 (300x400 세로형)
export const getProductImages = async (count: number = 8): Promise<UnsplashImage[]> => {
  try {
    const fashionTerms = ['sweater', 'dress', 'jacket', 'pants', 'shoes', 'accessories', 'blouse', 'skirt'];
    const randomTerm = fashionTerms[Math.floor(Math.random() * fashionTerms.length)];
    
    const result = await unsplash.search.getPhotos({
      query: `fashion ${randomTerm}`,
      page: 1,
      perPage: count,
      orientation: 'portrait' // 세로형 이미지
    });

    if (result.errors) {
      console.error('Unsplash API 에러:', result.errors);
      return [];
    }

    // 300x400 크기로 리사이즈된 URL을 가진 이미지 객체 반환
    const images = result.response?.results || [];
    return images.map(image => ({
      ...image,
      urls: {
        ...image.urls,
        small: `${image.urls.raw}&w=300&h=400&fit=crop&crop=center`,
        regular: `${image.urls.raw}&w=300&h=400&fit=crop&crop=center`
      }
    }));
  } catch (error) {
    console.error('제품 이미지 로드 실패:', error);
    return [];
  }
};

// 상품별로 개별 이미지 가져오기
export const getProductImageByCategory = async (categoryName: string, productId?: number): Promise<string> => {
  try {
    // 카테고리명을 기반으로 검색 쿼리 생성
    const categoryQueries: Record<string, string> = {
      '블라우스': 'fashion blouse shirt woman',
      '셔츠': 'fashion shirt woman elegant',
      '티셔츠': 'fashion tshirt casual woman',
      '니트': 'fashion knit sweater woman',
      '청바지': 'fashion jeans denim woman',
      '슬랙스': 'fashion pants trousers woman',
      '스커트': 'fashion skirt woman',
      '원피스': 'fashion dress woman elegant',
      '재킷': 'fashion jacket woman',
      '코트': 'fashion coat woman',
      '패딩': 'fashion padding jacket woman',
      '가디건': 'fashion cardigan woman'
    };

    const query = categoryQueries[categoryName] || `fashion ${categoryName} woman`;
    
    // productId를 시드로 사용해 일관된 이미지 선택
    const page = productId ? ((productId - 1) % 5) + 1 : 1;
    
    const result = await unsplash.search.getPhotos({
      query,
      page,
      perPage: 10,
      orientation: 'portrait'
    });

    if (result.errors || !result.response?.results.length) {
      console.error('Unsplash API 에러:', result.errors);
      return '';
    }

    // productId를 기반으로 특정 이미지 선택 (일관성 보장)
    const imageIndex = productId ? (productId - 1) % result.response.results.length : 0;
    const image = result.response.results[imageIndex];
    
    return `${image.urls.raw}&w=300&h=400&fit=crop&crop=center`;
  } catch (error) {
    console.error('상품 이미지 로드 실패:', error);
    return '';
  }
};

// 배너 이미지 가져오기 (800x400 가로형)
export const getBannerImages = async (): Promise<UnsplashImage[]> => {
  try {
    const bannerQueries = ['fashion sale promotion', 'fashion delivery shopping', 'fashion celebration gift'];
    const bannerImages: UnsplashImage[] = [];

    const promises = bannerQueries.map(async (query) => {
      const result = await unsplash.search.getPhotos({
        query,
        page: 1,
        perPage: 1,
        orientation: 'landscape' // 가로형 이미지
      });
      
      if (result.response?.results && result.response.results.length > 0) {
        const image = result.response.results[0];
        bannerImages.push({
          ...image,
          urls: {
            ...image.urls,
            regular: `${image.urls.raw}&w=800&h=400&fit=crop&crop=center`
          }
        });
      }
    });

    await Promise.all(promises);
    return bannerImages;
  } catch (error) {
    console.error('배너 이미지 로드 실패:', error);
    return [];
  }
};