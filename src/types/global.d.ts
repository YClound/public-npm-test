// 声明全局CSS模块类型
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// 如果你使用了CSS模块（文件名如xxx.module.css）
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// 声明其他静态资源类型（可选）
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';