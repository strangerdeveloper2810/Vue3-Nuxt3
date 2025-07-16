<template>
    <div v-if="loading" class="min-h-screen bg-gray-900 flex items-center justify-center">
        <div class="text-center">
            <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-red-500 mx-auto mb-4" />
            <p class="text-gray-400">Đang tải thông tin phim...</p>
        </div>
    </div>

    <div v-else-if="error" class="min-h-screen bg-gray-900 flex items-center justify-center">
        <div class="text-center">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 class="text-2xl font-bold text-white mb-2">Không tìm thấy phim</h2>
            <p class="text-gray-400 mb-4">{{ error }}</p>
            <UButton to="/movies" color="error">Quay về danh sách phim</UButton>
        </div>
    </div>

    <div v-else-if="movie" class="min-h-screen bg-gray-900">
        <!-- Hero Section with Movie Banner -->
        <section class="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
            <!-- Background Image with Optimization -->
            <div class="absolute inset-0">
                <!-- Main Background Image -->
                <NuxtImg :src="movie.hinhAnh" :alt="`${movie.tenPhim} background`"
                    class="w-full h-full object-cover scale-105" :style="{ filter: 'blur(1px) brightness(0.6)' }"
                    sizes="100vw" quality="75" format="webp" loading="eager" @error="handleBackgroundError" />

                <!-- Fallback Background (if main image fails) -->
                <div v-if="backgroundImageError"
                    class="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
            </div>

            <!-- Enhanced Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/20"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-transparent to-gray-900/50"></div>

            <!-- Movie Info Overlay -->
            <div class="relative z-10 container mx-auto px-4 h-full flex items-end pb-4 sm:pb-6 md:pb-8">
                <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
                    <!-- Movie Poster -->
                    <div class="flex-shrink-0 mx-auto lg:mx-0">
                        <div class="relative group">
                            <NuxtImg :src="movie.hinhAnh" :alt="movie.tenPhim"
                                class="w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 object-cover rounded-lg shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px" quality="90"
                                format="webp" loading="eager" @error="handlePosterError"
                                @load="posterLoading = false" />

                            <!-- Poster Loading State -->
                            <div v-if="posterLoading && !posterImageError"
                                class="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center animate-pulse">
                                <UIcon name="i-heroicons-photo"
                                    class="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-gray-600" />
                            </div>

                            <!-- Poster Error State -->
                            <div v-if="posterImageError"
                                class="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                                <div class="text-center text-gray-400">
                                    <UIcon name="i-heroicons-photo" class="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2" />
                                    <p class="text-xs">Không có ảnh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Movie Details -->
                    <div class="flex-1 text-white text-center lg:text-left">
                        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 leading-tight">
                            {{ movie.tenPhim }}
                        </h1>

                        <div
                            class="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                            <!-- Rating -->
                            <div class="flex items-center bg-red-500 rounded-full px-2 sm:px-3 py-1">
                                <UIcon name="i-heroicons-star-solid" class="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                                <span class="font-medium text-sm sm:text-base">{{ movie.danhGia }}/10</span>
                            </div>

                            <!-- Release Date -->
                            <div class="flex items-center text-gray-300">
                                <UIcon name="i-heroicons-calendar-days" class="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                                <span class="text-sm sm:text-base">{{ formatDate(movie.ngayKhoiChieu) }}</span>
                            </div>

                            <!-- Status -->
                            <div class="flex gap-1 sm:gap-2">
                                <span v-if="movie.dangChieu"
                                    class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    Đang chiếu
                                </span>
                                <span v-if="movie.sapChieu"
                                    class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                    Sắp chiếu
                                </span>
                                <span v-if="movie.hot" class="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                    🔥 Hot
                                </span>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                            <UButton v-if="movie.trailer" :to="movie.trailer" target="_blank" external color="error"
                                :size="$route.path.includes('mobile') ? 'md' : 'lg'" class="flex-shrink-0">
                                <UIcon name="i-heroicons-play" class="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
                                <span class="hidden sm:inline">Xem trailer</span>
                                <span class="sm:hidden">Trailer</span>
                            </UButton>

                            <UButton color="neutral" variant="outline"
                                :size="$route.path.includes('mobile') ? 'md' : 'lg'" @click="scrollToShowtimes"
                                class="flex-shrink-0">
                                <UIcon name="i-heroicons-ticket" class="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
                                <span class="hidden sm:inline">Đặt vé ngay</span>
                                <span class="sm:hidden">Đặt vé</span>
                            </UButton>

                            <UButton color="neutral" variant="ghost"
                                :size="$route.path.includes('mobile') ? 'md' : 'lg'" @click="toggleWishlist"
                                class="flex-shrink-0">
                                <UIcon :name="isInWishlist ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                                    :class="isInWishlist ? 'text-red-500' : 'text-white'"
                                    class="w-4 sm:w-5 h-4 sm:h-5" />
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Movie Description -->
        <section class="py-12 bg-gray-800">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl font-bold text-white mb-6">Nội dung phim</h2>
                    <p class="text-gray-300 text-lg leading-relaxed">
                        {{ movie.moTa }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Showtimes Section -->
        <section ref="showtimesSection" class="py-12 bg-gray-900">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-white mb-8 text-center">Lịch chiếu & Đặt vé</h2>

                <div v-if="loadingShowtimes" class="text-center py-12">
                    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-red-500 mx-auto mb-4" />
                    <p class="text-gray-400">Đang tải lịch chiếu...</p>
                </div>

                <div v-else-if="movie.cumRapChieu && movie.cumRapChieu.length > 0">
                    <!-- Cinema Complex Tabs -->
                    <div class="mb-8">
                        <div class="flex flex-wrap gap-2 justify-center">
                            <button v-for="(complex, index) in movie.cumRapChieu" :key="complex.maCumRap"
                                @click="selectedComplexIndex = index" :class="[
                                    'px-4 py-2 rounded-lg transition-all duration-200 font-medium',
                                    selectedComplexIndex === index
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                ]">
                                {{ complex.tenCumRap }}
                            </button>
                        </div>
                    </div>

                    <!-- Selected Complex Showtimes -->
                    <div v-if="selectedComplex" class="bg-gray-800 rounded-lg p-4 sm:p-6">
                        <div class="flex items-center mb-4 sm:mb-6">
                            <div class="relative flex-shrink-0 mr-3 sm:mr-4">
                                <NuxtImg :src="selectedComplex.hinhAnh" :alt="selectedComplex.tenCumRap"
                                    class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                                    sizes="(max-width: 640px) 48px, 64px" quality="85" format="webp" loading="lazy"
                                    @error="handleCinemaImageError" />

                                <!-- Cinema Image Error Fallback -->
                                <div v-if="cinemaImageError"
                                    class="absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center">
                                    <UIcon name="i-heroicons-building-office"
                                        class="w-4 sm:w-6 h-4 sm:h-6 text-gray-500" />
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-lg sm:text-xl font-bold text-white truncate">
                                    {{ selectedComplex.tenCumRap }}</h3>
                                <p class="text-gray-400 text-sm sm:text-base line-clamp-2">{{ selectedComplex.diaChi }}
                                </p>
                            </div>
                        </div>

                        <!-- Showtimes Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div v-for="showtime in selectedComplex.lichChieuPhim" :key="showtime.maLichChieu"
                                class="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 class="text-white font-medium">{{ showtime.tenRap }}</h4>
                                        <p class="text-gray-400 text-sm">
                                            {{ formatDateTime(showtime.ngayChieuGioChieu) }}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-red-400 font-bold">{{ formatCurrency(showtime.giaVe) }}</p>
                                        <p class="text-gray-400 text-sm">{{ showtime.thoiLuong }} phút</p>
                                    </div>
                                </div>

                                <UButton :to="`/booking/${showtime.maLichChieu}`" color="error" size="sm" class="w-full"
                                    :disabled="isPastShowtime(showtime.ngayChieuGioChieu)">
                                    <UIcon name="i-heroicons-ticket" class="w-4 h-4 mr-2" />
                                    {{ isPastShowtime(showtime.ngayChieuGioChieu) ? 'Đã qua giờ chiếu' : 'Chọn ghế' }}
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-12">
                    <UIcon name="i-heroicons-film" class="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p class="text-gray-400">Hiện chưa có lịch chiếu cho phim này</p>
                </div>
            </div>
        </section>


    </div>
