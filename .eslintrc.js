module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'rules': {
    'no-var': 'error',
    'no-extra-semi': 'error',
    '@typescript-eslint/indent': ['error', 2],
    'import/extensions': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'space-before-function-paren': 0,
    'eol-last': 0, 
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-console': ['error', { allow: ['log', 'warn'] }],
    'arrow-parens': 0,
    'comma-dangle': [2, 'never'], 
    'no-undef': 0
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true
    }
  }
};
