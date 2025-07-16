<template>
    <div>
        <!-- Hero Section -->
        <section class="relative h-screen flex items-center justify-center overflow-hidden">
            <!-- Background Video/Image -->
            <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
            <div class="absolute inset-0 bg-cover bg-center"
                style="background-image: url('https://images.unsplash.com/photo-1489599797906-352da9c9d393?ixlib=rb-4.0.3')">
            </div>

            <!-- Hero Content -->
            <div class="relative z-20 text-center px-4 max-w-4xl">
                <h1 class="text-5xl md:text-7xl font-bold mb-6">
                    <span class="text-white">Cyber</span>
                    <span class="text-red-500">Flix</span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Trải nghiệm điện ảnh đỉnh cao với hệ thống đặt vé hiện đại nhất Việt Nam
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <UButton to="/movies" color="error" size="xl" class="px-8 py-4 text-lg font-semibold">
                        <UIcon name="i-heroicons-play" class="w-5 h-5 mr-2" />
                        Xem phim ngay
                    </UButton>
                    <UButton to="/cinemas" color="neutral" variant="outline" size="xl"
                        class="px-8 py-4 text-lg font-semibold">
                        <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2" />
                        Tìm rạp gần bạn
                    </UButton>
                </div>
            </div>
        </section>

        <!-- Movies Section -->
        <section class="py-16 bg-gray-900">
            <div class="container mx-auto px-4">
                <!-- Section Header -->
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-white mb-4">Phim Đang Chiếu</h2>
                    <p class="text-gray-400 text-lg">Khám phá những bộ phim hot nhất hiện tại</p>
                </div>

                <!-- 🎨 Enhanced Search & Filters Section -->
                <div class="mb-12">
                    <!-- Modern Search Container -->
                    <div
                        class="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/60 rounded-2xl p-8 shadow-2xl">

                        <!-- Main Content Row -->
                        <div class="flex flex-col xl:flex-row gap-8 items-center">

                            <!-- 🔍 Enhanced Search Section -->
                            <div class="flex-1 w-full xl:max-w-2xl">
                                <div class="relative group">
                                    <!-- Glow Effect -->
                                    <div
                                        class="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    </div>

                                    <!-- Search Input -->
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <UIcon name="i-heroicons-magnifying-glass"
                                                class="w-6 h-6 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300" />
                                        </div>
                                        <input v-model="searchTerm" type="text"
                                            placeholder="🎬 Tìm kiếm phim theo tên, diễn viên, thể loại..."
                                            class="block w-full pl-12 pr-12 py-4 text-lg bg-gray-900/70 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-4 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300">
                                        <!-- Clear Button -->
                                        <button v-if="searchTerm" @click="searchTerm = ''"
                                            class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-red-500 transition-colors">
                                            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- 🎛️ Filter & Actions Section -->
                            <div class="flex flex-col sm:flex-row gap-6 items-center w-full xl:w-auto">

                                <!-- Filter Tabs -->
                                <div class="flex items-center gap-4">
                                    <span class="text-sm font-medium text-gray-300 hidden sm:block">Bộ lọc:</span>
                                    <div class="flex gap-2 p-2 bg-gray-900/70 rounded-xl border border-gray-600">
                                        <button v-for="tab in movieTabs" :key="tab.value" @click="activeTab = tab.value"
                                            class="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
                                            :class="activeTab === tab.value
                                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 scale-105'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'">
                                            {{ tab.label }}
                                        </button>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex items-center gap-4">
                                    <!-- Refresh Button -->
                                    <UButton @click="handleRefresh" :loading="pending" variant="outline" color="neutral"
                                        size="lg"
                                        class="group hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 px-4 py-3">
                                        <UIcon name="i-heroicons-arrow-path"
                                            class="w-5 h-5 group-hover:text-red-500 transition-colors" />
                                    </UButton>

                                    <!-- Movie Count Badge -->
                                    <div
                                        class="hidden lg:flex items-center gap-3 px-4 py-3 bg-gray-900/70 rounded-xl border border-gray-600">
                                        <UIcon name="i-heroicons-film" class="w-5 h-5 text-red-500" />
                                        <span class="text-sm font-bold text-white">
                                            {{ filteredMovies.length }} phim
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 📊 Stats Bar -->
                        <div class="mt-8 pt-6 border-t border-gray-700/60">
                            <div class="flex flex-wrap gap-8 justify-center xl:justify-start">
                                <div class="flex items-center gap-3 group cursor-default">
                                    <div
                                        class="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50">
                                    </div>
                                    <span
                                        class="text-gray-400 group-hover:text-green-400 transition-colors text-sm">Đang
                                        chiếu:</span>
                                    <span class="font-bold text-green-400 text-lg">{{ movieStats.showing }}</span>
                                </div>
                                <div class="flex items-center gap-3 group cursor-default">
                                    <div
                                        class="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50">
                                    </div>
                                    <span class="text-gray-400 group-hover:text-blue-400 transition-colors text-sm">Sắp
                                        chiếu:</span>
                                    <span class="font-bold text-blue-400 text-lg">{{ movieStats.upcoming }}</span>
                                </div>
                                <div class="flex items-center gap-3 group cursor-default">
                                    <div class="w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50">
                                    </div>
                                    <span
                                        class="text-gray-400 group-hover:text-purple-400 transition-colors text-sm">Tổng
                                        cộng:</span>
                                    <span class="font-bold text-purple-400 text-lg">{{ movieStats.total }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="i in 8" :key="i" class="animate-pulse">
                        <div class="bg-gray-800 rounded-lg h-80 mb-4"></div>
                        <div class="bg-gray-800 rounded h-4 mb-2"></div>
                        <div class="bg-gray-800 rounded h-3 w-3/4"></div>
                    </div>
                </div>

                <!-- Error State -->
                <UAlert v-else-if="error" color="error" variant="subtle"
                    :title="error.data?.message || 'Không thể tải danh sách phim'" class="mb-8">
                    <template #description>
                        Vui lòng thử lại sau hoặc liên hệ hỗ trợ nếu lỗi vẫn tiếp tục.
                    </template>
                    <template #actions>
                        <UButton @click="handleRefresh" color="error" variant="outline" size="sm">
                            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1" />
                            Thử lại
                        </UButton>
                    </template>
                </UAlert>

                <!-- Movies Grid -->
                <div v-else-if="displayedMovies.length > 0" class="space-y-8">
                    <!-- Movies Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MovieCard v-for="movie in displayedMovies" :key="movie.maPhim" :movie="movie" />
                    </div>

                    <!-- Show More Button -->
                    <div v-if="hasMoreMovies" class="text-center">
                        <UButton @click="showMore" color="error" variant="outline" size="lg" class="px-8">
                            Xem thêm phim
                            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 ml-2" />
                        </UButton>
                    </div>
                </div>

                <!-- No Results -->
                <div v-else class="text-center py-12">
                    <UIcon name="i-heroicons-film" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 class="text-xl font-semibold text-gray-300 mb-2">Không tìm thấy phim</h3>
                    <p class="text-gray-500 mb-6">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
                    <UButton @click="clearFilters" color="error" variant="outline">
                        Xóa bộ lọc
                    </UButton>
                </div>
            </div>
        </section>

        <!-- Statistics Section -->
        <section class="py-16 bg-gray-800">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div class="text-3xl md:text-4xl font-bold text-red-500 mb-2">{{ movieStats.total }}+</div>
                        <div class="text-gray-400">Bộ phim</div>
                    </div>
                    <div>
                        <div class="text-3xl md:text-4xl font-bold text-red-500 mb-2">{{ movieStats.showing }}+</div>
                        <div class="text-gray-400">Đang chiếu</div>
                    </div>
                    <div>
                        <div class="text-3xl md:text-4xl font-bold text-red-500 mb-2">{{ movieStats.upcoming }}+</div>
                        <div class="text-gray-400">Sắp chiếu</div>
                    </div>
                    <div>
                        <div class="text-3xl md:text-4xl font-bold text-red-500 mb-2">50+</div>
                        <div class="text-gray-400">Rạp chiếu</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { ApiResponse, Movie } from '~/types'

// 🎬 Page meta
useHead({
    title: 'Trang chủ - CyberFlix',
    meta: [
        { name: 'description', content: 'Đặt vé xem phim online dễ dàng tại CyberFlix - Hệ thống rạp chiếu phim hiện đại' }
    ]
})

// 📊 Reactive state
const searchTerm = ref('')
const activeTab = ref('all')
const displayLimit = ref(8)

// 🏷️ Movie filter tabs
const movieTabs = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Đang chiếu', value: 'dangChieu' },
    { label: 'Sắp chiếu', value: 'sapChieu' }
]

