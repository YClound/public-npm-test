import { useContext } from "react";
import { ThemeContext } from "../constants/theme";

// 主题钩子
export const useTheme = () => useContext(ThemeContext);