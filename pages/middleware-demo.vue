<template>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto space-y-8">
            <!-- Header -->
            <div class="text-center">
                <h1 class="text-3xl font-bold dark:text-white mb-4">🛡️ Middleware Demo</h1>
                <p class="text-xl text-gray-600 dark:text-gray-300">
                    Hiểu về Route Protection trong Nuxt 3
                </p>
            </div>

            <!-- Middleware Types -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Auth Middleware -->
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-lock-closed" class="w-5 h-5 text-white" />
                        </div>
                        <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 ml-3">
                            Auth Middleware
                        </h3>
                    </div>

                    <div class="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                        <p><strong>Mục đích:</strong> Bảo vệ routes cần đăng nhập</p>

                        <div>
                            <strong>Hoạt động:</strong>
                            <ul class="list-disc list-inside mt-1 space-y-1">
                                <li>Kiểm tra có token không</li>
                                <li>Verify token hợp lệ</li>
                                <li>Redirect về login nếu thất bại</li>
                            </ul>
                        </div>

                        <div>
                            <strong>Sử dụng:</strong>
                            <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">
                middleware: 'auth'
              </code>
                        </div>
                    </div>

                    <UButton color="primary" block class="mt-4" @click="navigateTo('/profile')">
                        Test Auth Middleware
                    </UButton>
                </div>

                <!-- Guest Middleware -->
                <div
                    class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-user-plus" class="w-5 h-5 text-white" />
                        </div>
                        <h3 class="text-lg font-semibold text-green-800 dark:text-green-200 ml-3">
                            Guest Middleware
                        </h3>
                    </div>

                    <div class="space-y-3 text-sm text-green-700 dark:text-green-300">
                        <p><strong>Mục đích:</strong> Chặn user đã đăng nhập</p>

                        <div>
                            <strong>Hoạt động:</strong>
                            <ul class="list-disc list-inside mt-1 space-y-1">
                                <li>Kiểm tra có token không</li>
                                <li>Verify token còn hợp lệ</li>
                                <li>Redirect về home nếu đã login</li>
                            </ul>
                        </div>

                        <div>
                            <strong>Sử dụng:</strong>
                            <code class="bg-green-100 dark:bg-green-800 px-2 py-1 rounded text-xs">
                middleware: 'guest'
              </code>
                        </div>
                    </div>

                    <UButton color="success" block class="mt-4" @click="navigateTo('/login')">
                        Test Guest Middleware
                    </UButton>
                </div>

                <!-- Admin Middleware -->
                <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-shield-check" class="w-5 h-5 text-white" />
                        </div>
                        <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 ml-3">
                            Admin Middleware
                        </h3>
                    </div>

                    <div class="space-y-3 text-sm text-red-700 dark:text-red-300">
                        <p><strong>Mục đích:</strong> Chỉ admin mới truy cập được</p>

                        <div>
                            <strong>Hoạt động:</strong>
                            <ul class="list-disc list-inside mt-1 space-y-1">
                                <li>Kiểm tra authentication</li>
                                <li>Kiểm tra quyền admin</li>
                                <li>Error 403 nếu không đủ quyền</li>
                            </ul>
                        </div>

                        <div>
                            <strong>Sử dụng:</strong>
                            <code class="bg-red-100 dark:bg-red-800 px-2 py-1 rounded text-xs">
                middleware: 'admin'
              </code>
                        </div>
                    </div>

                    <UButton color="error" block class="mt-4" @click="navigateTo('/admin')">
                        Test Admin Middleware
                    </UButton>
                </div>
            </div>

            <!-- How to Use -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 class="text-xl font-semibold dark:text-white mb-4">
                    📝 Cách sử dụng Middleware
                </h3>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Page Level -->
                    <div>
                        <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            🔸 Page Level Middleware
                        </h4>
                        <div class="bg-gray-800 rounded-lg p-4 text-sm">
                            <pre class="text-green-400"><code>&lt;script setup&gt;
// Áp dụng cho toàn bộ page
definePageMeta({
  middleware: 'auth'  // hoặc 'guest', 'admin'
})
&lt;/script&gt;</code></pre>
                        </div>
                    </div>

                    <!-- Global Middleware -->
                    <div>
                        <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            🔸 Global Middleware
                        </h4>
                        <div class="bg-gray-800 rounded-lg p-4 text-sm">
                            <pre class="text-green-400"><code>// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(() => {
  // Chạy trên mọi route
  console.log('Global middleware')
})</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Current Status -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 class="text-xl font-semibold dark:text-white mb-4">
                    📊 Trạng thái hiện tại
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                            🔐 Authentication Status
                        </h4>
                        <div class="flex items-center space-x-2">
                            <UBadge :color="isAuthenticated ? 'success' : 'error'">
                                {{ isAuthenticated ? 'Đã đăng nhập' : 'Chưa đăng nhập' }}
                            </UBadge>
                            <span v-if="currentUser" class="text-sm text-gray-600 dark:text-gray-300">
                                ({{ currentUser.hoTen }})
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                            👨‍💼 Admin Status
                        </h4>
                        <UBadge :color="isAdmin ? 'error' : 'neutral'">
                            {{ isAdmin ? 'Admin' : 'Người dùng thường' }}
                        </UBadge>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="mt-6 flex flex-wrap gap-3">
                    <UButton v-if="!isAuthenticated" color="primary" @click="navigateTo('/login')">
                        Đăng nhập
                    </UButton>

                    <UButton v-if="isAuthenticated" color="success" @click="navigateTo('/profile')">
                        Xem Profile
                    </UButton>

                    <UButton v-if="isAdmin" color="error" @click="navigateTo('/admin')">
                        Admin Panel
                    </UButton>

                    <UButton v-if="isAuthenticated" color="neutral" variant="outline" @click="handleLogout">
                        Đăng xuất
                    </UButton>
                </div>
            </div>

            <!-- Learning Notes -->
            <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                    💡 Ghi chú quan trọng
                </h3>

                <ul class="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <li>• <strong>Middleware chạy trước khi render page</strong> - có thể redirect/block</li>
                    <li>• <strong>Client-side only:</strong> Sử dụng <code>import.meta.client</code> để chỉ chạy trên
                        browser</li>
                    <li>• <strong>Error handling:</strong> Middleware có thể throw error để hiển thị error page</li>
                    <li>• <strong>Navigation guards:</strong> Tương tự React Router guards nhưng built-in Nuxt</li>
                    <li>• <strong>Async support:</strong> Có thể await API calls để verify permissions</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

// 📊 Page meta
useHead({
    title: 'Middleware Demo'
})

// 📱 Reactive data
const currentUser = ref<User | null>(null)
const isAuthenticated = ref(false)
const isAdmin = ref(false)

// 🎯 Methods
const handleLogout = () => {
    // Clear token cookie
    const token = useCookie('token')
    token.value = null

    // Update states
    currentUser.value = null
    isAuthenticated.value = false
    isAdmin.value = false

    // Success toast
    useAppToast().success('Đăng xuất thành công!')

    // Redirect to home
    navigateTo('/')
}

// 🔄 Lifecycle - Check auth status
onMounted(async () => {
    const token = useCookie('token')

    if (token.value) {
        try {
            const { getUserInfo } = useApi()
            currentUser.value = await getUserInfo()
            isAuthenticated.value = true
            isAdmin.value = currentUser.value?.maLoaiNguoiDung === 'QuanTri'
        } catch (error) {
            console.error('Auth check failed:', error)
            // Token might be expired
            token.value = null
        }
    }
})
</script>