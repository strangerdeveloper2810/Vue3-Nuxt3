# 🎯 Concept 4 & 5 - Giải thích Chi tiết

## 📝 **Concept 4: Props vs Ref - Tại sao Props không dùng .value**

### **1. Bản chất khác nhau:**

```typescript
// PROPS - Được Vue proxy tự động
interface Props {
  movie: Movie;
}
const props = defineProps<Props>();

// ✅ ĐÚNG: Props đã được Vue "unwrap" sẵn
console.log(props.movie.tenPhim);
console.log(props.movie.danhGia);

// ❌ SAI: Không cần .value với props
console.log(props.movie.value); // undefined!
```

```typescript
// REF - Cần .value để truy cập
const loading = ref(false);
const movies = ref<Movie[]>([]);

// ✅ ĐÚNG: Ref cần .value
console.log(loading.value);
movies.value.push(newMovie);

// ❌ SAI: Không có .value sẽ lỗi
console.log(loading); // Ref object, không phải giá trị
```

### **2. Ví dụ thực tế từ MovieCard.vue:**

```vue
<!-- Template: Cả props và ref đều không cần .value -->
<template>
  <!-- Props: trực tiếp dùng -->
  <h3>{{ movie.tenPhim }}</h3>
  <img :src="movie.hinhAnh" :alt="movie.tenPhim" />

  <!-- Ref: cũng không cần .value trong template -->
  <div v-if="loading">Loading...</div>
  <span>{{ isInWishlist ? "Liked" : "Not liked" }}</span>
</template>

<script setup>
// Props: không cần .value
const props = defineProps<{movie: Movie}>()

// Ref: cần .value trong script
const loading = ref(false)
const isInWishlist = ref(false)

// Sử dụng trong methods
const toggleWishlist = () => {
    // Props: không cần .value
    const movieName = props.movie.tenPhim

    // Ref: cần .value
    isInWishlist.value = !isInWishlist.value

    toast.success(message, props.movie.tenPhim) // Props không .value
}
</script>
```

### **3. Tại sao lại thế?**

**Props được Vue xử lý như sau:**

- Vue tự động tạo **Proxy object** cho props
- Đã "unwrapped" sẵn, truy cập trực tiếp được
- **Read-only** (không thể modify)

**Ref cần .value vì:**

- Ref là **wrapper object** `{ value: actualData }`
- Cần `.value` để truy cập data thực
- **Mutable** (có thể thay đổi)

---

## 🚀 **Concept 5: Auto Import trong Nuxt - Cơ chế hoạt động**

### **1. Auto Import là gì?**

Nuxt tự động import các functions/composables mà không cần `import` statement:

```typescript
// ❌ Không cần viết thế này:
import { ref, computed, onMounted, watch } from "vue";
import { useCookie, useRuntimeConfig, useRouter } from "nuxt/app";

// ✅ Nuxt tự động import, chỉ cần dùng:
const loading = ref(false);
const config = useRuntimeConfig();
const router = useRouter();
```

### **2. Các thứ được Auto Import:**

#### **A. Vue 3 Composables:**

```typescript
// pages/index.vue
const loading = ref(true); // Vue ref
const activeTab = ref("all"); // Vue ref
const filteredMovies = computed(() => {
  // Vue computed
  if (activeTab.value === "all") return movies.value.slice(0, 8);
  return [];
});

onMounted(() => {
  // Vue lifecycle
  fetchMovies();
});

watch(
  () => activeTab.value,
  () => {
    // Vue watch
    console.log("Tab changed");
  }
);
```

#### **B. Nuxt Composables:**

```typescript
// composables/useApi.ts
const config = useRuntimeConfig(); // Nuxt config
const token = useCookie("token"); // Nuxt cookie

// layouts/default.vue
const router = useRouter(); // Nuxt router
const route = useRoute(); // Nuxt route
```

#### **C. Your Custom Composables:**

```typescript
// composables/useApi.ts được auto import
const { getMovies } = useApi(); // Tự động import từ ~/composables/

// utils/toast.ts được auto import
const toast = useAppToast(); // Tự động import từ ~/utils/
```

### **3. Cấu hình Auto Import:**

**nuxt.config.ts:**

```typescript
export default defineNuxtConfig({
  // Auto-imports Configuration
  imports: {
    autoImport: true, // Bật auto import
  },
});
```

### **4. Thứ tự Auto Import Priority:**

1. **Vue 3 built-ins** (`ref`, `computed`, `onMounted`...)
2. **Nuxt built-ins** (`useCookie`, `useRouter`...)
3. **~/composables/** folder (tên file = tên function)
4. **~/utils/** folder
5. **~/stores/** folder (Pinia stores)

### **5. Ví dụ thực tế từ codebase:**

```typescript
// pages/index.vue - Không cần import gì!
<script setup>
// ✅ Tất cả đều auto import:
const loading = ref(true)              // Vue
const error = ref<string | null>(null) // Vue
const movies = ref<Movie[]>([])        // Vue

const filteredMovies = computed(() => { // Vue
    if (activeTab.value === 'all') return movies.value.slice(0, 8)
    return []
})

const fetchMovies = async () => {
    const { getMovies } = useApi()      // Custom composable
    movies.value = await getMovies()
}

onMounted(() => {                       // Vue
    fetchMovies()
})
</script>
```

### **6. Debug Auto Import:**

**Xem gì đã được import:**

```bash
# Nuxt sẽ tạo file này:
.nuxt/imports.d.ts
```

**File này chứa:**

```typescript
// Auto-generated
declare global {
  const computed: typeof import("vue")["computed"];
  const ref: typeof import("vue")["ref"];
  const useApi: typeof import("~/composables/useApi")["useApi"];
  // ... many more
}
```

---

## 🎯 **Key Takeaways:**

### **Props (.value):**

- ❌ `props.movie.value`
- ✅ `props.movie.tenPhim`
- **Lý do:** Vue đã proxy sẵn

### **Ref (.value):**

- ❌ `loading` (trong script)
- ✅ `loading.value` (trong script)
- ✅ `loading` (trong template - Vue tự unwrap)

### **Auto Import:**

- ✅ Không cần `import { ref } from 'vue'`
- ✅ Không cần `import { useApi } from '~/composables/useApi'`
- ✅ Just use it! Nuxt handles the rest

Đây là magic của Nuxt - làm code clean và developer experience tốt hơn! 🚀