// 🌐 API Configuration
const config = useRuntimeConfig()
const API_BASE_URL = config.public.apiBase

// 🎬 Fetch movies with caching và error handling
const { data: moviesData, pending, error, refresh } = await useFetch(`${API_BASE_URL}/QuanLyPhim/LayDanhSachPhim`, {
    key: 'movies-list',
    default: () => ({ content: [] as Movie[] }),
    transform: (data: ApiResponse<Movie[]>) => {
        // Handle both direct array và wrapped response
        if (Array.isArray(data)) {
            return { content: data }
        }
        return data || { content: [] }
    },
    retry: 3,
    retryDelay: 1000
})

// 🧮 Computed properties
const movies = computed(() => moviesData.value?.content || [])

const filteredMovies = computed(() => {
    if (!movies.value) return []

    let filtered = movies.value

    // Filter by search term
    if (searchTerm.value.trim()) {
        const searchLower = searchTerm.value.toLowerCase().trim()
        filtered = filtered.filter(movie =>
            movie.tenPhim?.toLowerCase().includes(searchLower) ||
            movie.moTa?.toLowerCase().includes(searchLower)
        )
    }

    // Filter by tab
    if (activeTab.value === 'dangChieu') {
        filtered = filtered.filter(movie => movie.dangChieu)
    } else if (activeTab.value === 'sapChieu') {
        filtered = filtered.filter(movie => movie.sapChieu)
    }

    return filtered
})

