import styled, { keyframes } from 'styled-components';
import { colors, shadows } from '../common.styles';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

export const ChatButtonContainer = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: ${colors.primary.gradient};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${shadows.large};
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: ${shadows.xl};
    animation: ${pulse} 1s ease-in-out;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
  }
`;

export const ChatIcon = styled.span`
  font-size: 28px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const NotificationDot = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 12px;
  height: 12px;
  background-color: ${colors.status.error};
  border: 2px solid white;
  border-radius: 50%;
  animation: ${bounce} 1s ease-in-out infinite;
`;