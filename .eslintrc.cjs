module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
}
