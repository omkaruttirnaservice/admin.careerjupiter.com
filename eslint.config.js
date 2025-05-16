import { defineConfig } from 'eslint-define-config';
import importPlugin from 'eslint-plugin-import';

export default defineConfig({
    languageOptions: {
        globals: {
            window: 'readonly',
            document: 'readonly',
            // add more globals as needed
        },
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    plugins: {
        import: importPlugin,
    },
    rules: {
        'import/no-unresolved': ['error', { caseSensitive: true }],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
});
