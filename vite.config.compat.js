import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: [
        '@vue/test-utils',
      ]
    }
  },
  resolve: {
    alias: {
      vue: '@vue/compat',
    }
  },
})