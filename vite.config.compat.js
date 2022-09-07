import { defineConfig } from 'vite'

export default defineConfig({
  test: {
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