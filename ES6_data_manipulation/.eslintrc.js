module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'plugin:jest/all'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['jest', 'import'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.jsx'] }
    }
  },
  rules: {
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        mjs: 'always',
        jsx: 'always'
      }
    ]
  },
  overrides: [
    {
      files: ['*.js'],
      excludedFiles: 'babel.config.js'
    }
  ]
};
