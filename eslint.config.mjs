import js from '@eslint/js';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['frontend/**/*.{js,jsx,ts,tsx}'],
    languageOptions: { sourceType: 'module', ecmaVersion: 2023 },
    plugins: { react: require('eslint-plugin-react') },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  },
  {
    files: ['backend/**/*.{js,ts}'],
    languageOptions: { ecmaVersion: 2022 },
    env: { node: true },
    rules: { 'no-console': 'off' }
  }
];
