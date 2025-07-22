import { createContext } from "react";

// 主题配置类型
export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  warningColor: string;
  dangerColor: string;
  darkColor: string;
  lightColor: string;
  borderRadius: string;
  boxShadow: string;
};

// 默认主题
export const defaultTheme:Theme = {
  primaryColor: '#165DFF',
  secondaryColor: '#7B61FF',
  successColor: '#00B42A',
  warningColor: '#FF7D00',
  dangerColor: '#F53F3F',
  darkColor: '#1D2129',
  lightColor: '#FFFFFF',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
};

// 创建主题上下文
export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {},
});