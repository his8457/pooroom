import styled from 'styled-components';
import { colors, spacing, typography, breakpoints } from '../common.styles';

export const AddressManagerContainer = styled.div`
  h3 {
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.text.primary};
    margin-bottom: ${spacing.lg};
  }
`;

export const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: ${spacing.md};
    align-items: stretch;
  }
`;

export const AddNewButton = styled.button`
  padding: ${spacing.md} ${spacing.lg};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  border: none;
  border-radius: 8px;
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.primary.dark};
  }
`;

export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const AddressItem = styled.div`
  background-color: ${colors.background.primary};
  border: 1px solid ${colors.border.primary};
  border-radius: 12px;
  padding: ${spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: ${spacing.md};
  }
`;

export const AddressInfo = styled.div`
  flex: 1;
`;

export const AddressName = styled.h4`
  font-size: ${typography.fontSize.md};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

export const DefaultBadge = styled.span`
  padding: ${spacing.xs} ${spacing.sm};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  border-radius: 12px;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

export const RecipientInfo = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  margin: 0 0 ${spacing.xs} 0;
`;

export const AddressText = styled.p`
  font-size: ${typography.fontSize.md};
  color: ${colors.text.primary};
  margin: 0;
  line-height: 1.5;
`;

export const AddressActions = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const SetDefaultButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.background.secondary};
  color: ${colors.text.primary};
  border: 1px solid ${colors.border.primary};
  border-radius: 6px;
  font-size: ${typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${colors.background.hover};
    border-color: ${colors.border.hover};
  }

  &:disabled {
    background-color: ${colors.background.disabled};
    color: ${colors.text.disabled};
    cursor: not-allowed;
  }
`;

export const EditButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.primary.main};
  color: ${colors.text.inverse};
  border: none;
  border-radius: 6px;
  font-size: ${typography.fontSize.sm};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.primary.dark};
  }
`;

export const DeleteButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.status.error};
  color: ${colors.text.inverse};
  border: none;
  border-radius: 6px;
  font-size: ${typography.fontSize.sm};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }

  &:disabled {
    background-color: ${colors.background.disabled};
    color: ${colors.text.disabled};
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.xxl};
  color: ${colors.text.secondary};

  p {
    margin: ${spacing.sm} 0;
    font-size: ${typography.fontSize.md};
  }
`;

export const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const AddressForm = styled.div`
  background-color: ${colors.background.primary};
  border-radius: 12px;
  padding: ${spacing.xl};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;

  h4 {
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.text.primary};
    margin: 0 0 ${spacing.lg} 0;
  }

  button {
    margin-top: ${spacing.md};
    padding: ${spacing.sm} ${spacing.md};
    background-color: ${colors.primary.main};
    color: ${colors.text.inverse};
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;