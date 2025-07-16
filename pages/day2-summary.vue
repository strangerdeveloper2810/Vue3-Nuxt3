<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                📚 Day 2: SSR & Nuxt Features Summary
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300">
                Tổng hợp những khái niệm quan trọng về SSR và cách Nuxt 3 hoạt động
            </p>
        </div>

        <!-- React vs Nuxt Comparison -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6 text-center">⚔️ React/Next.js vs Vue/Nuxt 3</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- React/Next.js -->
                <UCard class="p-6 border-l-4 border-blue-500">
                    <template #header>
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                <span class="text-white font-bold">R</span>
                            </div>
                            <h3 class="text-xl font-semibold">React/Next.js Approach</h3>
                        </div>
                    </template>

                    <div class="space-y-4 text-sm">
                        <div>
                            <h4 class="font-semibold mb-2">🔄 Data Fetching Pattern:</h4>
                            <pre class="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto"><code>// Next.js 13+ App Router
                export default async function Page() {
                const data = await fetch('/api/movies')
                return &lt;MovieList movies={data} /&gt;
                }

                // Or with useEffect (CSR)
                useEffect(() => {
                fetch('/api/movies').then(setMovies)
                }, [])</code></pre>
                        </div>

                        <div>
                            <h4 class="font-semibold mb-2">🏗️ Mental Model:</h4>
                            <ul class="space-y-1">
                                <li>• Separate server và client code</li>
                                <li>• getServerSideProps() → props → component</li>
                                <li>• useEffect cho client-side data</li>
                                <li>• Manual state management</li>
                            </ul>
                        </div>
                    </div>
                </UCard>

                <!-- Vue/Nuxt 3 -->
                <UCard class="p-6 border-l-4 border-green-500">
                    <template #header>
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                <span class="text-white font-bold">V</span>
                            </div>
                            <h3 class="text-xl font-semibold">Vue/Nuxt 3 Approach</h3>
                        </div>
                    </template>

                    <div class="space-y-4 text-sm">
                        <div>
                            <h4 class="font-semibold mb-2">🔄 Data Fetching Pattern:</h4>
                            <pre class="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto"><code>// Nuxt 3 - All in
                    component
                    &lt;script setup&gt;
                    const { data: movies } = await useFetch('/api/movies')
                    &lt;/script&gt;

                    // Automatic SSR + Hydration + Caching!</code></pre>
                        </div>

                        <div>
                            <h4 class="font-semibold mb-2">🏗️ Mental Model:</h4>
                            <ul class="space-y-1">
                                <li>• Unified server/client code</li>
                                <li>• useFetch tự động handle SSR</li>
                                <li>• Built-in reactivity và caching</li>
                                <li>• Seamless hydration</li>
                            </ul>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Core Concepts -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6 text-center">🧠 Core SSR Concepts</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <!-- SSR -->
                <UCard class="p-6 text-center">
                    <div class="text-4xl mb-4">🖥️</div>
                    <h3 class="text-lg font-semibold mb-3">Server-Side Rendering</h3>
                    <div class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <p>HTML được generate trên server với data đầy đủ</p>
                        <p><strong>Benefit:</strong> SEO tốt, initial load nhanh</p>
                        <p><strong>Nuxt:</strong> useFetch mặc định là SSR</p>
                    </div>
                </UCard>

                <!-- Hydration -->
                <UCard class="p-6 text-center">
                    <div class="text-4xl mb-4">💧</div>
                    <h3 class="text-lg font-semibold mb-3">Hydration</h3>
                    <div class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <p>Vue app "attach" vào HTML có sẵn từ server</p>
                        <p><strong>Benefit:</strong> Không cần re-fetch data</p>
                        <p><strong>Nuxt:</strong> Tự động reuse server data</p>
                    </div>
                </UCard>

                <!-- Universal -->
                <UCard class="p-6 text-center">
                    <div class="text-4xl mb-4">🌍</div>
                    <h3 class="text-lg font-semibold mb-3">Universal Rendering</h3>
                    <div class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                        <p>Code chạy được cả server và client</p>
                        <p><strong>Benefit:</strong> Best of both worlds</p>
                        <p><strong>Nuxt:</strong> useFetch + refresh() = SPA experience</p>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- useFetch Deep Dive -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6 text-center">🎣 useFetch Mastery</h2>

            <UCard class="p-6 mb-6">
                <template #header>
                    <h3 class="text-xl font-semibold">📋 useFetch Options & Patterns</h3>
                </template>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Basic Patterns -->
                    <div>
                        <h4 class="font-semibold mb-4 text-blue-700 dark:text-blue-300">🎯 Basic Patterns</h4>
                        <div class="space-y-4">
                            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Simple fetch</div>
                                <code class="text-sm">const {data} = await useFetch('/api/movies')</code>
                            </div>
                            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">With key (caching)</div>
                                <code
                                    class="text-sm">const {data} = await useFetch('/api/movies', {key: 'movies'})</code>
                            </div>
                            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Client-only (lazy)</div>
                                <code class="text-sm">const {data} = await useFetch('/api/user', {lazy: true})</code>
                            </div>
                        </div>
                    </div>

                    <!-- Advanced Patterns -->
                    <div>
                        <h4 class="font-semibold mb-4 text-purple-700 dark:text-purple-300">⚡ Advanced Patterns</h4>
                        <div class="space-y-4">
                            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">With transform</div>
                                <code class="text-sm">transform: (data) => data.content</code>
                            </div>
                            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">With default value</div>
                                <code class="text-sm">default: () => []</code>
                            </div>
                            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Reactive params</div>
                                <code class="text-sm">useFetch(`/api/movies/${movieId}`)</code>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- useFetch vs $fetch Table -->
            <UCard class="p-6">
                <template #header>
                    <h3 class="text-xl font-semibold">⚔️ useFetch vs $fetch Decision Matrix</h3>
                </template>

                <div class="overflow-x-auto">
                    <table class="min-w-full text-sm">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th class="px-4 py-2 text-left">Feature</th>
                                <th class="px-4 py-2 text-left">useFetch</th>
                                <th class="px-4 py-2 text-left">$fetch</th>
                                <th class="px-4 py-2 text-left">Use Case</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr>
                                <td class="px-4 py-2 font-medium">SSR Support</td>
                                <td class="px-4 py-2 text-green-600">✅ Automatic</td>
                                <td class="px-4 py-2 text-yellow-600">⚠️ Manual</td>
                                <td class="px-4 py-2">Page/component data</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 font-medium">Reactivity</td>
                                <td class="px-4 py-2 text-green-600">✅ Reactive</td>
                                <td class="px-4 py-2 text-red-600">❌ No</td>
                                <td class="px-4 py-2">Display data</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 font-medium">Caching</td>
                                <td class="px-4 py-2 text-green-600">✅ Built-in</td>
                                <td class="px-4 py-2 text-red-600">❌ Manual</td>
                                <td class="px-4 py-2">Frequently accessed data</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 font-medium">Loading States</td>
                                <td class="px-4 py-2 text-green-600">✅ pending, error</td>
                                <td class="px-4 py-2 text-red-600">❌ Manual</td>
                                <td class="px-4 py-2">UI with loading indicators</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 font-medium">Form Submission</td>
                                <td class="px-4 py-2 text-red-600">❌ Overkill</td>
                                <td class="px-4 py-2 text-green-600">✅ Perfect</td>
                                <td class="px-4 py-2">POST/PUT/DELETE actions</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 font-medium">One-time calls</td>
                                <td class="px-4 py-2 text-red-600">❌ Unnecessary</td>
                                <td class="px-4 py-2 text-green-600">✅ Ideal</td>
                                <td class="px-4 py-2">Event handlers, triggers</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </UCard>
        </div>

        <!-- Performance Benefits -->
        <div class="mb-12">
            <h2 class="text-2xl font-bold mb-6 text-center">🚀 Performance Benefits</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <!-- SEO Benefits -->
                <UCard class="p-6">
                    <template #header>
                        <h3 class="text-lg font-semibold flex items-center gap-2">
                            🔍 SEO Benefits
                        </h3>
                    </template>
                    <div class="space-y-3 text-sm">
                        <div class="flex items-start gap-2">
                            <span class="text-green-500">✅</span>
                            <span><strong>Search engines</strong> thấy nội dung đầy đủ</span>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-green-500">✅</span>
                            <span><strong>Meta tags</strong> được render với data</span>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-green-500">✅</span>
                            <span><strong>Social sharing</strong> hiển thị preview chính xác</span>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-green-500">✅</span>
                            <span><strong>Core Web Vitals</strong> được cải thiện</span>
                        </div>
                    </div>
                </UCard>

                <!-- UX Benefits -->
                <UCard class="p-6">
                    <template #header>
                        <h3 class="text-lg font-semibold flex items-center gap-2">
                            ⚡ UX Benefits
                        </h3>
                    </template>
                    <div class="space-y-3 text-sm">
                        <div class="flex items-start gap-2">
                            <span class="text-blue-500">🚀</span>
                            <span><strong>First Paint</strong> nhanh hơn (có nội dung ngay)</span>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-blue-500">⚡</span>
                            <span><strong>No loading spinners</strong> cho initial data</span>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-blue-500">🔄</span>
                            <span><strong>Smooth transitions</strong> sau hydration</span>
                        </div>
                        <div class="flex items-start gap-2">
                            <span class="text-blue-500">💾</span>
                            <span><strong>Intelligent caching</strong> tránh re-fetch không cần thiết</span>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        <!-- Next Steps -->
        <div class="text-center">
            <h2 class="text-2xl font-bold mb-6">🎯 Next: Day 3 - Advanced Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <UCard class="p-4">
                    <div class="text-3xl mb-2">🛡️</div>
                    <h3 class="font-semibold">Middleware</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Route protection & auth</p>
                </UCard>
                <UCard class="p-4">
                    <div class="text-3xl mb-2">🗃️</div>
                    <h3 class="font-semibold">Pinia Store</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Global state management</p>
                </UCard>
                <UCard class="p-4">
                    <div class="text-3xl mb-2">🎨</div>
                    <h3 class="font-semibold">Layouts & Plugins</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Advanced Nuxt features</p>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 🧭 Page meta
useHead({
    title: 'Day 2 Summary - SSR & Nuxt Features',
    meta: [
        { name: 'description', content: 'Tổng hợp kiến thức Day 2: SSR, useFetch, và các tính năng Nuxt 3' }
    ]
})
</script>