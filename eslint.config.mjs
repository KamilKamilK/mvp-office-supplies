import js from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';
import airbnbBase from 'eslint-config-airbnb-base';
import importPlugin from 'eslint-plugin-import';

import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    // Ignorowane pliki
    {
        ignores: [
            '**/node_modules/**',
            '**/public/build/**',
            '**/*.scss',
            '**/*.gif',
            '**/*.png',
            '**/vendor/**',
            '**/var/**'
        ]
    },

    // Podstawowa konfiguracja
    js.configs.recommended,

    // Vue 3
    ...vuePlugin.configs['flat/recommended'],

    // Airbnb base config
    {
        plugins: {
            import: importPlugin
        },
        rules: {
            ...airbnbBase.rules
        }
    },

    // Główna konfiguracja
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            }
        },
        rules: {
            // Wyłącz/dostosuj surowe reguły Airbnb
            'no-console': 'off',
            'no-debugger': 'warn',
            'import/no-unresolved': 'off',
            'import/extensions': 'off',
            'import/prefer-default-export': 'off',
            'vue/multi-word-component-names': 'off',
            'indent': ['error', 4],
            'max-len': ['error', { code: 120 }],
            'no-underscore-dangle': 'off',
        }
    },

    // Specyficzne dla Vue
    {
        files: ['**/*.vue'],
        rules: {
            'vue/html-indent': ['error', 2],
            'vue/max-attributes-per-line': ['error', {
                singleline: 3,
                multiline: 1
            }],
        }
    },

    {
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'warn'
        }
    }
];