</template>

<script setup lang="ts">
import type { MovieDetail } from '~/types'

// 🧭 Get route parameters (giống useParams trong Next.js)
const route = useRoute()
const movieId = computed(() => Number(route.params.id))

// 📊 Reactive state
const loading = ref(true)
const loadingShowtimes = ref(false)
const error = ref<string | null>(null)
const movie = ref<MovieDetail | null>(null)
const isInWishlist = ref(false)
const selectedComplexIndex = ref(0)
const backgroundImageError = ref(false)
const posterLoading = ref(true)
const posterImageError = ref(false)
const cinemaImageError = ref(false) // New state for cinema image error

// Template refs
const showtimesSection = ref<HTMLElement>()

// 🧮 Computed properties
const selectedComplex = computed(() => {
    return movie.value?.cumRapChieu?.[selectedComplexIndex.value]
})



// 🎯 Methods
const formatDate = (dateString: string): string => {
    try {
        return new Date(dateString).toLocaleDateString('vi-VN')
    } catch {
        return 'N/A'
    }
}

const formatDateTime = (dateString: string): string => {
    try {
        return new Date(dateString).toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    } catch {
        return 'N/A'
    }
}

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount)
}

const isPastShowtime = (dateString: string): boolean => {
    return new Date(dateString) < new Date()
}

