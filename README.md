# vue-sfc-cli

[![Build Status](https://badgen.net/travis/FEMessage/vue-sfc-cli/master)](https://travis-ci.com/FEMessage/vue-sfc-cli)
[![NPM Download](https://badgen.net/npm/dm/vue-sfc-cli)](https://www.npmjs.com/package/vue-sfc-cli)
[![NPM Version](https://badge.fury.io/js/vue-sfc-cli.svg)](https://www.npmjs.com/package/vue-sfc-cli)
[![NPM License](https://badgen.net/npm/license/vue-sfc-cli)](https://github.com/FEMessage/vue-sfc-cli/blob/master/LICENSE)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

vue-sfc-cli is a powerful tool for developing vue single-file component.

It makes writing docs and demo easily, integrated with an automated github workflow, and is always ready to publish to npm with best practices.

[中文文档](./README-zh.md)

## Table Of Contents

- [Links](#links)
- [Notice](#notice)
  - [Requirement](#requirement)
  - [Prettier and husky](#prettier-and-husky)
  - [Stylelint](#stylelint)
  - [Windows](#windows)
- [Tutorial](#tutorial)
  - [Quick Start](#quick-start)
  - [Options](#options)
  - [Writing Example](#writing-example)
  - [API Documentation](#api-documentation)
    - [Props](#props)
    - [Slot](#slot)
    - [Event](#event)
    - [Methods](#methods)
  - [Working with third-party library](#working-with-third-party-library)
  - [Environment variable](#environment-variable)
- [Contributors](#contributors)

## Links

- [medium article](https://medium.com/deepexi/reveal-the-secret-of-vue-sfc-cli-69f0f21dbad3)

## Notice

### Requirement

Node.js 8.x

### Prettier and husky

The component template has built-in prettier and husky setup that can format code when you commit.

However, you need to execute commands as following, otherwise the commit hook will not take effect:

```sh
npx vue-sfc-cli

# git init must run before yarn
git init

yarn
```

### Stylelint

The component template has built-in stylelint, which perfectly supports less/sass, but not stylus(it cannot have comment)

### Windows

It is not recommended to generate components under Windows, cause `.sh` files may lost execution permissions.

## Tutorial

### Quick Start

```
npx vue-sfc-cli

# Next there will be a bunch of tips, please be sure to fill out
# Recommend kebab-case style, lowercase letters, multiple words separated by - (dash), such as my-component

# After filling the prompt
cd my-component

# Use git to initialize, so you can use the commit hook
git init

# Install dependency
yarn

# Develop component
yarn dev

# Build
yarn build

# Ready to publish!
# Or use `npm publish`
yarn publish
```

### Options

`-u`, `--upgrade`

According to the template files in the templates directory, new files will be generated and override the files with same name in current component directory. The default override files is defined in update-files.js. This option often used to upgrade the configuration of old components using the latest version of vue-sfc-cli：

**This option can also help any node.js project to set up configuration of AUTO npm publishment via travis ci**

```
# cd my-component
npx vue-sfc-cli -u
```

`--files`

If you want to update additional files, you can pass this option, multiple files use `,` to separate

```
npx vue-sfc-cli -u --files .babelrc.js,.eslintrc.js
```

`--test`

Generate a component template for testing, commonly used in CI.

```
npx vue-sfc-cli --test
```

`-o`, `--output`

Generate a component template in the specific output dir.

```
npx vue-sfc-cli --output ./outDir
```

`--name`, `--owner`

These two arguments are usually used together to generate component without prompt.

```
npx vue-sfc-cli --name log-viewer --owner FEMessage
```

### Writing Example

The docs directory hosts your component's examples. You just write markdown files, and they will turn into demo. It is also recommended to name the markdown files in kebab-case style.

Take the docs/draggable.md file of [upload-to-ali](https://github.com/FEMessage/upload-to-ali), the upload component as an example.

````
draggable example

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
````

`yarn dev` can turn this markdown file into live demo, which will show you what the component looks like and it's actual code. You can also modify the code and the demo can hot reload.

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1561702364721-6489a2cd-d21e-4382-b201-f9e6d1b5b022.png?x-oss-process=image/resize,w_1492)

### API Documentation

You can simply write comments in vue file to generate API documentation.

#### Props

Use multiple lines of comments in props

```
props: {
    /**
     * is upload multiple files
     */
    multiple: {
      type: Boolean,
      default: false
    },
}
```

#### Slot

On the slot line, use the comment at the beginning of @ slot

```
<!--@slot custom loading content -->
<slot name="spinner">
  <div class="upload-loading">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
    </svg>
  </div>
</slot>
```

#### Event

Use multi-line comments above the emit event

```
/**
 * @property {string} name - file name
 */
this.$emit('loading', name)
```

#### Methods

Above the method to be show in API doc, use multi-line comments and add @public

```
/**
 * trigger select files
 * @public
 */
selectFiles() {
  this.$refs.uploadInput.click()
},
```

preview like this

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562220787035-7da78cf9-ef5c-49d8-83b1-8cc296aa9add.png?x-oss-process=image/resize,w_1492)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/160590/1562220837322-f67bca09-e910-47e8-aa74-32cde527a4c8.png?x-oss-process=image/resize,w_1492)

### Working with third-party library

To [Element-UI](https://element.eleme.io/) As an example

```
yarn add element-ui
```

Add a file: `styleguide/element.js`

```
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 Vue.use(Element)
```

Modify configuration files: `styleguide.config.js`

```
module.exports = {
  // ...
  require: [
    './styleguide/element.js'
  ]
}
```

### Environment variable

If you need to use environment variables, it is recommended to use `dotenv`

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/levy9527/blog"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="https://github.com/FEMessage/vue-sfc-cli/commits?author=levy9527" title="Code">💻</a> <a href="#content-levy9527" title="Content">🖋</a> <a href="#translation-levy9527" title="Translation">🌍</a> <a href="#ideas-levy9527" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/FEMessage/vue-sfc-cli/pulls?q=is%3Apr+reviewed-by%3Alevy9527" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/vue-sfc-cli/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/vue-sfc-cli/issues?q=author%3Aevillt" title="Bug reports">🐛</a> <a href="https://github.com/FEMessage/vue-sfc-cli/commits?author=evillt" title="Tests">⚠️</a> <a href="#maintenance-evillt" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/vue-sfc-cli/commits?author=donaldshen" title="Code">💻</a> <a href="https://github.com/FEMessage/vue-sfc-cli/commits?author=donaldshen" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/vue-sfc-cli/commits?author=colmugx" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
