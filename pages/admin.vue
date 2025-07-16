<template>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="bg-red-600 rounded-lg p-6 mb-6">
                <h1 class="text-2xl font-bold text-white mb-2">👨‍💼 Quản trị viên</h1>
                <p class="text-red-100">Trang này được bảo vệ bởi admin middleware</p>
            </div>

            <!-- Admin Dashboard -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- User Management -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-users" class="w-6 h-6 text-white" />
                        </div>
                        <div class="ml-4">
                            <h3 class="font-semibold dark:text-white">Quản lý người dùng</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Xem và quản lý tài khoản</p>
                        </div>
                    </div>
                    <UButton block color="primary" variant="outline">
                        Xem danh sách
                    </UButton>
                </div>

                <!-- Movie Management -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-film" class="w-6 h-6 text-white" />
                        </div>
                        <div class="ml-4">
                            <h3 class="font-semibold dark:text-white">Quản lý phim</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Thêm, sửa, xóa phim</p>
                        </div>
                    </div>
                    <UButton block color="success" variant="outline">
                        Quản lý phim
                    </UButton>
                </div>

                <!-- Cinema Management -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-building-office" class="w-6 h-6 text-white" />
                        </div>
                        <div class="ml-4">
                            <h3 class="font-semibold dark:text-white">Quản lý rạp</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Lịch chiếu và suất chiếu</p>
                        </div>
                    </div>
                    <UButton block color="secondary" variant="outline">
                        Xem lịch chiếu
                    </UButton>
                </div>

                <!-- Booking Reports -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-chart-bar" class="w-6 h-6 text-white" />
                        </div>
                        <div class="ml-4">
                            <h3 class="font-semibold dark:text-white">Báo cáo đặt vé</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Thống kê và doanh thu</p>
                        </div>
                    </div>
                    <UButton block color="warning" variant="outline">
                        Xem báo cáo
                    </UButton>
                </div>

                <!-- System Settings -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-cog-6-tooth" class="w-6 h-6 text-white" />
                        </div>
                        <div class="ml-4">
                            <h3 class="font-semibold dark:text-white">Cài đặt hệ thống</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Cấu hình và bảo mật</p>
                        </div>
                    </div>
                    <UButton block color="neutral" variant="outline">
                        Cài đặt
                    </UButton>
                </div>

                <!-- Quick Actions -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                            <Icon name="i-heroicons-bolt" class="w-6 h-6 text-white" />
                        </div>
                        <div class="ml-4">
                            <h3 class="font-semibold dark:text-white">Thao tác nhanh</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Backup, logs, alerts</p>
                        </div>
                    </div>
                    <UButton block color="error" variant="outline">
                        System Tools
                    </UButton>
                </div>
            </div>

            <!-- Admin Info -->
            <div v-if="adminUser" class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mt-8">
                <h3 class="font-semibold text-red-800 dark:text-red-200 mb-4">
                    👨‍💼 Admin Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-red-700 dark:text-red-300">Tên admin:</span>
                        <span class="ml-2 font-medium text-red-800 dark:text-red-200">{{ adminUser.hoTen }}</span>
                    </div>
                    <div>
                        <span class="text-red-700 dark:text-red-300">Tài khoản:</span>
                        <span class="ml-2 font-medium text-red-800 dark:text-red-200">{{ adminUser.taiKhoan }}</span>
                    </div>
                    <div>
                        <span class="text-red-700 dark:text-red-300">Email:</span>
                        <span class="ml-2 font-medium text-red-800 dark:text-red-200">{{ adminUser.email }}</span>
                    </div>
                    <div>
                        <span class="text-red-700 dark:text-red-300">Loại người dùng:</span>
                        <UBadge color="error" class="ml-2">{{ adminUser.maLoaiNguoiDung }}</UBadge>
                    </div>
                </div>
            </div>

            <!-- Middleware Demo Info -->
            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mt-6">
                <h3 class="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                    🛡️ Admin Middleware Demo
                </h3>
                <p class="text-orange-700 dark:text-orange-300 text-sm mb-2">
                    Trang này sử dụng <code class="bg-orange-100 dark:bg-orange-800 px-1 rounded">admin</code>
                    middleware:
                </p>
                <ul class="text-orange-700 dark:text-orange-300 text-sm space-y-1 ml-4">
                    <li>• Kiểm tra authentication (có token không)</li>
                    <li>• Kiểm tra authorization (có quyền admin không)</li>
                    <li>• Redirect về login nếu chưa đăng nhập</li>
                    <li>• Hiển thị error 403 nếu không phải admin</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

// 🛡️ Apply admin middleware
definePageMeta({
    middleware: 'admin'
})

// 📊 Page meta
useHead({
    title: 'Quản trị viên'
})

// 📱 Reactive data
const adminUser = ref<User | null>(null)

// 🔄 Lifecycle - Load admin info
onMounted(async () => {
    try {
        const { getUserInfo } = useApi()
        adminUser.value = await getUserInfo()
    } catch (error) {
        console.error('Error loading admin info:', error)
        useAppToast().error('Không thể tải thông tin admin')
    }
})
</script>