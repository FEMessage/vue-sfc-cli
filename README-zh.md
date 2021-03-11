# vue-sfc-cli

[![Build Status](https://travis-ci.com/FEMessage/vue-sfc-cli.svg?branch=master)](https://travis-ci.com/FEMessage/vue-sfc-cli)
[![NPM Download](https://img.shields.io/npm/dm/vue-sfc-cli.svg)](https://www.npmjs.com/package/vue-sfc-cli)
[![NPM Version](https://badge.fury.io/js/vue-sfc-cli.svg)](https://www.npmjs.com/package/vue-sfc-cli)
[![NPM License](https://img.shields.io/npm/l/vue-sfc-cli.svg)](https://github.com/FEMessage/vue-sfc-cli/blob/master/LICENSE)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

🔨 组件研发利器，快速开发Vue单文件组件（SFC），内置最佳实践，集成自动化github workflow，随时准备发布npm。

## Table Of Contents

- [Links](#links)
- [注意事项](#注意事项)
  - [环境需求](#环境需求)
  - [Prettier and husky](#prettier-and-husky)
  - [Stylelint](#stylelint)
  - [Windows](#windows)
- [使用教程](#使用教程)
  - [快速开始](#快速开始)
  - [参数选项](#参数选项)
  - [示例文档](#示例文档)
  - [API文档](#api文档)
    - [props](#props)
    - [slot](#slot)
    - [event](#event)
    - [methods](#methods)
  - [引入第三方库](#引入第三方库)
  - [环境变量](#环境变量)

## Links

- [知乎文章](https://zhuanlan.zhihu.com/p/72590127)

## 注意事项

### 环境需求

Node.js 8.x

### Prettier and husky

组件模板内置prettier, 可以在提交代码时格式化。

注意的是需要先执行 `git init` 命令，之后再执行 `yarn` 安装依赖，否则提交钩子不生效。

### Stylelint

组件模板内置stylelint, 对 less/sass 支持友好, 但对 stylus 支持欠佳（不能写注释，否则会出错）

### Windows

不建议在Windows下生成组件, 因为.sh可能没有执行权限。

## 使用教程

### 快速开始

```
npx vue-sfc-cli

# 接下来会有一串的提示，请务必填写
# 推荐kebab-case风格，小写字母，多个单词用-（dash）分隔，如my-component

# 填充完提示后
cd my-component

# 使用git初始化，这样可以使用commit hook
git init

# 安装依赖
yarn

# 开始开发
yarn dev

# 打包
yarn build

# 可以发布了！
yarn publish
```

### 参数选项

`-u`, `--upgrade`

根据 template 目录下模板，生成新的文件，更新到当前组件中。使用的是覆盖策略，默认覆盖的文件定义在 update-files.js。常用于使用最新版本 vue-sfc-cli 对旧组件的配置进行升级。

**此参数还可以让任意 node.js 项目通过 travis ci 自动发布到 NPM**

```
# cd my-component
npx vue-sfc-cli -u
```

`--files`

如果想更新额外的文件，可以传此选项，后接文件名，多个文件使用 `,` 分隔

```
npx vue-sfc-cli -u --files .babelrc.js,.eslintrc.js
```

`--test`

生成一个测试的组件模板，常用于ci环境测试。

```
npx vue-sfc-cli --test
```

`-o`, `--output`

在指定的目录生成组件模板。

```
npx vue-sfc-cli --output ./outDir
```

`--name`, `--owner`

以命令形式生成组件，跳过询问过程。它们通常成对出现。

```
npx vue-sfc-cli --name log-viewer --owner FEMessage
```

### 示例文档

在docs目录下，新建 `md` 文件，建议命名同样是kebab-case

以上传组件[upload-to-ali](https://github.com/FEMessage/upload-to-ali)的 docs/draggable.md 文档为例

```
拖拽排序示例

​```vue
<template>
  <upload-to-ali :preview="false" v-model="url" multiple />
</template>
<script>
export default {
  data() {
    return {
      url: [
        'https://picsum.photos/300/300',
        'https://picsum.photos/400/400',
        'https://picsum.photos/555/555'
      ],
    }
  }
}
</script>
​```
```

`yarn dev` 时会转这个markdown文件就会换成demo，可以看到实际代码，还可以实时修改代码，让demo刷新

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1561702364721-6489a2cd-d21e-4382-b201-f9e6d1b5b022.png?x-oss-process=image/resize,w_1492)

### API文档

在vue文件里，编写注释，即可生成API文档。

#### props

在props里使用多行注释

```
props: {
    /**
     * 是否多选
     */
    multiple: {
      type: Boolean,
      default: false
    },
}
```

#### slot

在slot上一行，使用  @slot 开头的注释

```
<!--@slot 自定义loading内容，默认类似 element-ui 的 v-loading -->
<slot name="spinner">
  <div class="upload-loading">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
    </svg>
  </div>
</slot>
```

#### event

在emit事件上方，使用多行注释

```
/**
 * 上传过程中
 * @property {string} name - 当前上传的图片名称
 */
this.$emit('loading', name)
```

#### methods

在要公开显示的方法上方，使用多行注释，并添加 @public

```
/**
 * 手动触发选择文件事件
 * @public
 */
selectFiles() {
  this.$refs.uploadInput.click()
},
```

效果预览

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562220787035-7da78cf9-ef5c-49d8-83b1-8cc296aa9add.png?x-oss-process=image/resize,w_1492)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562220837322-f67bca09-e910-47e8-aa74-32cde527a4c8.png?x-oss-process=image/resize,w_1492)

### 引入第三方库

以[Element-UI](https://element.eleme.io/)为例

```
yarn add element-ui
```

新增一个文件：`styleguide/element.js`

```
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 Vue.use(Element)
```

修改配置文件：`styleguide.config.js`

```
module.exports = {
  // ...
  require: [
    './styleguide/element.js'
  ]
}
```

### 环境变量

如果需要使用环境变量，推荐使用 `dotenv`

```
yarn add dotenv --dev
```

```
// styleguide.config.js
const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = {
  webpackConfig: {
    // ...
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.config().parsed)
      })
    ]
  }
}
```
