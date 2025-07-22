import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    react(),
    // 生成TypeScript类型声明文件
    dts({
      include: ["src/components/", "src/providers", "src/types", "src/index.ts"],
      outDir: "dist/types",
      // 指定类型声明文件，确保CSS模块类型被识别
      tsconfigPath: "./tsconfig.app.json",
    }),
    // 将CSS注入到JS中，确保样式能被正确引入
    libInjectCss(),
  ],
  build: {
    // 库模式打包配置
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // 入口文件
      name: "publishNpmTest", // 全局变量名
      formats: ["es", "umd", "cjs"], // 输出格式
      fileName: (format) => {
        // 不同格式的输出文件名
        switch (format) {
          case "es":
            return "index.esm.js";
          case "umd":
            return "index.umd.js";
          case "cjs":
            return "index.cjs.js";
          default:
            return `index.${format}.js`;
        }
      },
    },
    // Rollup打包选项
    rollupOptions: {
      // 排除外部依赖（由使用方提供）
      external: ["react", "react-dom"],
      // 全局变量映射（UMD模式使用）
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // 确保CSS文件能正确打包
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "index.css";
          }
          return assetInfo.name || "";
        },
      },
    },
    // 输出目录
    outDir: "dist",
    // 源映射
    sourcemap: true,
  },
  // 路径别名配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
