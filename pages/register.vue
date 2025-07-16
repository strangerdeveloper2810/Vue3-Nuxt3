<template>
  <div
    class="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-lg">
      <!-- Logo & Title -->
      <div class="text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center space-x-3 mb-8 group"
        >
          <div
            class="flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl group-hover:bg-red-700 transition-colors duration-200"
          >
            <UIcon name="i-heroicons-film" class="w-7 h-7 text-white" />
          </div>
          <span class="text-3xl font-bold text-gray-900 dark:text-white"
            >CyberFlix</span
          >
        </NuxtLink>

        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Tạo tài khoản mới
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Đã có tài khoản?
          <NuxtLink
            to="/login"
            class="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
          >
            Đăng nhập ngay
          </NuxtLink>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <!-- Main Card -->
      <div
        class="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg sm:rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Personal Info Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Full Name -->
            <div>
              <label
                for="hoTen"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Họ và tên
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                >
                  <UIcon
                    name="i-heroicons-identification"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <UInput
                  id="hoTen"
                  v-model="form.hoTen"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  :disabled="loading"
                  :error="!!errors.hoTen"
                  size="lg"
                  class="w-full pl-12"
                />
              </div>
              <p
                v-if="errors.hoTen"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ errors.hoTen }}
              </p>
            </div>

            <!-- Phone Number -->
            <div>
              <label
                for="soDt"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Số điện thoại
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                >
                  <UIcon
                    name="i-heroicons-phone"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <UInput
                  id="soDt"
                  v-model="form.soDt"
                  type="tel"
                  placeholder="0123456789"
                  :disabled="loading"
                  :error="!!errors.soDt"
                  size="lg"
                  class="w-full pl-12"
                />
              </div>
              <p
                v-if="errors.soDt"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ errors.soDt }}
              </p>
            </div>
          </div>

          <!-- Account Info Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Username -->
            <div>
              <label
                for="taiKhoan"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Tài khoản
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                >
                  <UIcon
                    name="i-heroicons-user"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <UInput
                  id="taiKhoan"
                  v-model="form.taiKhoan"
                  type="text"
                  placeholder="username123"
                  :disabled="loading"
                  :error="!!errors.taiKhoan"
                  size="lg"
                  class="w-full pl-12"
                />
              </div>
              <p
                v-if="errors.taiKhoan"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ errors.taiKhoan }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                >
                  <UIcon
                    name="i-heroicons-envelope"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <UInput
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="example@email.com"
                  :disabled="loading"
                  :error="!!errors.email"
                  size="lg"
                  class="w-full pl-12"
                />
              </div>
              <p
                v-if="errors.email"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ errors.email }}
              </p>
            </div>
          </div>

          <!-- Password Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Password -->
            <div>
              <label
                for="matKhau"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Mật khẩu
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                >
                  <UIcon
                    name="i-heroicons-lock-closed"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <UInput
                  id="matKhau"
                  v-model="form.matKhau"
                  type="password"
                  placeholder="Ít nhất 6 ký tự"
                  :disabled="loading"
                  :error="!!errors.matKhau"
                  size="lg"
                  class="w-full pl-12"
                />
              </div>
              <p
                v-if="errors.matKhau"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ errors.matKhau }}
              </p>
              <!-- Password Requirements UI -->
              <div class="mt-3 space-y-1 text-xs">
                <div
                  :class="[
                    pwMinLength
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400',
                  ]"
                >
                  <UIcon
                    :name="
                      pwMinLength
                        ? 'i-heroicons-check-circle'
                        : 'i-heroicons-x-circle'
                    "
                    class="w-4 h-4 inline mr-1"
                  />
                  Tối thiểu 6 ký tự
                </div>
                <div
                  :class="[
                    pwMaxLength
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400',
                  ]"
                >
                  <UIcon
                    :name="
                      pwMaxLength
                        ? 'i-heroicons-check-circle'
                        : 'i-heroicons-x-circle'
                    "
                    class="w-4 h-4 inline mr-1"
                  />
                  Tối đa 34 ký tự
                </div>
                <div
                  :class="[
                    pwHasLower
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400',
                  ]"
                >
                  <UIcon
                    :name="
                      pwHasLower
                        ? 'i-heroicons-check-circle'
                        : 'i-heroicons-x-circle'
                    "
                    class="w-4 h-4 inline mr-1"
                  />
                  Ít nhất 1 chữ thường
                </div>
                <div
                  :class="[
                    pwHasUpper
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400',
                  ]"
                >
                  <UIcon
                    :name="
                      pwHasUpper
                        ? 'i-heroicons-check-circle'
                        : 'i-heroicons-x-circle'
                    "
                    class="w-4 h-4 inline mr-1"
                  />
                  Ít nhất 1 chữ hoa
                </div>
                <div
                  :class="[
                    pwHasNumber
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400',
                  ]"
                >
                  <UIcon
                    :name="
                      pwHasNumber
                        ? 'i-heroicons-check-circle'
                        : 'i-heroicons-x-circle'
                    "
                    class="w-4 h-4 inline mr-1"
                  />
                  Ít nhất 1 số
                </div>
                <div
                  :class="[
                    pwHasSpecial
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400',
                  ]"
                >
                  <UIcon
                    :name="
                      pwHasSpecial
                        ? 'i-heroicons-check-circle'
                        : 'i-heroicons-x-circle'
                    "
                    class="w-4 h-4 inline mr-1"
                  />
                  Ít nhất 1 ký tự đặc biệt
                </div>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Xác nhận mật khẩu
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                >
                  <UIcon
                    name="i-heroicons-shield-check"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <UInput
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  :disabled="loading"
                  :error="!!errors.confirmPassword"
                  size="lg"
                  class="w-full pl-12"
                />
              </div>
              <p
                v-if="errors.confirmPassword"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>

          <!-- Error Message -->
          <UAlert
            v-if="registerError"
            icon="i-heroicons-exclamation-triangle"
            color="error"
            variant="soft"
            :title="registerError"
            :close-button="{
              icon: 'i-heroicons-x-mark-20-solid',
              color: 'neutral',
              variant: 'link',
              padded: false,
            }"
            @close="registerError = ''"
          />

          <!-- Success Message -->
          <UAlert
            v-if="registerSuccess"
            icon="i-heroicons-check-circle"
            color="success"
            variant="soft"
            title="Đăng ký thành công!"
            description="Tài khoản của bạn đã được tạo. Đang chuyển hướng..."
            :close-button="{
              icon: 'i-heroicons-x-mark-20-solid',
              color: 'neutral',
              variant: 'link',
              padded: false,
            }"
            @close="registerSuccess = false"
          />

          <!-- Submit Button -->
          <UButton
            type="submit"
            color="error"
            size="lg"
            :loading="loading"
            :disabled="!isFormValid || loading"
            class="w-full justify-center"
          >
            <template v-if="loading">
              <UIcon
                name="i-heroicons-arrow-path"
                class="w-5 h-5 mr-2 animate-spin"
              />
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
            <div
              class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-500 dark:text-gray-400"
            >
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
        <NuxtLink
          to="/"
          class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm inline-flex items-center gap-2 transition-colors"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
          <span>Quay về trang chủ</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RegisterRequest } from "~/types";

