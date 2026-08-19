import js from '@eslint/js';
import globals from 'globals';

/**
 * ESLint flat config for the ODISHA SAFE client (ESLint 9+).
 *
 * ESLint 9 dropped support for the legacy `.eslintrc.cjs` format and now
 * requires this flat-config file. This mirrors the previous rules while
 * enabling JSX parsing and browser globals.
 */
export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
