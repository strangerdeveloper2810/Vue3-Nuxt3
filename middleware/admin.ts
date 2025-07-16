// 👨‍💼 Admin Middleware - Chỉ admin mới được truy cập
export default defineNuxtRouteMiddleware(async (to) => {
  // 🔗 Check if running on client side
  if (import.meta.client) {
    // Get token from cookie
    const token = useCookie("token");

    if (!token.value) {
      console.warn("🚫 Admin middleware: No token, redirecting to login");
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }

    try {
      // Verify token and get user info
      const { getUserInfo } = useApi();
      const user = await getUserInfo();

      // Check if user has admin role (assuming maLoaiNguoiDung for admin)
      if (user.maLoaiNguoiDung !== "QuanTri") {
        console.error(
          "❌ Admin middleware: User is not admin",
          user.maLoaiNguoiDung
        );

        // Redirect to unauthorized page or home
        throw createError({
          statusCode: 403,
          statusMessage: "Bạn không có quyền truy cập trang này",
        });
      }

      console.log("✅ Admin middleware: Admin access granted");
    } catch (error: unknown) {
      console.error("❌ Admin middleware error:", error);

      // Type guard to check if error has statusCode
      const hasStatusCode = (err: unknown): err is { statusCode: number } => {
        return typeof err === "object" && err !== null && "statusCode" in err;
      };

      // If error has statusCode 403, it's our custom authorization error
      if (hasStatusCode(error) && error.statusCode === 403) {
        throw error;
      }

      // Otherwise it's authentication error, clear token and redirect
      token.value = null;
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  }
});
