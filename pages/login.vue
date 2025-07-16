<template>
    <div class="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <!-- Logo & Title -->
            <div class="text-center">
                <NuxtLink to="/" class="inline-flex items-center justify-center space-x-3 mb-8 group">
                    <div
                        class="flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl group-hover:bg-red-700 transition-colors duration-200">
                        <UIcon name="i-heroicons-film" class="w-7 h-7 text-white" />
                    </div>
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">CyberFlix</span>
                </NuxtLink>

                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Đăng nhập tài khoản
                </h2>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Hoặc
                    <NuxtLink to="/register"
                        class="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                        tạo tài khoản mới
                    </NuxtLink>
                </p>
            </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <!-- Main Card -->
            <div
                class="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg sm:rounded-lg border border-gray-200 dark:border-gray-700">
                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <!-- Username Field -->
                    <div>
                        <label for="taiKhoan" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tài khoản
                        </label>
                        <UInput id="taiKhoan" v-model="form.taiKhoan" type="text" placeholder="Nhập tài khoản của bạn"
                            :disabled="loading" :error="!!errors.taiKhoan" size="lg" icon="i-heroicons-user"
                            class="w-full" />
                        <p v-if="errors.taiKhoan" class="mt-1 text-sm text-red-600 dark:text-red-400">
                            {{ errors.taiKhoan }}
                        </p>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="matKhau" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mật khẩu
                        </label>
                        <UInput id="matKhau" v-model="form.matKhau" type="password" placeholder="Nhập mật khẩu của bạn"
                            :disabled="loading" :error="!!errors.matKhau" size="lg" icon="i-heroicons-lock-closed"
                            class="w-full" />
                        <p v-if="errors.matKhau" class="mt-1 text-sm text-red-600 dark:text-red-400">
                            {{ errors.matKhau }}
                        </p>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <UCheckbox v-model="rememberMe" label="Ghi nhớ đăng nhập" :disabled="loading" />
                        <NuxtLink to="/forgot-password"
                            class="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                            Quên mật khẩu?
                        </NuxtLink>
                    </div>

                    <!-- Error Message -->
                    <UAlert v-if="loginError" icon="i-heroicons-exclamation-triangle" color="error" variant="soft"
                        :title="loginError"
                        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'neutral', variant: 'link', padded: false }"
                        @close="loginError = ''" />

                    <!-- Submit Button -->
                    <UButton type="submit" color="error" size="lg" :loading="loading"
                        :disabled="!isFormValid || loading" class="w-full justify-center">
                        <template v-if="loading">
                            <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2 animate-spin" />
                            Đang đăng nhập...
                        </template>
                        <template v-else>
                            <UIcon name="i-heroicons-arrow-right-end-on-rectangle" class="w-5 h-5 mr-2" />
                            Đăng nhập
                        </template>
                    </UButton>
                </form>

                <!-- Divider -->
                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                Hoặc đăng nhập với
                            </span>
                        </div>
                    </div>

                    <!-- Social Login -->
                    <div class="mt-6 grid grid-cols-2 gap-3">
                        <UButton variant="outline" color="neutral" :disabled="loading" class="w-full justify-center">
                            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </UButton>

                        <UButton variant="outline" color="neutral" :disabled="loading" class="w-full justify-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </UButton>
                    </div>
                </div>
            </div>

            <!-- Back to Home -->
            <div class="mt-6 text-center">
                <NuxtLink to="/"
                    class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm inline-flex items-center gap-2 transition-colors">
                    <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
                    <span>Quay về trang chủ</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LoginRequest } from '~/types'

// 🧭 Page meta
useHead({
    title: 'Đăng nhập'
})

// 📊 Reactive form data
const form = reactive<LoginRequest>({
    taiKhoan: '',
    matKhau: ''
})

const loading = ref(false)
const loginError = ref('')
const rememberMe = ref(false)

// Form validation errors
const errors = reactive({
    taiKhoan: '',
    matKhau: ''
})

// 🧮 Computed validation
const isFormValid = computed(() => {
    return form.taiKhoan.length >= 3 &&
        form.matKhau.length >= 6 &&
        !errors.taiKhoan &&
        !errors.matKhau
})

// 🔍 Form validation methods
const validateField = (field: keyof typeof form) => {
    switch (field) {
        case 'taiKhoan':
            if (!form.taiKhoan) {
                errors.taiKhoan = 'Vui lòng nhập tài khoản'
            } else if (form.taiKhoan.length < 3) {
                errors.taiKhoan = 'Tài khoản phải có ít nhất 3 ký tự'
            } else {
                errors.taiKhoan = ''
            }
            break
        case 'matKhau':
            if (!form.matKhau) {
                errors.matKhau = 'Vui lòng nhập mật khẩu'
            } else if (form.matKhau.length < 6) {
                errors.matKhau = 'Mật khẩu phải có ít nhất 6 ký tự'
            } else {
                errors.matKhau = ''
            }
            break
    }
}

// 🎯 Login handler
const handleLogin = async () => {
    // Validate all fields
    validateField('taiKhoan')
    validateField('matKhau')

    if (!isFormValid.value) return

    try {
        loading.value = true
        loginError.value = ''

        const { login } = useApi()
        const user = await login(form)

        // Success toast
        useAppToast().success('Đăng nhập thành công!', `Chào mừng ${user.hoTen}`)

        // Redirect to intended page or home
        const route = useRoute()
        const redirectTo = route.query.redirect as string || '/'
        await navigateTo(redirectTo)

    } catch (error: unknown) {
        console.error('Login error:', error)
        loginError.value = getErrorMessage(error, 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
    } finally {
        loading.value = false
    }
}

// 👀 Watchers for real-time validation
watch(() => form.taiKhoan, () => {
    if (errors.taiKhoan) validateField('taiKhoan')
})

watch(() => form.matKhau, () => {
    if (errors.matKhau) validateField('matKhau')
})

// 🔄 Auto-redirect if already logged in
onMounted(() => {
    const token = useCookie('token')
    if (token.value) {
        navigateTo('/')
    }
})

// 🧹 Cleanup on unmount
onUnmounted(() => {
    // Clear sensitive data
    form.matKhau = ''
})
</script>

<style scoped>
/* Clean, minimal styling */
:deep(.ui-input) {
    @apply transition-all duration-200;
}

:deep(.ui-input:focus) {
    border-color: #ef4444;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

:deep(.ui-button[color="error"]) {
    background-color: #dc2626;
    transition: all 0.2s ease;
}

:deep(.ui-button[color="error"]:hover) {
    background-color: #b91c1c;
}

:deep(.ui-button[color="error"]:focus) {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

:deep(.ui-button[variant="outline"]) {
    transition: all 0.2s ease;
}

:deep(.ui-button[variant="outline"]:hover) {
    background-color: #f9fafb;
}

:deep(.dark .ui-button[variant="outline"]:hover) {
    background-color: #374151;
}

:deep(.ui-checkbox) {
    color: #dc2626;
}

:deep(.ui-checkbox:focus) {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}


/* Responsive improvements */
@media (max-width: 640px) {
    .space-y-6>*+* {
        margin-top: 1.25rem;
    }
}
</style>