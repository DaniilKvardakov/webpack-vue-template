module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/no-var-requires': 'off',
    'strict': ['warn', 'global'],

    'linebreak-style': 'off',
    '@typescript-eslint/quotes': [2, 'single', { avoidEscape: true }],
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
