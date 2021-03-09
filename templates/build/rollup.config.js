// rollup.config.js
import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.js',
  output: {
    name: '{{componentNamePascal}}',
    exports: 'named'
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      style: {
        postcssPlugins: [require('autoprefixer')]
      }
    }),
    babel({
      // according to the issue, using .babelrc.js can ignore plugins option
      // https://github.com/rollup/plugins/issues/381
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
      exclude: 'node_modules/**'
    })
  ]
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(terser())
}

export default config
