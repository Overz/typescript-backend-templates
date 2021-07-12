module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.ts'] }],
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'warn',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'arrow-body-style': 'warn',
    'no-plusplus': 'off',
    'react/prop-types': 'off',
    curly: [1, 'all'],
    complexity: [1, 10],
    'max-lines': ['error', 350],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
  },
};
