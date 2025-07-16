<template>
    <div class="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-lg">
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
                    Tạo tài khoản mới
                </h2>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Đã có tài khoản?
                    <NuxtLink to="/login"
                        class="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                        Đăng nhập ngay
                    </NuxtLink>
                </p>
            </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
            <!-- Main Card -->
            <div
                class="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg sm:rounded-lg border border-gray-200 dark:border-gray-700">
                <!-- Register Form -->
                <form @submit.prevent="handleRegister" class="space-y-6">
                    <!-- Personal Info Row -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Full Name -->
                        <div>
                            <label for="hoTen" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Họ và tên
                            </label>
                            <UInput id="hoTen" v-model="form.hoTen" type="text" placeholder="Nguyễn Văn A"
                                :disabled="loading" :error="!!errors.hoTen" size="lg" icon="i-heroicons-identification"
                                class="w-full" />
                            <p v-if="errors.hoTen" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.hoTen }}
                            </p>
                        </div>

                        <!-- Phone Number -->
                        <div>
                            <label for="soDt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Số điện thoại
                            </label>
                            <UInput id="soDt" v-model="form.soDt" type="tel" placeholder="0123456789"
                                :disabled="loading" :error="!!errors.soDt" size="lg" icon="i-heroicons-phone"
                                class="w-full" />
                            <p v-if="errors.soDt" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.soDt }}
                            </p>
                        </div>
                    </div>

                    <!-- Account Info Row -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Username -->
                        <div>
                            <label for="taiKhoan"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tài khoản
                            </label>
                            <UInput id="taiKhoan" v-model="form.taiKhoan" type="text" placeholder="username123"
                                :disabled="loading" :error="!!errors.taiKhoan" size="lg" icon="i-heroicons-user"
                                class="w-full" />
                            <p v-if="errors.taiKhoan" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.taiKhoan }}
                            </p>
                        </div>

                        <!-- Email -->
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <UInput id="email" v-model="form.email" type="email" placeholder="example@email.com"
                                :disabled="loading" :error="!!errors.email" size="lg" icon="i-heroicons-envelope"
                                class="w-full" />
                            <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.email }}
                            </p>
                        </div>
                    </div>

                    <!-- Password Row -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Password -->
                        <div>
                            <label for="matKhau"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Mật khẩu
                            </label>
                            <UInput id="matKhau" v-model="form.matKhau" type="password" placeholder="Ít nhất 6 ký tự"
                                :disabled="loading" :error="!!errors.matKhau" size="lg" icon="i-heroicons-lock-closed"
                                class="w-full" />
                            <p v-if="errors.matKhau" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.matKhau }}
                            </p>
                        </div>

                        <!-- Confirm Password -->
                        <div>
                            <label for="confirmPassword"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Xác nhận mật khẩu
                            </label>
                            <UInput id="confirmPassword" v-model="confirmPassword" type="password"
                                placeholder="Nhập lại mật khẩu" :disabled="loading" :error="!!errors.confirmPassword"
                                size="lg" icon="i-heroicons-shield-check" class="w-full" />
                            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.confirmPassword }}
                            </p>
                        </div>
                    </div>

                    <!-- Terms & Conditions -->
                    <div class="flex items-start space-x-3">
                        <UCheckbox v-model="agreeToTerms" :disabled="loading" class="mt-1" />
                        <label class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer"
                            for="terms">
                            Tôi đồng ý với
                            <a href="#"
                                class="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 underline">
                                Điều khoản dịch vụ
                            </a>
                            và
                            <a href="#"
                                class="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 underline">
                                Chính sách bảo mật
                            </a>
                            của CyberFlix
                        </label>
                    </div>

                    <!-- Error Message -->
                    <UAlert v-if="registerError" icon="i-heroicons-exclamation-triangle" color="error" variant="soft"
                        :title="registerError"
                        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'neutral', variant: 'link', padded: false }"
                        @close="registerError = ''" />

                    <!-- Success Message -->
                    <UAlert v-if="registerSuccess" icon="i-heroicons-check-circle" color="success" variant="soft"
                        title="Đăng ký thành công!" description="Tài khoản của bạn đã được tạo. Đang chuyển hướng..."
                        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'neutral', variant: 'link', padded: false }"
                        @close="registerSuccess = false" />

                    <!-- Submit Button -->
                    <UButton type="submit" color="error" size="lg" :loading="loading"
                        :disabled="!isFormValid || loading" class="w-full justify-center">
                        <template v-if="loading">
                            <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2 animate-spin" />
                            Đang tạo tài khoản...
                        </template>
                        <template v-else>
                            <UIcon name="i-heroicons-user-plus" class="w-5 h-5 mr-2" />
                            Tạo tài khoản
                        </template>
                    </UButton>
                </form>

                <!-- Benefits -->
                <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div class="text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Bằng cách đăng ký, bạn sẽ có thể:
                        </p>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div class="flex items-center justify-center gap-2">
                                <UIcon name="i-heroicons-ticket" class="w-4 h-4 text-red-500" />
                                <span>Đặt vé online</span>
                            </div>
                            <div class="flex items-center justify-center gap-2">
                                <UIcon name="i-heroicons-heart" class="w-4 h-4 text-red-500" />
                                <span>Lưu phim yêu thích</span>
                            </div>
                            <div class="flex items-center justify-center gap-2">
                                <UIcon name="i-heroicons-gift" class="w-4 h-4 text-red-500" />
                                <span>Nhận ưu đãi đặc biệt</span>
                            </div>
                        </div>
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
import type { RegisterRequest } from '~/types'

