import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: true,
    },
  },
  resolve: {
    alias: {
      vue: '@vue/compat/dist/vue.esm-bundler.js',
      '@testing-library/vue': '@testing-library/vue/src/index',
    }
  },
})