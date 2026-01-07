module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    extends: ['airbnb-base', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
    plugins: ['vue'],
    rules: {
        'import/extensions': 'off',
        'no-console': 'off',
        'import/no-unresolved': 'off',
        'no-param-reassign': ['error', { props: false }],
        'import/prefer-default-export': 'off',
    },
};