// 🛡️ Apply guest middleware
definePageMeta({
  middleware: "guest",
});

// 🧭 Page meta
useHead({
  title: "Đăng ký tài khoản",
});

// 📊 Reactive form data
const form = reactive<RegisterRequest>({
  taiKhoan: "",
  matKhau: "",
  email: "",
  soDt: "",
  maNhom: "GP01", // Default group
  hoTen: "",
});

const confirmPassword = ref("");
const loading = ref(false);
const registerError = ref("");
const registerSuccess = ref(false);

// Form validation errors
const errors = reactive({
  taiKhoan: "",
  matKhau: "",
  confirmPassword: "",
  email: "",
  soDt: "",
  hoTen: "",
});

// Regex for username: only letters, numbers, underscores
const usernameRegex = /^[a-zA-Z0-9_]+$/;

// Password requirement regexes
const pwLowercase = /[a-z]/;
const pwUppercase = /[A-Z]/;
const pwNumber = /[0-9]/;
const pwSpecial = /[^a-zA-Z0-9]/;

// Computed for password requirements
const pwHasLower = computed(() => pwLowercase.test(form.matKhau));
const pwHasUpper = computed(() => pwUppercase.test(form.matKhau));
const pwHasNumber = computed(() => pwNumber.test(form.matKhau));
const pwHasSpecial = computed(() => pwSpecial.test(form.matKhau));
const pwMinLength = computed(() => form.matKhau.length >= 6);
const pwMaxLength = computed(
  () => form.matKhau.length > 0 && form.matKhau.length <= 34
);

