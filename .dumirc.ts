import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'React Components Library',
  base: '/react-components-library/',
  publicPath: '/react-components-library/',
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: 'src/components' }],
  },
});