import React, { type ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Toast 类型定义
type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

// Toast 选项
interface ToastOptions {
  duration?: number; // 持续时间(ms)，0表示不自动关闭
  position?: ToastPosition;
  onClose?: () => void;
}

// Toast 消息接口
interface ToastMessage {
  id: string;
  content: ReactNode;
  type: ToastType;
  options: ToastOptions;
  visible: boolean;
}

// 单例管理器
class ToastManager {
  // 存储不同位置的容器和根实例
  private containers = new Map<ToastPosition, {
    container: HTMLElement;
    root: ReactDOM.Root;
    queue: ToastMessage[];
  }>();

  // 默认配置
  private defaultOptions: ToastOptions = {
    duration: 3000,
    position: 'top-center'
  };

  constructor() {
    // 监听页面卸载，清理资源
    window.addEventListener('unload', () => this.cleanup());
  }

  // 获取或创建容器和根实例
  private getContainer(position: ToastPosition) {
    if (this.containers.has(position)) {
      return this.containers.get(position)!;
    }

    // 创建DOM容器
    const container = document.createElement('div');
    container.className = `toast-container`;
    container.dataset.position = position;
    document.body.appendChild(container);

    // 创建React根实例（只创建一次）
    const root = ReactDOM.createRoot(container);
    
    // 初始化队列
    const queue: ToastMessage[] = [];

    this.containers.set(position, { container, root, queue });
    return { container, root, queue };
  }

  // 渲染指定位置的Toast队列
  private renderQueue(position: ToastPosition) {
    const { root, queue } = this.getContainer(position);
    
    // 使用现有根实例更新，而不是重新创建
    root.render(
      <div className="toast-list">
        {queue.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => this.removeToast(toast.id, position)}
          />
        ))}
      </div>
    );
  }

  // 添加Toast
  addToast(content: ReactNode, type: ToastType, options: ToastOptions = {}) {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const { position } = mergedOptions;
    const { queue } = this.getContainer(position!);
    
    // 创建唯一ID
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // 添加到队列
    const newToast: ToastMessage = {
      id,
      content,
      type,
      options: mergedOptions,
      visible: true
    };
    
    queue.push(newToast);
    this.renderQueue(position!);
    
    // 自动关闭（如果设置了duration）
    if (mergedOptions.duration && mergedOptions.duration > 0) {
      const timer = setTimeout(() => {
        this.removeToast(id, position!);
      }, mergedOptions.duration);
      
      // 返回手动关闭函数
      return () => {
        clearTimeout(timer);
        this.removeToast(id, position!);
      };
    }
    
    // 对于不自动关闭的，返回手动关闭函数
    return () => this.removeToast(id, position!);
  }

  // 移除单个Toast
  private removeToast(id: string, position: ToastPosition) {
    const { queue } = this.getContainer(position);
    const toast = queue.find(item => item.id === id);
    
    if (toast) {
      // 先标记为不可见（触发退出动画）
      toast.visible = false;
      this.renderQueue(position);
      
      // 动画结束后从队列中移除
      setTimeout(() => {
        const { queue: newQueue } = this.getContainer(position);
        const index = newQueue.findIndex(item => item.id === id);
        if (index !== -1) {
          newQueue.splice(index, 1);
          this.renderQueue(position);
          
          // 如果队列为空，可以选择移除容器
          if (newQueue.length === 0) {
            this.cleanupContainer(position);
          }
        }
        
        // 调用用户提供的onClose回调
        toast.options.onClose?.();
      }, 300); // 与CSS动画时长保持一致
    }
  }

  // 清空所有Toast
  clearAll() {
    this.containers.forEach((_, position) => {
      this.cleanupContainer(position);
    });
  }

  // 清理指定位置的容器
  private cleanupContainer(position: ToastPosition) {
    if (this.containers.has(position)) {
      const { container, root } = this.containers.get(position)!;
      root.unmount();
      container.remove();
      this.containers.delete(position);
    }
  }

  // 清理所有资源
  private cleanup() {
    this.containers.forEach(({ container, root }) => {
      root.unmount();
      container.remove();
    });
    this.containers.clear();
  }
}

// Toast 项组件
const ToastItem: React.FC<{
  toast: ToastMessage;
  onClose: () => void;
}> = ({ toast, onClose }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  
  // 处理点击关闭
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  // 进入动画
  useEffect(() => {
    if (toast.visible && toastRef.current) {
      // 触发重排后添加可见类以启动动画
      setTimeout(() => {
        if (toastRef.current) {
          toastRef.current.classList.add('toast-visible');
        }
      }, 0);
    }
  }, [toast.visible]);

  // 确定样式类
  const classes = [
    'toast',
    `toast-${toast.type}`,
    toast.visible ? 'toast-enter' : 'toast-exit'
  ].join(' ');

  // 加载中图标
  const LoadingIcon = () => (
    <div className="toast-loading-icon">
      <svg width="16" height="16" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="currentColor" strokeWidth="8" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
          <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" values="0 221.91148575128553;221.91148575128553 221.91148575128553" keyTimes="0;1" />
        </circle>
      </svg>
    </div>
  );

  // 状态图标
  const Icon = () => {
    if (toast.type === 'loading') {
      return <LoadingIcon />;
    }
    
    const icons = {
      success: '✓',
      error: '✕',
      info: 'i',
      warning: '!'
    };
    
    return <span className="toast-icon">{icons[toast.type]}</span>;
  };

  return (
    <div
      ref={toastRef}
      className={classes}
      onClick={onClose}
    >
      <Icon />
      <div className="toast-content">{toast.content}</div>
      <button className="toast-close" onClick={handleCloseClick}>
        ×
      </button>
    </div>
  );
};

// 创建单例实例
const toastManager = new ToastManager();

// 对外暴露的API
export const Toast = {
  success: (content: ReactNode, options?: ToastOptions) => 
    toastManager.addToast(content, 'success', options),
  
  error: (content: ReactNode, options?: ToastOptions) => 
    toastManager.addToast(content, 'error', options),
  
  info: (content: ReactNode, options?: ToastOptions) => 
    toastManager.addToast(content, 'info', options),
  
  warning: (content: ReactNode, options?: ToastOptions) => 
    toastManager.addToast(content, 'warning', options),
  
  loading: (content: ReactNode, options?: ToastOptions) => 
    toastManager.addToast(content, 'loading', { ...options, duration: 0 }),
  
  clearAll: () => toastManager.clearAll()
};
    