const handleBackgroundError = () => {
    backgroundImageError.value = true
}

const handlePosterError = () => {
    posterImageError.value = true
}

const handleCinemaImageError = () => {
    cinemaImageError.value = true
}

const scrollToShowtimes = () => {
    showtimesSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const toggleWishlist = () => {
    isInWishlist.value = !isInWishlist.value

    const toast = useToast()
    toast.add({
        title: isInWishlist.value ? 'Đã thêm vào yêu thích' : 'Đã xóa khỏi yêu thích',
        description: movie.value?.tenPhim,
        icon: isInWishlist.value ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'
    })
}

const fetchMovieDetail = async () => {
    try {
        loading.value = true
        error.value = null

        const { getMovieDetail } = useApi()
        movie.value = await getMovieDetail(movieId.value)

    } catch (err: unknown) {
        console.error('Error fetching movie detail:', err)
        error.value = 'Không thể tải thông tin phim. Vui lòng thử lại.'
    } finally {
        loading.value = false
    }
}

// 🔄 Lifecycle
onMounted(() => {
    fetchMovieDetail()

    // Check wishlist
    const wishlist = useLocalStorage<number[]>('wishlist', [])
    isInWishlist.value = wishlist.value.includes(movieId.value)
})

// 👀 Watch for movie ID changes
watch(() => movieId.value, () => {
    if (movieId.value) {
        fetchMovieDetail()
    }
})

// 🧩 SEO Meta
useHead(() => ({
    title: movie.value?.tenPhim || 'Chi tiết phim',
    meta: [
        { name: 'description', content: movie.value?.moTa || 'Thông tin chi tiết về phim' },
        { property: 'og:title', content: movie.value?.tenPhim },
        { property: 'og:description', content: movie.value?.moTa },
        { property: 'og:image', content: movie.value?.hinhAnh }
    ]
}))
</script>

<style scoped>
/* Custom scrollbar for showtimes */
.overflow-auto::-webkit-scrollbar {
    height: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
    background: #374151;
}

.overflow-auto::-webkit-scrollbar-thumb {
    background: #6B7280;
    border-radius: 3px;
}

/* Smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

/* Line clamp utility for text truncation */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-105 {
    transform: scale(1.05);
}

.group:hover .group-hover\:shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.6);
}

/* Background image optimization */
.bg-optimized {
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

/* Smooth transitions for all interactive elements */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

/* Custom animation for loading states */
@keyframes shimmer {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: shimmer 2s ease-in-out infinite;
}

/* Responsive text sizing */
@media (max-width: 640px) {
    .text-responsive {
        font-size: 0.875rem;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .bg-gray-800 {
        background-color: #1a1a1a;
        border: 1px solid #404040;
    }

    .text-gray-400 {
        color: #b3b3b3;
    }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {

    .transition-all,
    .transition-transform,
    .animate-pulse {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Print styles */
@media print {

    .bg-gray-900,
    .bg-gray-800 {
        background: white !important;
        color: black !important;
    }

    .text-white {
        color: black !important;
    }
}
</style>