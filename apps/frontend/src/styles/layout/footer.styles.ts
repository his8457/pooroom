import styled from 'styled-components';
import { colors, spacing, fontSize } from '../../styles/common.styles';

export const FooterContainer = styled.footer`
  background: ${colors.text.primary};
  color: white;
  margin-top: ${spacing.xxl};
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xxl} ${spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${spacing.lg};
  }
`;

export const FooterSection = styled.div``;

export const FooterTitle = styled.h3`
  font-size: ${fontSize.lg};
  font-weight: 600;
  margin-bottom: ${spacing.lg};
  color: white;
`;

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: ${spacing.sm};
  }
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: ${colors.text.muted};
  font-size: ${fontSize.sm};
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
  
  &:hover {
    color: white;
  }
`;

export const CompanyInfo = styled.div`
  font-size: ${fontSize.sm};
  color: ${colors.text.muted};
  line-height: 1.6;
  
  p {
    margin: ${spacing.xs} 0;
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding: ${spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: ${fontSize.sm};
  color: ${colors.text.muted};
`;