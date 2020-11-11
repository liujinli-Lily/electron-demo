# my-project

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```
推荐使用yarn
```
npm install -g yarn

```
[参考文档](https://blog.csdn.net/David1025/article/details/104371208)

 问题记录
 1. 运行项目后窗口展示文件浏览器，原因是eslint报错，可按照eslint规则修改文件后再次运行，或者在electron-vue目录下3个webpack配置文件，关闭eslinit检查
 2. 项目中有使用console,eslint报错，在.eslintrc.js 文件中，rules补充 "no-console": "off",
 3. 组件中import 依赖，提示：'electron' should be listed in the project's dependencies, not devDependenci ..."，.eslintrc.js 文件中，rules补充"import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
 4. npm 打包项目提示模块解析失败，删掉cnpm 安装的node_modules，使用yarn重新安装一遍
 npm run bd


---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
