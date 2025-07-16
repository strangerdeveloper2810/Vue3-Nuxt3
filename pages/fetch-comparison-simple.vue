<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                ⚔️ useFetch vs $fetch Comparison
            </h1>
            <p class="text-gray-600 dark:text-gray-300">
                Hiểu rõ sự khác biệt giữa useFetch (composable) và $fetch (utility)
            </p>
        </div>

        <!-- Concept Overview -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <UCard class="p-6 border-l-4 border-blue-500">
                <template #header>
                    <h2 class="text-xl font-semibold text-blue-700 dark:text-blue-300">
                        🎣 useFetch (Composable)
                    </h2>
                </template>
                <div class="space-y-3 text-sm">
                    <p><strong>🎯 Mục đích:</strong> SSR + Reactivity + Caching</p>
                    <p><strong>🔄 Behavior:</strong> Auto-refresh, reactive, cached</p>
                    <p><strong>🖥️ SSR:</strong> Chạy trên server, data có sẵn trong HTML</p>
                    <p><strong>💾 Caching:</strong> Tự động cache với key</p>
                    <p><strong>⚡ Hydration:</strong> Data được reuse, không gọi API lại</p>
                    <p><strong>📱 Use case:</strong> Page data, component data</p>
                </div>
            </UCard>

            <UCard class="p-6 border-l-4 border-orange-500">
                <template #header>
                    <h2 class="text-xl font-semibold text-orange-700 dark:text-orange-300">
                        🛠️ $fetch (Utility)
                    </h2>
                </template>
                <div class="space-y-3 text-sm">
                    <p><strong>🎯 Mục đích:</strong> Manual API calls</p>
                    <p><strong>🔄 Behavior:</strong> Manual control, no reactivity</p>
                    <p><strong>🖥️ SSR:</strong> Có thể chạy server/client tuỳ context</p>
                    <p><strong>💾 Caching:</strong> Không có cache tự động</p>
                    <p><strong>⚡ Hydration:</strong> Mỗi lần gọi = 1 API request</p>
                    <p><strong>📱 Use case:</strong> Form submit, actions, one-time calls</p>
                </div>
            </UCard>
        </div>

        <!-- Live Examples -->
        <div class="space-y-8">

            <!-- useFetch Example -->
            <UCard class="p-6">
                <template #header>
                    <h3 class="text-xl font-semibold flex items-center gap-2">
                        🎣 useFetch Demo
                        <UBadge color="primary" size="sm">Reactive</UBadge>
                    </h3>
                </template>

                <div class="space-y-4">
                    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <pre class="text-sm text-gray-800 dark:text-gray-200"><code>const { data, pending, error, refresh } =
                        await useFetch('/api/movies/list')</code></pre>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <strong>Status:</strong>
                            <span :class="useFetchPending ? 'text-yellow-600' : 'text-green-600'">
                                {{ useFetchPending ? '⏳ Loading' : '✅ Loaded' }}
                            </span>
                        </div>
                        <div>
                            <strong>Data Count:</strong>
                            <span class="text-blue-600">{{ (useFetchData as any)?.content?.length || 0 }}</span>
                        </div>
                        <div>
                            <strong>Last Update:</strong>
                            <span class="text-purple-600">{{ useFetchLastUpdate }}</span>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <UButton @click="handleRefreshUseFetch" :loading="useFetchPending" size="sm">
                            🔄 Refresh useFetch
                        </UButton>
                    </div>

                    <div v-if="useFetchError" class="text-red-500 text-sm">
                        Error: {{ useFetchError }}
                    </div>
                </div>
            </UCard>

            <!-- $fetch Example -->
            <UCard class="p-6">
                <template #header>
                    <h3 class="text-xl font-semibold flex items-center gap-2">
                        🛠️ $fetch Demo
                        <UBadge color="primary" size="sm">Manual</UBadge>
                    </h3>
                </template>

                <div class="space-y-4">
                    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <pre class="text-sm text-gray-800 dark:text-gray-200"><code>const data = await
                        $fetch('/api/movies/list')</code></pre>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <strong>Status:</strong>
                            <span :class="dollarFetchLoading ? 'text-yellow-600' : 'text-green-600'">
                                {{ dollarFetchLoading ? '⏳ Loading' : '✅ Ready' }}
                            </span>
                        </div>
                        <div>
                            <strong>Data Count:</strong>
                            <span class="text-blue-600">{{ dollarFetchCount }}</span>
                        </div>
                        <div>
                            <strong>Call Count:</strong>
                            <span class="text-red-600">{{ dollarFetchCallCount }}</span>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <UButton @click="callDollarFetch" :loading="dollarFetchLoading" size="sm">
                            📞 Call $fetch
                        </UButton>
                        <UButton @click="clearDollarFetch" size="sm" variant="outline">
                            🗑️ Clear Data
                        </UButton>
                    </div>

                    <div v-if="dollarFetchError" class="text-red-500 text-sm">
                        Error: {{ dollarFetchError }}
                    </div>
                </div>
            </UCard>

            <!-- Code Examples -->
            <UCard class="p-6">
                <template #header>
                    <h3 class="text-xl font-semibold">📝 Code Examples & Best Practices</h3>
                </template>

                <div class="space-y-6">
                    <!-- When to use useFetch -->
                    <div>
                        <h4 class="font-semibold text-green-700 dark:text-green-400 mb-2">
                            ✅ Khi nào dùng useFetch:
                        </h4>
                        <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// 1. Page/component data
                            const { data: movies } = await useFetch('/api/movies')

                            // 2. Reactive data với watch
                            const { data: user } = await useFetch(`/api/users/${userId}`)

                            // 3. Data cần cache
                            const { data: categories } = await useFetch('/api/categories', {
                            key: 'categories'
                            })

                            // 4. Data với transforms
                            const { data: processedData } = await useFetch('/api/raw-data', {
                            transform: (data) => processData(data)
                            })</code></pre>
                        </div>
                    </div>

                    <!-- When to use $fetch -->
                    <div>
                        <h4 class="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                            ✅ Khi nào dùng $fetch:
                        </h4>
                        <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// 1. Form submissions
                            const submitForm = async () => {
                            await $fetch('/api/contact', {
                            method: 'POST',
                            body: formData
                            })
                            }

                            // 2. One-time actions
                            const deleteItem = async (id) => {
                            await $fetch(`/api/items/${id}`, { method: 'DELETE' })
                            }

                            // 3. Event handlers
                            const handleClick = async () => {
                            const result = await $fetch('/api/action')
                            showToast(result.message)
                            }

                            // 4. Conditional fetching
                            if (shouldFetch) {
                            const data = await $fetch('/api/optional-data')
                            }</code></pre>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
