<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                🎯 Fetch Decision Guide
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
                Khi nào dùng useFetch, $fetch, hay fetch thông thường?
            </p>
        </div>

        <!-- Priority Matrix -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6 text-center">🏆 Priority Matrix</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <!-- 1st Priority: useFetch -->
                <UCard class="p-6 border-2 border-green-500">
                    <template #header>
                        <div class="text-center">
                            <div class="text-4xl mb-2">🥇</div>
                            <h3 class="text-xl font-semibold text-green-700 dark:text-green-400">
                                1st Priority: useFetch
                            </h3>
                        </div>
                    </template>

                    <div class="space-y-4">
                        <div class="text-center">
                            <UBadge color="primary" size="lg">Default Choice</UBadge>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="font-semibold text-green-600">✅ Tự động có:</div>
                            <ul class="list-disc list-inside space-y-1 ml-4">
                                <li>SSR + Hydration</li>
                                <li>Caching thông minh</li>
                                <li>Reactive states</li>
                                <li>Error handling</li>
                                <li>Loading indicators</li>
                            </ul>
                        </div>

                        <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                            <div class="text-xs font-semibold">Use for 90% cases:</div>
                            <div class="text-xs">Page data, component data, listing</div>
                        </div>
                    </div>
                </UCard>

                <!-- 2nd Priority: $fetch -->
                <UCard class="p-6 border-2 border-orange-500">
                    <template #header>
                        <div class="text-center">
                            <div class="text-4xl mb-2">🥈</div>
                            <h3 class="text-xl font-semibold text-orange-700 dark:text-orange-400">
                                2nd Priority: $fetch
                            </h3>
                        </div>
                    </template>

                    <div class="space-y-4">
                        <div class="text-center">
                            <UBadge color="warning" size="lg">Actions Only</UBadge>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="font-semibold text-orange-600">🎯 Dùng khi:</div>
                            <ul class="list-disc list-inside space-y-1 ml-4">
                                <li>Form submissions</li>
                                <li>One-time actions</li>
                                <li>Event handlers</li>
                                <li>Manual API calls</li>
                                <li>Conditional fetching</li>
                            </ul>
                        </div>

                        <div class="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                            <div class="text-xs font-semibold">Use for 8% cases:</div>
                            <div class="text-xs">POST/PUT/DELETE, user actions</div>
                        </div>
                    </div>
                </UCard>

                <!-- 3rd Priority: Native fetch -->
                <UCard class="p-6 border-2 border-red-500">
                    <template #header>
                        <div class="text-center">
                            <div class="text-4xl mb-2">🥉</div>
                            <h3 class="text-xl font-semibold text-red-700 dark:text-red-400">
                                3rd Priority: Native fetch
                            </h3>
                        </div>
                    </template>

                    <div class="space-y-4">
                        <div class="text-center">
                            <UBadge color="error" size="lg">Rare Cases</UBadge>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="font-semibold text-red-600">⚠️ Chỉ khi:</div>
                            <ul class="list-disc list-inside space-y-1 ml-4">
                                <li>External APIs</li>
                                <li>Complex custom logic</li>
                                <li>Non-Nuxt environments</li>
                                <li>Special requirements</li>
                            </ul>
                        </div>

                        <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                            <div class="text-xs font-semibold">Use for 2% cases:</div>
                            <div class="text-xs">Edge cases, external APIs</div>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Code Examples -->
        <div class="space-y-8">

            <!-- useFetch Examples -->
            <UCard class="p-6">
                <template #header>
                    <h3 class="text-xl font-semibold text-green-700 dark:text-green-400">
                        🥇 useFetch Examples (90% cases)
                    </h3>
                </template>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold mb-3">📄 Page/Component Data</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ✅ Perfect for displaying data
                            const { data: movies } = await useFetch('/api/movies')
                            const { data: user } = await useFetch('/api/user/profile')
                            const { data: categories } = await useFetch('/api/categories')</code></pre>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3">🔄 Reactive Parameters</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ✅ Auto re-fetch when movieId changes
                            const movieId = ref(1)
                            const { data: movie } = await useFetch(
                            () => `/api/movies/${movieId.value}`
                            )</code></pre>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3">💾 With Caching</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ✅ Cache for performance
                            const { data: config } = await useFetch('/api/config', {
                            key: 'app-config',
                            server: true
                            })</code></pre>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3">⚡ With Transform</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ✅ Transform data automatically
                            const { data: movieNames } = await useFetch('/api/movies', {
                            transform: (data) => data.content.map(m => m.tenPhim)
                            })</code></pre>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- $fetch Examples -->
            <UCard class="p-6">
                <template #header>
                    <h3 class="text-xl font-semibold text-orange-700 dark:text-orange-400">
                        🥈 $fetch Examples (8% cases)
                    </h3>
                </template>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold mb-3">📝 Form Submissions</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ✅ Perfect for POST actions
                            const submitForm = async () => {
                            await $fetch('/api/contact', {
                            method: 'POST',
                            body: formData
                            })
                            useAppToast().success('Sent!')
                            }</code></pre>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3">🗑️ Delete Actions</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ✅ One-time DELETE actions
                            const deleteMovie = async (id) => {
                            await $fetch(`/api/movies/${id}`, {
                            method: 'DELETE'
                            })
                            // Then refresh list
                            await refreshMovies()
                            }</code></pre>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3">🎯 Event Handlers</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ✅ User interactions
                            const handleLike = async (movieId) => {
                            const result = await $fetch('/api/movies/like', {
                            method: 'POST',
                            body: { movieId }
                            })
                            likeCount.value = result.likes
                            }</code></pre>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3">🔍 Conditional Fetching</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ✅ Only fetch when needed
                            const loadMore = async () => {
                            if (hasMore.value) {
                            const newData = await $fetch('/api/movies/more')
                            movies.value.push(...newData)
                            }
                            }</code></pre>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Native fetch Examples -->
            <UCard class="p-6">
                <template #header>
                    <h3 class="text-xl font-semibold text-red-700 dark:text-red-400">
                        🥉 Native fetch Examples (2% cases)
                    </h3>
                </template>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold mb-3">🌍 External APIs</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ⚠️ Only for external APIs
                            const getWeather = async () => {
                            const response = await fetch('https://api.weather.com/v1/current')
                            return response.json()
                            }</code></pre>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-3">🔧 Custom Logic</h4>
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                            <pre class="text-sm overflow-x-auto"><code>// ⚠️ Complex streaming or custom headers
                            const uploadFile = async (file) => {
                            const response = await fetch('/api/upload', {
                            method: 'POST',
                            body: file,
                            headers: { 'Content-Type': 'application/octet-stream' }
                            })
                            }</code></pre>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Anti-patterns -->
        <div class="mt-12">
            <h2 class="text-2xl font-bold mb-6 text-center text-red-600">❌ Anti-patterns (Đừng làm như này!)</h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UCard class="p-6 border-2 border-red-500">
                    <template #header>
                        <h3 class="text-lg font-semibold text-red-600">❌ Sai: fetch trong useEffect</h3>
                    </template>
                    <div class="space-y-4">
                        <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded">
                            <pre class="text-sm text-red-700"><code>// ❌ Mất SSR, phức tạp, không cache
                            useEffect(() => {
                            fetch('/api/movies')
                            .then(res => res.json())
                            .then(setMovies)
                            }, [])</code></pre>
                        </div>
                        <div class="text-sm text-red-600">
                            <strong>Vấn đề:</strong> Không SSR, mất SEO, loading states thủ công, không cache
                        </div>
                    </div>
                </UCard>

                <UCard class="p-6 border-2 border-green-500">
                    <template #header>
                        <h3 class="text-lg font-semibold text-green-600">✅ Đúng: useFetch</h3>
                    </template>
                    <div class="space-y-4">
                        <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded">
                            <pre class="text-sm text-green-700"><code>// ✅ Auto SSR, cache, reactive, simple
                            const { data: movies, pending, error } =
                            await useFetch('/api/movies')</code></pre>
                        </div>
                        <div class="text-sm text-green-600">
                            <strong>Benefit:</strong> Tự động SSR + cache + loading states + error handling
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Quick Reference -->
        <div class="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 class="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
                🚀 Quick Reference
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <strong class="text-green-600">📄 Displaying data?</strong>
                    <div>→ useFetch</div>
                </div>
                <div>
                    <strong class="text-orange-600">📝 Form submission?</strong>
                    <div>→ $fetch</div>
                </div>
                <div>
                    <strong class="text-red-600">🌍 External API?</strong>
                    <div>→ native fetch</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 🧭 Page meta
useHead({
    title: 'Fetch Decision Guide',
    meta: [
        { name: 'description', content: 'Comprehensive guide for choosing between useFetch, $fetch, and native fetch in Nuxt 3' }
    ]
})
</script>