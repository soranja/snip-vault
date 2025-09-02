import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

export default tseslint.config([
  // Ignore builds / auto-generated code
  { ignores: ['**/dist/**', '**/*.generated.*'] },

  // Base JS + TS recommended + Prettier compat
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  // React-specific rules for web and react-ui
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx}', 'packages/react-ui/**/*.{ts,tsx,js,jsx}'],
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },

  // TS / TSX rules (global)
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSPropertySignature[optional=true]',
          message:
            'Do not use optional (`?`) properties. Make fields required or use an explicit union with `undefined` if truly necessary.',
        },
        {
          selector: 'TSParameterProperty[parameter.optional=true]',
          message:
            'Do not use optional (`?`) parameter properties. Make them required or handle `undefined` explicitly.',
        },
        {
          selector: 'TSParameterDeclaration[optional=true]',
          message:
            'Do not use optional (`?`) parameters. Make them required or handle `undefined` via a union/default.',
        },
        {
          selector: 'TSUndefinedKeyword',
          message: 'Use `null` or a strict type instead of `undefined`.',
        },
      ],
    },
  },

  // JS / JSX rules (global)
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
]);
