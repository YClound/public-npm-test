import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

// 基础按钮样式
const BaseButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  user-select: none;
  border-radius: var(--border-radius);
  
  /* 禁用状态 */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* 按钮大小 */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 4px 12px;
          font-size: 12px;
          height: 28px;
        `;
      case 'medium':
        return `
          padding: 6px 16px;
          font-size: 14px;
          height: 32px;
        `;
      case 'large':
        return `
          padding: 8px 20px;
          font-size: 16px;
          height: 40px;
        `;
    }
  }}
  
  /* 按钮变体样式 */
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: var(--primary-color);
          color: white;
          
          &:not(:disabled):hover {
            background-color: color-mix(in srgb, var(--primary-color) 90%, black 10%);
          }
          
          &:not(:disabled):active {
            background-color: color-mix(in srgb, var(--primary-color) 80%, black 20%);
          }
        `;
      case 'secondary':
        return `
          background-color: var(--secondary-color);
          color: white;
          
          &:not(:disabled):hover {
            background-color: color-mix(in srgb, var(--secondary-color) 90%, black 10%);
          }
          
          &:not(:disabled):active {
            background-color: color-mix(in srgb, var(--secondary-color) 80%, black 20%);
          }
        `;
      case 'success':
        return `
          background-color: var(--success-color);
          color: white;
          
          &:not(:disabled):hover {
            background-color: color-mix(in srgb, var(--success-color) 90%, black 10%);
          }
          
          &:not(:disabled):active {
            background-color: color-mix(in srgb, var(--success-color) 80%, black 20%);
          }
        `;
      case 'warning':
        return `
          background-color: var(--warning-color);
          color: white;
          
          &:not(:disabled):hover {
            background-color: color-mix(in srgb, var(--warning-color) 90%, black 10%);
          }
          
          &:not(:disabled):active {
            background-color: color-mix(in srgb, var(--warning-color) 80%, black 20%);
          }
        `;
      case 'danger':
        return `
          background-color: var(--danger-color);
          color: white;
          
          &:not(:disabled):hover {
            background-color: color-mix(in srgb, var(--danger-color) 90%, black 10%);
          }
          
          &:not(:disabled):active {
            background-color: color-mix(in srgb, var(--danger-color) 80%, black 20%);
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: var(--primary-color);
          
          &:not(:disabled):hover {
            background-color: color-mix(in srgb, var(--primary-color) 10%, transparent 90%);
          }
          
          &:not(:disabled):active {
            background-color: color-mix(in srgb, var(--primary-color) 20%, transparent 80%);
          }
        `;
    }
  }}
`;

export default BaseButton;    