import styled, { keyframes } from 'styled-components';

const gradientSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const dotBounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); opacity: 1; }
  40% { transform: translateY(-8px); opacity: 0.8; }
  60% { transform: translateY(-4px); opacity: 0.9; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
`;

export const Spinner = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  position: relative;
  width: ${props => {
    switch (props.size) {
      case 'small': return '20px';
      case 'large': return '40px';
      default: return '28px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '20px';
      case 'large': return '40px';
      default: return '28px';
    }
  }};

  /* Gradient Ring Spinner */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top: 3px solid #667eea;
    border-right: 3px solid #764ba2;
    animation: ${gradientSpin} 1s linear infinite;
  }

  /* Inner pulse dot */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;

export const DotsSpinner = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  display: flex;
  gap: ${props => {
    switch (props.size) {
      case 'small': return '4px';
      case 'large': return '8px';
      default: return '6px';
    }
  }};

  .dot {
    width: ${props => {
      switch (props.size) {
        case 'small': return '6px';
        case 'large': return '12px';
        default: return '8px';
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small': return '6px';
        case 'large': return '12px';
        default: return '8px';
      }
    }};
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    animation: ${dotBounce} 1.4s ease-in-out infinite both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
`;

export const LoadingText = styled.p`
  color: #667eea;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;