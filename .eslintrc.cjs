module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  overrides: [
    {
      files: ['*.tsx'], // Aplica as regras apenas a arquivos com extensão .tsx
      rules: {
        "@typescript-eslint/no-explicit-any": 0,
        semi: ['error', 'never'],
        quotes: ['error', 'single', { 'avoidEscape': true }],
        camelcase: ['error', { 'properties': 'always', 'ignoreDestructuring': true }],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            'selector': 'interface',
            'format': ['PascalCase'],
            'custom': {
              'regex': '^I[A-Z]',
              'match': true,
            },
          },
        ],
      },
    },
  ],
};