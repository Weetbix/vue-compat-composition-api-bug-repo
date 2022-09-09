import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      // '@testing-library/vue': '@testing-library/vue/src/index',
    }
  },
})