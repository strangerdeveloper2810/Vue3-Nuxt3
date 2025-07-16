<template>
    <div
        class="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <!-- Movie Poster -->
        <div class="relative overflow-hidden">
            <img :src="movie.hinhAnh" :alt="movie.tenPhim"
                class="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                @error="handleImageError" />

            <!-- Overlay with Play Button -->
            <div
                class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <UButton :to="`/movies/${movie.maPhim}`" color="error" size="xl"
                    class="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <UIcon name="i-heroicons-play" class="w-6 h-6" />
                </UButton>
            </div>

            <!-- Status Badges -->
            <div class="absolute top-2 left-2 flex flex-col gap-1">
                <span v-if="movie.dangChieu" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Đang chiếu
                </span>
                <span v-if="movie.sapChieu" class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Sắp chiếu
                </span>
                <span v-if="movie.hot" class="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    🔥 Hot
                </span>
            </div>

            <!-- Rating -->
            <div class="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1">
                <div class="flex items-center gap-1">
                    <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
                    <span class="text-white text-sm font-medium">{{ movie.danhGia }}</span>
                </div>
            </div>
        </div>

        <!-- Movie Info -->
        <div class="p-4">
            <!-- Title -->
            <h3
                class="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-200">
                {{ movie.tenPhim }}
            </h3>

            <!-- Release Date -->
            <div class="flex items-center text-gray-400 text-sm mb-3">
                <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 mr-1" />
                <span>{{ formatDate(movie.ngayKhoiChieu) }}</span>
            </div>

            <!-- Description -->
            <p class="text-gray-400 text-sm line-clamp-3 mb-4">
                {{ movie.moTa }}
            </p>

            <!-- Action Buttons -->
            <div class="flex gap-2">
                <UButton :to="`/movies/${movie.maPhim}`" color="error" size="sm" class="flex-1">
                    <UIcon name="i-heroicons-ticket" class="w-4 h-4 mr-1" />
                    Đặt vé
                </UButton>

                <UButton @click="toggleWishlist" :color="isInWishlist ? 'error' : 'neutral'" variant="outline" size="sm"
                    class="px-3">
                    <UIcon :name="isInWishlist ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'" class="w-4 h-4" />
                </UButton>

                <UButton @click="shareMovie" color="neutral" variant="outline" size="sm" class="px-3">
                    <UIcon name="i-heroicons-share" class="w-4 h-4" />
                </UButton>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="absolute inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center">
            <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-red-500" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/types'

// 🏷️ Props definition (giống interface Props trong React)
interface Props {
    movie: Movie
}

const props = defineProps<Props>()


// 📊 Local state
const loading = ref(false)
const isInWishlist = ref(false)
const imageError = ref(false)

// 🎯 Methods
const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    } catch {
        return 'N/A'
    }
}

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    // Use a data URI placeholder instead of external service
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xNTAgMjI1QzE2NC4zNTkgMjI1IDE3NiAyMTMuMzU5IDE3NiAxOTlDMTc2IDE4NC42NDEgMTY0LjM1OSAxNzMgMTUwIDE3M0MxMzUuNjQxIDE3MyAxMjQgMTg0LjY0MSAxMjQgMTk5QzEyNCAyMTMuMzU5IDEzNS42NDEgMjI1IDE1MCAyMjVaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNTAgMjU2QzE4MS4wNjEgMjU2IDIwNiAyODAuOTM5IDIwNiAzMTJWMzEzSDk0VjMxMkM5NCAyODAuOTM5IDExOC45MzkgMjU2IDE1MCAyNTZaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'
    imageError.value = true
}

const toggleWishlist = () => {
    // TODO: Implement wishlist functionality with Pinia store
    isInWishlist.value = !isInWishlist.value

    // Show toast notification
    const toast = useAppToast()
    const message = isInWishlist.value ? 'Đã thêm vào yêu thích' : 'Đã xóa khỏi yêu thích'
    toast.success(message, props.movie.tenPhim)
}

const shareMovie = async () => {
    const shareData = {
        title: props.movie.tenPhim,
        text: `Xem phim "${props.movie.tenPhim}" tại CyberFlix`,
        url: `${window.location.origin}/movies/${props.movie.maPhim}`
    }

    try {
        if (navigator.share) {
            await navigator.share(shareData)
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(shareData.url)
            const toast = useToast()
            toast.add({
                title: 'Đã sao chép link',
                description: 'Link phim đã được sao chép vào clipboard',
                icon: 'i-heroicons-clipboard-document'
            })
        }
    } catch (error) {
        console.error('Error sharing:', error)
    }
}

// 🔄 Lifecycle
onMounted(() => {
    // Check if movie is in wishlist
    // TODO: Integrate with Pinia store
    const wishlist = useLocalStorage<number[]>('wishlist', [])
    isInWishlist.value = wishlist.value.includes(props.movie.maPhim)
})

// 👀 Watch for changes (giống useEffect với dependencies)
watch(() => isInWishlist.value, (newValue) => {
    // Update localStorage
    const wishlist = useLocalStorage<number[]>('wishlist', [])
    if (newValue) {
        if (!wishlist.value.includes(props.movie.maPhim)) {
            wishlist.value.push(props.movie.maPhim)
        }
    } else {
        const index = wishlist.value.indexOf(props.movie.maPhim)
        if (index > -1) {
            wishlist.value.splice(index, 1)
        }
    }
})
</script>

<style scoped>
/* Line clamp utilities */
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

/* Custom hover effects */
.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

.group:hover .group-hover\:scale-100 {
    transform: scale(1);
}

/* Smooth transitions */
* {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>