<template>
    <div class="min-h-screen bg-gray-900 text-white">
        <!-- Navigation Header -->
        <header class="bg-gray-800 shadow-lg sticky top-0 z-50">
            <nav class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <NuxtLink to="/" class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-film" class="w-8 h-8 text-red-500" />
                        <span class="text-xl font-bold text-white">CyberFlix</span>
                    </NuxtLink>

                    <!-- Navigation Menu -->
                    <div class="hidden md:flex items-center space-x-6">
                        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
                            class="text-gray-300 hover:text-white transition-colors duration-200"
                            active-class="text-red-500">
                            {{ item.label }}
                        </NuxtLink>
                    </div>

                    <!-- User Menu -->
                    <div class="flex items-center space-x-4">
                        <template v-if="user">
                            <!-- User is logged in -->
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-user-circle" class="w-6 h-6" />
                                <span class="text-sm">{{ user.hoTen }}</span>
                                <UButton @click="handleLogout" color="error" variant="ghost" size="sm">
                                    Đăng xuất
                                </UButton>
                            </div>
                        </template>
                        <template v-else>
                            <!-- User not logged in -->
                            <NuxtLink to="/login">
                                <UButton color="primary" variant="outline" size="sm">
                                    Đăng nhập
                                </UButton>
                            </NuxtLink>
                            <NuxtLink to="/register">
                                <UButton color="primary" size="sm">
                                    Đăng ký
                                </UButton>
                            </NuxtLink>
                        </template>

                        <!-- Mobile menu button -->
                        <UButton @click="toggleMobileMenu" class="md:hidden" color="neutral" variant="ghost"
                            :icon="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" />
                    </div>
                </div>

                <!-- Mobile Navigation -->
                <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 border-t border-gray-700">
                    <div class="flex flex-col space-y-2 pt-4">
                        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" @click="mobileMenuOpen = false"
                            class="text-gray-300 hover:text-white py-2 transition-colors duration-200"
                            active-class="text-red-500">
                            {{ item.label }}
                        </NuxtLink>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Main Content -->
        <main class="min-h-screen">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 border-t border-gray-700 py-8">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Company Info -->
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <UIcon name="i-heroicons-film" class="w-6 h-6 text-red-500" />
                            <span class="text-lg font-bold">CyberFlix</span>
                        </div>
                        <p class="text-gray-400 text-sm">
                            Hệ thống đặt vé xem phim trực tuyến hàng đầu Việt Nam.
                        </p>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul class="space-y-2 text-sm">
                            <li>
                                <NuxtLink to="/movies" class="text-gray-400 hover:text-white">Phim đang chiếu</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/cinemas" class="text-gray-400 hover:text-white">Rạp chiếu phim</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/promotions" class="text-gray-400 hover:text-white">Khuyến mãi</NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Liên hệ</h3>
                        <div class="space-y-2 text-sm text-gray-400">
                            <p>📧 support@cyberflix.vn</p>
                            <p>📞 1900 1008</p>
                            <p>🏢 CyberSoft Academy</p>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                    <p>&copy; 2024 CyberFlix. All rights reserved. Made with ❤️ for learning Vue & Nuxt.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import type { NavItem, User } from '~/types'

// 📱 Reactive data (giống useState trong React)
const mobileMenuOpen = ref(false)
const user = ref<User | null>(null)

// Check auth on mount and when token changes
const token = useCookie('token')

async function fetchUser() {
    if (token.value) {
        try {
            const { getUserInfo } = useApi()
            user.value = await getUserInfo()
        } catch {
            user.value = null
            token.value = null
        }
    } else {
        user.value = null
    }
}

onMounted(fetchUser)
watch(token, fetchUser)

const handleLogout = () => {
    token.value = null
    user.value = null
    window.location.reload()
}

// 🔗 Navigation items
const navItems: NavItem[] = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Phim', to: '/movies' },
    { label: 'Rạp chiếu', to: '/cinemas' },
    { label: 'Khuyến mãi', to: '/promotions' },
    { label: 'Middleware Demo', to: '/middleware-demo' }
]

// 🎯 Methods
const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

// 🧩 Meta tags for SEO
useHead({
    titleTemplate: '%s - CyberFlix',
    meta: [
        { name: 'description', content: 'Đặt vé xem phim trực tuyến dễ dàng với CyberFlix' },
        { property: 'og:title', content: 'CyberFlix - Đặt vé xem phim' },
        { property: 'og:description', content: 'Hệ thống đặt vé xem phim trực tuyến hàng đầu' }
    ]
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
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
</style>