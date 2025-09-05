import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { 
  PlaceholderContainer, 
  PlaceholderContent, 
  ProductImage
} from '../../styles/components/placeholderImage.styles';

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  fallbackText?: string;
  fallbackColor?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  src,
  alt,
  width = 300,
  height = 400,
  fallbackText,
  fallbackColor = '#667eea'
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // src가 없거나 에러가 발생한 경우 CSS 기반 placeholder 사용
  if (!src || imageError) {
    return (
      <PlaceholderContainer 
        width={width} 
        height={height}
        fallbackColor={fallbackColor}
      >
        <PlaceholderContent>
          {fallbackText || alt}
        </PlaceholderContent>
      </PlaceholderContainer>
    );
  }

  return (
    <div style={{ position: 'relative', width, height }}>
      {imageLoading && (
        <PlaceholderContainer width={width} height={height} fallbackColor="#f3f4f6">
          <LoadingSpinner type="ring" size="medium" showText={false} />
        </PlaceholderContainer>
      )}
      <ProductImage
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoading ? 'none' : 'block' }}
      />
    </div>
  );
};