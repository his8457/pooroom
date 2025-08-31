import styled from 'styled-components';
import { colors, spacing, fontSize, borderRadius, shadows } from '../../styles/common.styles';

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: ${borderRadius.lg};
  margin-bottom: ${spacing.xxl};
`;

export const SlideWrapper = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
`;

export const Slide = styled.div<{ imageUrl: string }>`
  min-width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const SlideContent = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
  position: relative;
`;

export const SlideTitle = styled.h2`
  font-size: ${fontSize['3xl']};
  font-weight: 700;
  margin-bottom: ${spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

export const SlideSubtitle = styled.p`
  font-size: ${fontSize.lg};
  margin-bottom: ${spacing.xl};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

export const SlideButton = styled.button`
  background: ${colors.primary.gradient};
  color: white;
  border: none;
  padding: ${spacing.md} ${spacing.xl};
  border-radius: ${borderRadius.xl};
  font-size: ${fontSize.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${shadows.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.xl};
  }
`;

export const DotsContainer = styled.div`
  position: absolute;
  bottom: ${spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${spacing.sm};
`;

export const Dot = styled.button<{ isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: scale(1.2);
  }
`;