<template>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-2xl mx-auto">
            <!-- Header -->
            <div class="bg-gray-800 rounded-lg p-6 mb-6">
                <h1 class="text-2xl font-bold text-white mb-2">👤 Thông tin cá nhân</h1>
                <p class="text-gray-300">Trang này được bảo vệ bởi auth middleware</p>
            </div>

            <!-- User Info Card -->
            <div v-if="user" class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div class="flex items-center mb-6">
                    <div
                        class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {{ user.hoTen.charAt(0).toUpperCase() }}
                    </div>
                    <div class="ml-4">
                        <h2 class="text-xl font-bold dark:text-white">{{ user.hoTen }}</h2>
                        <p class="text-gray-600 dark:text-gray-300">{{ user.email }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Account Info -->
                    <div class="space-y-3">
                        <h3 class="font-semibold dark:text-white mb-3">📝 Thông tin tài khoản</h3>

                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-300">Tài khoản:</span>
                            <span class="font-medium dark:text-white">{{ user.taiKhoan }}</span>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-300">Loại người dùng:</span>
                            <UBadge :color="user.maLoaiNguoiDung === 'QuanTri' ? 'error' : 'info'">
                                {{ user.maLoaiNguoiDung === 'QuanTri' ? 'Admin' : 'Khách hàng' }}
                            </UBadge>
                        </div>

                        <div class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-300">Số điện thoại:</span>
                            <span class="font-medium dark:text-white">{{ user.soDT || 'Chưa cập nhật' }}</span>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="space-y-3">
                        <h3 class="font-semibold dark:text-white mb-3">⚡ Thao tác nhanh</h3>

                        <UButton block variant="outline" icon="i-heroicons-film" @click="navigateTo('/movies')">
                            Xem phim
                        </UButton>

                        <UButton v-if="user.maLoaiNguoiDung === 'QuanTri'" block variant="outline" color="error"
                            icon="i-heroicons-cog-8-tooth" @click="navigateTo('/admin')">
                            Quản trị viên
                        </UButton>

                        <UButton block variant="outline" color="info" icon="i-heroicons-arrow-left-on-rectangle"
                            @click="handleLogout">
                            Đăng xuất
                        </UButton>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-else class="text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-300">Đang tải thông tin...</p>
            </div>

            <!-- Middleware Demo Info -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-6">
                <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    🛡️ Middleware Demo
                </h3>
                <p class="text-blue-700 dark:text-blue-300 text-sm">
                    Trang này sử dụng <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">auth</code> middleware.
                    Bạn sẽ bị redirect về trang login nếu chưa đăng nhập.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

// 🛡️ Apply auth middleware
definePageMeta({
    middleware: 'auth'
})

// 📊 Page meta
useHead({
    title: 'Thông tin cá nhân'
})

// 📱 Reactive data
const user = ref<User | null>(null)
const loading = ref(true)

// 🎯 Methods
const handleLogout = () => {
    // Clear token cookie
    const token = useCookie('token')
    token.value = null

    // Success toast
    useAppToast().success('Đăng xuất thành công!')

    // Redirect to home
    navigateTo('/')
}

// 🔄 Lifecycle - Load user info
onMounted(async () => {
    try {
        const { getUserInfo } = useApi()
        user.value = await getUserInfo()
    } catch (error) {
        console.error('Error loading user info:', error)
        useAppToast().error('Không thể tải thông tin người dùng')
    } finally {
        loading.value = false
    }
})
</script>