// 🧭 Page meta
useHead({
    title: 'Đăng ký tài khoản'
})

// 📊 Reactive form data
const form = reactive<RegisterRequest>({
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    maNhom: 'GP01', // Default group
    hoTen: ''
})

const confirmPassword = ref('')
const agreeToTerms = ref(false)
const loading = ref(false)
const registerError = ref('')
const registerSuccess = ref(false)

// Form validation errors
const errors = reactive({
    taiKhoan: '',
    matKhau: '',
    confirmPassword: '',
    email: '',
    soDt: '',
    hoTen: ''
})

// 🧮 Computed validation
const isFormValid = computed(() => {
    return form.taiKhoan.length >= 3 &&
        form.matKhau.length >= 6 &&
        confirmPassword.value === form.matKhau &&
        form.email.includes('@') &&
        form.soDt.length >= 10 &&
        form.hoTen.length >= 2 &&
        agreeToTerms.value &&
        !Object.values(errors).some(error => error)
})

// 🔍 Form validation methods
const validateField = (field: keyof typeof form | 'confirmPassword') => {
    switch (field) {
        case 'taiKhoan':
            if (!form.taiKhoan) {
                errors.taiKhoan = 'Vui lòng nhập tài khoản'
            } else if (form.taiKhoan.length < 3) {
                errors.taiKhoan = 'Tài khoản phải có ít nhất 3 ký tự'
            } else if (!/^[a-zA-Z0-9_]+$/.test(form.taiKhoan)) {
                errors.taiKhoan = 'Tài khoản chỉ được chứa chữ, số và dấu gạch dưới'
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
            // Revalidate confirm password if it exists
            if (confirmPassword.value) {
                validateField('confirmPassword')
            }
            break
        case 'confirmPassword':
            if (!confirmPassword.value) {
                errors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
            } else if (confirmPassword.value !== form.matKhau) {
                errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
            } else {
                errors.confirmPassword = ''
            }
            break
        case 'email':
            if (!form.email) {
                errors.email = 'Vui lòng nhập email'
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                errors.email = 'Email không đúng định dạng'
            } else {
                errors.email = ''
            }
            break
        case 'soDt':
            if (!form.soDt) {
                errors.soDt = 'Vui lòng nhập số điện thoại'
            } else if (!/^[0-9]{10,11}$/.test(form.soDt)) {
                errors.soDt = 'Số điện thoại phải có 10-11 chữ số'
            } else {
                errors.soDt = ''
            }
            break
        case 'hoTen':
            if (!form.hoTen) {
                errors.hoTen = 'Vui lòng nhập họ và tên'
            } else if (form.hoTen.length < 2) {
                errors.hoTen = 'Họ và tên phải có ít nhất 2 ký tự'
            } else {
                errors.hoTen = ''
            }
            break
    }
}

// 🎯 Register handler
const handleRegister = async () => {
    // Validate all fields
    Object.keys(form).forEach(field => validateField(field as keyof typeof form))
    validateField('confirmPassword')

    if (!isFormValid.value) return

    try {
        loading.value = true
        registerError.value = ''

        const { register } = useApi()
        await register(form)

        // Success state
        registerSuccess.value = true
        useAppToast().success('Đăng ký thành công!', 'Chào mừng bạn đến với CyberFlix')

        // Redirect to login after 2 seconds
        setTimeout(() => {
            navigateTo('/login')
        }, 2000)

    } catch (error: unknown) {
        console.error('Register error:', error)
        registerError.value = getErrorMessage(error, 'Đăng ký thất bại. Vui lòng thử lại.')
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

watch(() => confirmPassword.value, () => {
    if (errors.confirmPassword) validateField('confirmPassword')
})

watch(() => form.email, () => {
    if (errors.email) validateField('email')
})

watch(() => form.soDt, () => {
    if (errors.soDt) validateField('soDt')
})

watch(() => form.hoTen, () => {
    if (errors.hoTen) validateField('hoTen')
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
    confirmPassword.value = ''
})
</script>

<style scoped>
/* Clean, minimal styling consistent with login */
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

:deep(.ui-checkbox) {
    color: #dc2626;
}

:deep(.ui-checkbox:focus) {
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}


/* Responsive improvements */
@media (max-width: 640px) {
    .grid-cols-2 {
        grid-template-columns: 1fr;
    }

    .space-y-6>*+* {
        margin-top: 1.25rem;
    }
}
</style>