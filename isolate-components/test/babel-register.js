const register = require('@babel/register').default
require('core-js/stable')
require('regenerator-runtime/runtime')

register({
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-typescript',
      { isTSX: true, allExtensions: true, onlyRemoveTypeImports: true },
    ],
    '@babel/preset-react',
  ],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
})
