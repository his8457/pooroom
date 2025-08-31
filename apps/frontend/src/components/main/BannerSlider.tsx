import React, { useState, useEffect } from 'react';
import { getBannerImages } from '../../api/unsplashService';
import { 
  SliderContainer, 
  SlideWrapper, 
  Slide, 
  SlideContent, 
  SlideTitle, 
  SlideSubtitle, 
  SlideButton,
  DotsContainer,
  Dot
} from '../../styles/main/bannerSlider.styles';

const initialBanners = [
  {
    id: 1,
    title: '신상품 20% 할인',
    subtitle: '트렌디한 겨울 컬렉션을 만나보세요',
    imageUrl: '',
    buttonText: '지금 쇼핑하기'
  },
  {
    id: 2,
    title: '무료배송 이벤트',
    subtitle: '3만원 이상 구매시 무료배송',
    imageUrl: '',
    buttonText: '상품 보러가기'
  },
  {
    id: 3,
    title: '회원가입 축하',
    subtitle: '첫 구매 15% 쿠폰 증정',
    imageUrl: '',
    buttonText: '쿠폰 받기'
  }
];

export const BannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState(initialBanners);

  useEffect(() => {
    const loadBannerImages = async () => {
      const unsplashImages = await getBannerImages();
      
      if (unsplashImages.length > 0) {
        setBanners(prev => prev.map((banner, index) => ({
          ...banner,
          imageUrl: unsplashImages[index]?.urls.regular || banner.imageUrl
        })));
      }
    };

    loadBannerImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <SliderContainer>
      <SlideWrapper style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {banners.map((banner) => (
          <Slide key={banner.id} imageUrl={banner.imageUrl}>
            <SlideContent>
              <SlideTitle>{banner.title}</SlideTitle>
              <SlideSubtitle>{banner.subtitle}</SlideSubtitle>
              <SlideButton>{banner.buttonText}</SlideButton>
            </SlideContent>
          </Slide>
        ))}
      </SlideWrapper>
      
      <DotsContainer>
        {banners.map((_, index) => (
          <Dot 
            key={index}
            isActive={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
};