// 👤 Guest Middleware - Redirect đã đăng nhập khỏi trang login/register
export default defineNuxtRouteMiddleware(async () => {
  // Get token from cookie (works SSR + client)
  const token = useCookie("token");
  if (token.value) {
    try {
      const { getUserInfo } = useApi();
      await getUserInfo();
      return navigateTo("/");
    } catch {
      token.value = null;
    }
  }
});
