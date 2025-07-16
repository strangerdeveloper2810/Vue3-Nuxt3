<template>
  <div id="app">
    <!-- Global Loading Bar -->
    <LazyNuxtLoadingIndicator color="#ef4444" />

    <!-- Toast Notifications Container -->
    <UNotifications />

    <!-- Main App Layout -->
    <NuxtLayout>
      <!-- Page Content -->
      <NuxtPage />
    </NuxtLayout>

    <!-- Global Modals/Dialogs -->
    <UModals />
  </div>
</template>

<script setup lang="ts">
// 🌍 Global app configuration

// SEO & Meta tags cho toàn bộ app
useHead({
  titleTemplate: '%s - CyberFlix',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#1f2937' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'CyberFlix' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
  ]
})

// 🎨 Global color mode (dark/light theme)
const colorMode = useColorMode()

// Set default theme
onMounted(() => {
  // Force dark mode for now (có thể thêm toggle sau)
  colorMode.preference = 'dark'
})

// 🔐 Global auth state check
const checkAuthStatus = async () => {
  const token = useCookie('token')

  if (token.value) {
    try {
      // Validate token on app start
      const { getUserInfo } = useApi()
      await getUserInfo()
    } catch {
      // Token expired, clear it
      console.warn('Token expired, clearing auth')
      token.value = null
    }
  }
}

// 🚀 App initialization
onMounted(async () => {
  await checkAuthStatus()

  // Add any global event listeners
  // Performance monitoring, analytics, etc.
})

// 🧹 Global error handling
const handleGlobalError = (error: Error) => {
  console.error('Global error:', error)
  const toast = useAppToast()
  toast.error('Đã có lỗi xảy ra', 'Vui lòng thử lại sau')
}

// Register global error handler
if (import.meta.client) {
  window.addEventListener('error', (event) => {
    handleGlobalError(event.error)
  })

  window.addEventListener('unhandledrejection', (event) => {
    handleGlobalError(new Error(event.reason))
  })
}
</script>

<style>
/* 🎨 Global CSS Variables */
:root {
  --color-primary: #ef4444;
  --color-primary-dark: #dc2626;
  --color-background: #111827;
  --color-surface: #1f2937;
}

/* 🌐 Global App Styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--color-background);
  color: white;
  line-height: 1.6;
}

/* 📱 Responsive typography */
@media (max-width: 640px) {
  html {
    font-size: 14px;
  }
}

/* 🎬 Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* 🔥 Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* 🎯 Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* 📺 Aspect ratio utilities */
.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-poster {
  aspect-ratio: 2 / 3;
}
</style>