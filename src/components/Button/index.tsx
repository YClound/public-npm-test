import React from 'react';
import BaseButton, { type ButtonVariant, type ButtonSize } from './styles';
import './index.css'

// 按钮属性
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

// 按钮组件
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  disabled = false,
  ...rest
}) => {
  return (
    <BaseButton variant={variant} size={size} disabled={disabled} {...rest}>
      {children}
    </BaseButton>
  );
};  

export default Button