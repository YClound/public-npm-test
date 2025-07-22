import React, { useState } from 'react';
import { defaultTheme, ThemeContext, type Theme } from '../constants/theme'

// 主题提供者组件
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // 将主题应用到 CSS 变量
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--success-color', theme.successColor);
    root.style.setProperty('--warning-color', theme.warningColor);
    root.style.setProperty('--danger-color', theme.dangerColor);
    root.style.setProperty('--dark-color', theme.darkColor);
    root.style.setProperty('--light-color', theme.lightColor);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--box-shadow', theme.boxShadow);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};