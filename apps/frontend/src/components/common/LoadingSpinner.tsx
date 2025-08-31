import React from 'react';
import { LoadingContainer, Spinner, DotsSpinner, LoadingText } from '../../styles/components/loadingSpinner.styles';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'ring' | 'dots';
  showText?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = "로딩 중...", 
  size = 'medium',
  type = 'ring',
  showText = true
}) => {
  return (
    <LoadingContainer>
      {type === 'dots' ? (
        <DotsSpinner size={size}>
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </DotsSpinner>
      ) : (
        <Spinner size={size} />
      )}
      {showText && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );
};