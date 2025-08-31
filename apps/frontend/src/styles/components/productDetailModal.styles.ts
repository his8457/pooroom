import styled from 'styled-components';
import { colors, spacing } from '../common.styles';

// 커스텀 breakpoints 및 색상 추가
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

const extendedColors = {
  ...colors,
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  red: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
  green: {
    50: '#f0fdf4',
    600: '#16a34a',
  },
  blue: {
    600: '#2563eb',
    700: '#1d4ed8',
  },
};

const typography = {
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
};

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.md};
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  @media (max-width: ${breakpoints.tablet}) {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 12px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${spacing.md};
  right: ${spacing.md};
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  font-size: 24px;
  font-weight: bold;
  color: ${extendedColors.gray[600]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: ${extendedColors.gray[800]};
    transform: scale(1.05);
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  gap: ${spacing.xl};
  padding: ${spacing.xl};
  
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: ${spacing.lg};
    padding: ${spacing.lg};
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  min-width: 0;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const BrandName = styled.div`
  font-size: ${typography.sizes.sm};
  color: ${extendedColors.gray[600]};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProductTitle = styled.h1`
  font-size: ${typography.sizes.xl};
  font-weight: 600;
  color: ${extendedColors.gray[900]};
  margin: 0;
  line-height: 1.3;
`;

export const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

export const OriginalPrice = styled.span`
  font-size: ${typography.sizes.md};
  color: ${extendedColors.gray[500]};
  text-decoration: line-through;
`;

export const DiscountPrice = styled.span`
  font-size: ${typography.sizes.lg};
  font-weight: 600;
  color: ${extendedColors.gray[900]};
`;

export const Badge = styled.span`
  background: ${extendedColors.red[500]};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: ${typography.sizes.xs};
  font-weight: 600;
  text-transform: uppercase;
`;

export const Description = styled.p`
  font-size: ${typography.sizes.md};
  color: ${extendedColors.gray[700]};
  line-height: 1.6;
  margin: 0;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  background: ${extendedColors.gray[50]};
  border-radius: 8px;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing.xs};
  }
`;

export const DetailLabel = styled.span`
  font-size: ${typography.sizes.sm};
  color: ${extendedColors.gray[600]};
  font-weight: 500;
`;

export const DetailValue = styled.span`
  font-size: ${typography.sizes.sm};
  color: ${extendedColors.gray[900]};
  text-align: right;
  
  @media (max-width: ${breakpoints.mobile}) {
    text-align: left;
  }
`;

export const StockInfo = styled.div<{ isInStock: boolean }>`
  font-size: ${typography.sizes.sm};
  font-weight: 500;
  color: ${props => props.isInStock ? extendedColors.green[600] : extendedColors.red[600]};
  padding: ${spacing.sm};
  background: ${props => props.isInStock ? extendedColors.green[50] : extendedColors.red[50]};
  border-radius: 6px;
  text-align: center;
`;

export const ActionSection = styled.div`
  margin-top: ${spacing.lg};
`;

export const AddToCartButton = styled.button<{ isInStock: boolean }>`
  width: 100%;
  padding: ${spacing.md} ${spacing.lg};
  background: ${props => props.isInStock ? extendedColors.blue[600] : extendedColors.gray[400]};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${typography.sizes.md};
  font-weight: 600;
  cursor: ${props => props.isInStock ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  min-height: 48px;

  &:hover {
    background: ${props => props.isInStock ? extendedColors.blue[700] : extendedColors.gray[400]};
    transform: ${props => props.isInStock ? 'translateY(-1px)' : 'none'};
  }

  &:disabled {
    pointer-events: none;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: ${spacing.xl};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${spacing.xl};
  text-align: center;

  h2 {
    color: ${extendedColors.gray[900]};
    margin-bottom: ${spacing.md};
  }

  p {
    color: ${extendedColors.gray[600]};
    margin: 0;
  }
`;