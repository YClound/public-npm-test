import React, { useState, useEffect } from 'react';
import { 
  ModalOverlay, 
  ModalContainer, 
  ModalHeader, 
  ModalTitle, 
  ModalCloseButton,
  ModalContent,
  ModalFooter 
} from './styles';
import Button from '../Button';

// 模态框属性
export interface ModalProps {
  title: React.ReactNode;
  visible: boolean;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  showCancel?: boolean;
  content?: string | React.ReactNode;
  onClose: () => void;
  onOk?: () => void;
  onCancel?: () => void;
}

// 模态框组件
const Modal: React.FC<ModalProps> = ({
  title,
  visible,
  onClose,
  children,
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel = onClose,
  showCancel = true,
  content = null
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  
  // 控制显示/隐藏动画
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      // 阻止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 延迟隐藏以等待动画完成
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = '';
    }
  }, [visible]);
  
  // 关闭模态框
  const handleClose = () => {
    if (onClose) onClose();
  };
  
  // 点击确认按钮
  const handleOk = () => {
    if (onOk) onOk();
    else handleClose();
  };
  
  // 点击取消按钮
  const handleCancel = () => {
    if (onCancel) onCancel();
    else handleClose();
  };
  
  if (!visible && !isVisible) return null;
  
  return (
    <ModalOverlay className={visible ? 'visible' : ''} onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseButton onClick={handleClose}>×</ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          {children || content}
        </ModalContent>
        <ModalFooter>
          {showCancel && (
            <Button variant="text" onClick={handleCancel}>
              {cancelText}
            </Button>
          )}
          <Button variant="primary" onClick={handleOk}>
            {okText}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal