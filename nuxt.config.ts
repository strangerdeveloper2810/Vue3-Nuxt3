// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  // CSS Configuration
  css: ["~/assets/css/main.css"],

  // Modules
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@vueuse/nuxt",
  ],

  // Vite Configuration
  vite: {
    plugins: [tailwindcss()],
  },

  // TypeScript Configuration
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Auto-imports Configuration
  imports: {
    autoImport: true,
  },

  // SSR Configuration
  ssr: true,

  // App Configuration
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "CyberFlix - Đặt vé xem phim trực tuyến",
      meta: [
        {
          name: "description",
          content: "Hệ thống đặt vé xem phim trực tuyến hàng đầu Việt Nam",
        },
      ],
    },
  },

  // Runtime Configuration
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: "",

    // Public keys (exposed to client-side)
    public: {
      apiBase: "https://movieapi.cyberlearn.vn/api",
      maNhom: "GP01",
    },
  },
});
