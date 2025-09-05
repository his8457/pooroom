import styled from 'styled-components';

export const PlaceholderContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fallbackColor'].includes(prop),
})<{
  width: number;
  height: number;
  fallbackColor: string;
}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: linear-gradient(135deg, ${props => props.fallbackColor} 0%, ${props => props.fallbackColor}dd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.1) 10px,
      rgba(255, 255, 255, 0.1) 20px
    );
  }
`;

export const PlaceholderContent = styled.div`
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 8px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

export const ImageError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 14px;
  height: 100%;
`;