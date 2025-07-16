// 🛡️ Auth Middleware - Bảo vệ routes cần đăng nhập
export default defineNuxtRouteMiddleware(async (to) => {
  // 🔗 Check if running on client side
  if (import.meta.client) {
    // Get token from cookie
    const token = useCookie("token");

    if (!token.value) {
      console.warn("🚫 No token found, redirecting to login");
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }

    try {
      // Verify token validity by fetching user info
      const { getUserInfo } = useApi();
      await getUserInfo();

      console.log("✅ Auth middleware: User authenticated");
    } catch (error) {
      console.error("❌ Auth middleware: Token invalid", error);

      // Clear invalid token
      token.value = null;

      // Redirect to login
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  }
});
