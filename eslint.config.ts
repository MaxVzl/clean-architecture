import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 'no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Ignore les arguments qui commencent par _
          varsIgnorePattern: '^_', // Ignore les variables qui commencent par _
          caughtErrorsIgnorePattern: '^_', // Ignore les erreurs dans les catch
        },
      ],
      'no-undef': 'error',
      eqeqeq: 'error',
      'prettier/prettier': 'error',
    },
  },
]);