// 🧭 Page meta
useHead({
    title: 'useFetch vs $fetch (Simple)',
    meta: [
        { name: 'description', content: 'So sánh useFetch và $fetch trong Nuxt 3 (phiên bản đơn giản)' }
    ]
})

// 📊 Reactive data
const useFetchLastUpdate = ref('')
const dollarFetchLoading = ref(false)
const dollarFetchCount = ref(0)
const dollarFetchCallCount = ref(0)
const dollarFetchError = ref('')

// 🎣 useFetch Example (simple)
const {
    data: useFetchData,
    pending: useFetchPending,
    error: useFetchError,
    refresh: useFetchRefresh
} = await useFetch('/api/movies/list', {
    key: 'simple-fetch-comparison',
    onResponse: () => {
        useFetchLastUpdate.value = new Date().toLocaleTimeString()
    }
})

// 🔄 Wrapper functions for event handlers
const handleRefreshUseFetch = async () => {
    await useFetchRefresh()
    useFetchLastUpdate.value = new Date().toLocaleTimeString()
}

// 🛠️ $fetch Example (simple)
const callDollarFetch = async () => {
    dollarFetchLoading.value = true
    dollarFetchError.value = ''

    try {
        const data = await $fetch('/api/movies/list') as any
        dollarFetchCount.value = data?.content?.length || 0
        dollarFetchCallCount.value++
    } catch (error) {
        dollarFetchError.value = (error as Error).message || 'Unknown error'
    } finally {
        dollarFetchLoading.value = false
    }
}

const clearDollarFetch = () => {
    dollarFetchCount.value = 0
    dollarFetchError.value = ''
}
</script>