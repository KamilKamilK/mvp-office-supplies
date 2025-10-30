import { defineConfig } from "eslint-define-config";

export default defineConfig({
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "airbnb-base"
    ],
    plugins: [
        "vue",
        "import"
    ],
    rules: {
        "no-console": "off",
        "no-debugger": "warn",
        "import/no-unresolved": "off",
        "vue/multi-word-component-names": "off"
    },
    ignorePatterns: [
        "*.scss",
        "*.gif",
        "*.png",
        "public/build/*"
    ]
});
