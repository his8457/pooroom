import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { PageLoaderOverlay, PageLoaderContent } from '../../styles/components/pageLoader.styles';

interface PageLoaderProps {
  text?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  text = "페이지를 불러오는 중..." 
}) => {
  return (
    <PageLoaderOverlay>
      <PageLoaderContent>
        <LoadingSpinner type="ring" size="large" text={text} />
      </PageLoaderContent>
    </PageLoaderOverlay>
  );
};