const displayedMovies = computed(() => {
    return filteredMovies.value.slice(0, displayLimit.value)
})

const hasMoreMovies = computed(() => {
    return filteredMovies.value.length > displayLimit.value
})

const movieStats = computed(() => ({
    total: movies.value.length,
    showing: movies.value.filter(m => m.dangChieu).length,
    upcoming: movies.value.filter(m => m.sapChieu).length
}))

// 🔄 Methods
const handleRefresh = async () => {
    try {
        await refresh()
        // Reset display limit
        displayLimit.value = 8
        // Show success notification
        const toast = useAppToast()
        toast.success('Đã cập nhật danh sách phim')
    } catch {
        const toast = useAppToast()
        toast.error('Không thể cập nhật danh sách phim')
    }
}

const showMore = () => {
    displayLimit.value += 8
}

const clearFilters = () => {
    searchTerm.value = ''
    activeTab.value = 'all'
    displayLimit.value = 8
}

// 🔄 Watch for filter changes
watch([searchTerm, activeTab], () => {
    displayLimit.value = 8
})
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
}

/* Stagger animation for movie cards */
.animate-fade-in:nth-child(1) {
    animation-delay: 0.1s;
}

.animate-fade-in:nth-child(2) {
    animation-delay: 0.2s;
}

.animate-fade-in:nth-child(3) {
    animation-delay: 0.3s;
}

.animate-fade-in:nth-child(4) {
    animation-delay: 0.4s;
}

.animate-fade-in:nth-child(5) {
    animation-delay: 0.5s;
}

.animate-fade-in:nth-child(6) {
    animation-delay: 0.6s;
}

.animate-fade-in:nth-child(7) {
    animation-delay: 0.7s;
}

.animate-fade-in:nth-child(8) {
    animation-delay: 0.8s;
}
</style>