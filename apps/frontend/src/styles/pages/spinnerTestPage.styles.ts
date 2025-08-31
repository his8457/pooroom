import styled from 'styled-components';

export const TestContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

export const TestTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 40px;
`;

export const TestSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

export const TestLabel = styled.h2`
  color: #374151;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
`;

export const SpinnerDemo = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    min-width: 120px;

    p {
      margin: 0;
      font-weight: 600;
      color: #6b7280;
      font-size: 14px;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
  }
`;