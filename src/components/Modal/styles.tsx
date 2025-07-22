import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.visible {
    opacity: 1;
  }
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 90%;
  max-width: 500px;
  transform: scale(0.9);
  transition: transform 0.3s ease;
  overflow: hidden;
  
  ${ModalOverlay}.visible & {
    transform: scale(1);
  }
`;

export const ModalHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--dark-color);
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #999;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--dark-color);
  }
`;

export const ModalContent = styled.div`
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--dark-color);
`;

export const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`; 