// Update isFormValid
const isFormValid = computed(() => {
  return (
    form.taiKhoan.length >= 3 &&
    !errors.taiKhoan &&
    pwMinLength.value &&
    pwMaxLength.value &&
    pwHasLower.value &&
    pwHasUpper.value &&
    pwHasNumber.value &&
    pwHasSpecial.value &&
    form.email.includes("@") &&
    form.soDt.length >= 10 &&
    form.hoTen.length >= 2 &&
    !Object.values(errors).some((error) => error)
  );
});

// Update validateField
const validateField = (field: keyof typeof form | "password") => {
  switch (field) {
    case "taiKhoan":
      if (!form.taiKhoan) {
        errors.taiKhoan = "Vui lòng nhập tài khoản";
      } else if (form.taiKhoan.length < 3) {
        errors.taiKhoan = "Tài khoản phải có ít nhất 3 ký tự";
      } else if (!usernameRegex.test(form.taiKhoan)) {
        errors.taiKhoan = "Tài khoản không được chứa ký tự đặc biệt";
      } else {
        errors.taiKhoan = "";
      }
      break;
    case "matKhau":
      if (!form.matKhau) {
        errors.matKhau = "Vui lòng nhập mật khẩu";
      } else if (form.matKhau.length < 6) {
        errors.matKhau = "Mật khẩu phải có ít nhất 6 ký tự";
      } else if (form.matKhau.length > 34) {
        errors.matKhau = "Mật khẩu không được vượt quá 34 ký tự";
      } else if (
        !pwHasLower.value ||
        !pwHasUpper.value ||
        !pwHasNumber.value ||
        !pwHasSpecial.value
      ) {
        errors.matKhau = "Mật khẩu chưa đáp ứng đủ yêu cầu";
      } else {
        errors.matKhau = "";
      }
      break;
    case "password":
      if (!confirmPassword.value) {
        errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      } else if (confirmPassword.value !== form.matKhau) {
        errors.confirmPassword = "Mật khẩu xác nhận không khớp";
      } else {
        errors.confirmPassword = "";
      }
      break;
    case "email":
      if (!form.email) {
        errors.email = "Vui lòng nhập email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "Email không đúng định dạng";
      } else {
        errors.email = "";
      }
      break;
    case "soDt":
      if (!form.soDt) {
        errors.soDt = "Vui lòng nhập số điện thoại";
      } else if (!/^[0-9]{10,11}$/.test(form.soDt)) {
        errors.soDt = "Số điện thoại phải có 10-11 chữ số";
      } else {
        errors.soDt = "";
      }
      break;
    case "hoTen":
      if (!form.hoTen) {
        errors.hoTen = "Vui lòng nhập họ và tên";
      } else if (form.hoTen.length < 2) {
        errors.hoTen = "Họ và tên phải có ít nhất 2 ký tự";
      } else {
        errors.hoTen = "";
      }
      break;
  }
};

// 🎯 Register handler
const handleRegister = async () => {
  // Validate all fields
  Object.keys(form).forEach((field) =>
    validateField(field as keyof typeof form)
  );
  validateField("password");

  if (!isFormValid.value) return;

  try {
    loading.value = true;
    registerError.value = "";

    const { register } = useApi();
    await register(form);

    // Success toast
    useAppToast().success(
      "Đăng ký thành công!",
      "Chào mừng bạn đến với CyberFlix"
    );

    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigateTo("/login");
    }, 2000);
  } catch (error) {
    registerError.value = getErrorMessage(
      error,
      "Đăng ký thất bại. Vui lòng thử lại."
    );
    // Error toast
    useAppToast().error("Đăng ký thất bại!", registerError.value);
  } finally {
    loading.value = false;
  }
};

// 👀 Watchers for real-time validation
watch(
  () => form.taiKhoan,
  () => {
    if (errors.taiKhoan) validateField("taiKhoan");
  }
);

watch(
  () => form.matKhau,
  () => {
    if (errors.matKhau) validateField("matKhau");
  }
);

watch(
  () => confirmPassword.value,
  () => {
    if (errors.confirmPassword) validateField("password");
  }
);

watch(
  () => form.email,
  () => {
    if (errors.email) validateField("email");
  }
);

watch(
  () => form.soDt,
  () => {
    if (errors.soDt) validateField("soDt");
  }
);

watch(
  () => form.hoTen,
  () => {
    if (errors.hoTen) validateField("hoTen");
  }
);

// 🧹 Cleanup on unmount
onUnmounted(() => {
  // Clear sensitive data
  form.matKhau = "";
  confirmPassword.value = "";
});
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

  .space-y-6 > * + * {
    margin-top: 1.25rem;
  }
}
</style>
