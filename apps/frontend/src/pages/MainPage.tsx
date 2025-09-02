import React from 'react';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { BannerSlider } from '../components/main/BannerSlider';
import { RecommendedSection } from '../components/main/RecommendedSection';
import { CategorySection } from '../components/main/CategorySection';
import { NewProductsSection } from '../components/main/NewProductsSection';
import { Footer } from '../components/layout/Footer';
import { FloatingChat } from '../components/chat/FloatingChat';
import { MainPageContainer } from '../styles/pages/mainPage.styles';

export const MainPage: React.FC = () => {
  return (
    <MainPageContainer>
      <Header />
      <Navigation />
      <main>
        <BannerSlider />
        <RecommendedSection />
        <CategorySection />
        <NewProductsSection />
      </main>
      <Footer />
      <FloatingChat />
    </MainPageContainer>
  );
};