import styled from 'styled-components';
import { colors, spacing, typography, breakpoints } from '../common.styles';

export const MyPageContainer = styled.div`
  min-height: 100vh;
  background-color: ${colors.background.primary};
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.md};
  display: flex;
  gap: ${spacing.xl};

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    padding: ${spacing.md};
    gap: ${spacing.md};
  }
`;

export const SideMenu = styled.nav`
  width: 240px;
  min-width: 240px;
  flex-shrink: 0;
  background-color: ${colors.background.secondary};
  border-radius: 12px;
  padding: ${spacing.lg};
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    min-width: auto;
    display: flex;
    overflow-x: auto;
    padding: ${spacing.md};
    gap: ${spacing.sm};
  }
`;

export const MenuItem = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: ${spacing.md} ${spacing.lg};
  border: none;
  background-color: ${props => props.isActive ? colors.primary.main : 'transparent'};
  color: ${props => props.isActive ? colors.text.inverse : colors.text.primary};
  border-radius: 8px;
  margin-bottom: ${spacing.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: ${typography.fontSize.md};
  font-weight: ${props => props.isActive ? '600' : '400'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.isActive ? colors.primary.main : colors.background.hover};
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: auto;
    white-space: nowrap;
    margin-bottom: 0;
    flex-shrink: 0;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  width: calc(100% - 240px - ${spacing.xl});
  min-width: 0;
  background-color: ${colors.background.secondary};
  border-radius: 12px;
  padding: ${spacing.xl};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: ${spacing.lg};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
  padding-bottom: ${spacing.md};
  border-bottom: 2px solid ${colors.border.primary};
`;

export const ProfileSection = styled.div`
  margin-bottom: ${spacing.xl};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  background-color: ${colors.background.primary};
  border-radius: 8px;
  border: 1px solid ${colors.border.primary};
`;

export const UserName = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin: 0;
`;

export const UserEmail = styled.p`
  font-size: ${typography.fontSize.md};
  color: ${colors.text.secondary};
  margin: 0;
`;

export const EditButton = styled.button`
  width: fit-content;
  padding: ${spacing.sm} ${spacing.lg};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  border: none;
  border-radius: 6px;
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.primary.dark};
  }

  &:disabled {
    background-color: ${colors.background.disabled};
    color: ${colors.text.disabled};
    cursor: not-allowed;
  }
`;