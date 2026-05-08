# 包版本发布到npm上
## 本地打包
npm run build

## 切换registry
npm config set registry https://registry.npmjs.org
或
.npmrc 切换registry

```bash
# registry=https://registry.npmmirror.com
registry=https://registry.npmjs.org
````

## 登录npm
npm login

# 设置npm注册中心
npm config set //registry.npmjs.org/:_authToken=npm_authToken

## 发布到npm
npm publish --access public    
