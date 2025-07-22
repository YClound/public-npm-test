import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@yanan.g/publish-npm-test',
  base: '/publish-npm-test/',
  publicPath: '/publish-npm-test/',
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: 'src/components' }],
  },
});