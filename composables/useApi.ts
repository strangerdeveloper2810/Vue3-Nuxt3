import type {
  ApiResponse,
  Movie,
  MovieDetail,
  User,
  LoginRequest,
  RegisterRequest,
  Seat,
  TicketBooking,
} from "~/types";

export const useApi = () => {
  // API Configuration (moved inside composable)
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.apiBase;
  const MA_NHOM = config.public.maNhom;

  // Headers configuration
  const getHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjMwLzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNzY0NDgwMDAwMCIsIm5iZiI6MTY5ODUxNDgwMCwiZXhwIjoxNzI3NzkyNDAwfQ.0LWH1_nub6tXqKyKBCG-8b1pP32xFNAcqjGcpBJHhVQ", // Replace with your token
    };

    // Add auth token if user is logged in
    const token = useCookie("token");
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    }

    return headers;
  };

  // 🎬 MOVIE API METHODS
  const getMovies = async (): Promise<Movie[]> => {
    try {
      const response = await $fetch<ApiResponse<Movie[]>>(
        `${API_BASE_URL}/QuanLyPhim/LayDanhSachPhim`,
        {
          method: "GET",
          headers: getHeaders(),
          query: { maNhom: MA_NHOM },
        }
      );
      return response.content;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  };

  const getMovieDetail = async (maPhim: number): Promise<MovieDetail> => {
    try {
      const response = await $fetch<ApiResponse<MovieDetail>>(
        `${API_BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim`,
        {
          method: "GET",
          headers: getHeaders(),
          query: { maPhim },
        }
      );
      return response.content;
    } catch (error) {
      console.error("Error fetching movie detail:", error);
      throw error;
    }
  };

  // 🏪 CINEMA API METHODS
  const getCinemaComplexes = async () => {
    try {
      const response = await $fetch<ApiResponse<unknown[]>>(
        `${API_BASE_URL}/QuanLyRap/LayThongTinHeThongRap`,
        {
          method: "GET",
          headers: getHeaders(),
        }
      );
      return response.content;
    } catch (error) {
      console.error("Error fetching cinema complexes:", error);
      throw error;
    }
  };

  const getSeats = async (maLichChieu: number): Promise<Seat[]> => {
    try {
      const response = await $fetch<ApiResponse<{ danhSachGhe: Seat[] }>>(
        `${API_BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe`,
        {
          method: "GET",
          headers: getHeaders(),
          query: { maLichChieu },
        }
      );
      return response.content.danhSachGhe;
    } catch (error) {
      console.error("Error fetching seats:", error);
      throw error;
    }
  };

  // 👤 USER API METHODS
  const login = async (credentials: LoginRequest): Promise<User> => {
    try {
      const response = await $fetch<ApiResponse<User>>(
        `${API_BASE_URL}/QuanLyNguoiDung/DangNhap`,
        {
          method: "POST",
          headers: getHeaders(),
          body: credentials,
        }
      );

      // Store token in cookie
      const token = useCookie("token", {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: true,
        sameSite: "strict",
      });
      token.value = response.content.accessToken;

      return response.content;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData: RegisterRequest): Promise<User> => {
    try {
      const requestBody = {
        ...userData,
        maNhom: MA_NHOM,
      };
      const response = await $fetch<ApiResponse<User>>(
        `${API_BASE_URL}/QuanLyNguoiDung/DangKy`,
        {
          method: "POST",
          headers: getHeaders(),
          body: requestBody,
        }
      );
      return response.content;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const getUserInfo = async (): Promise<User> => {
    try {
      const response = await $fetch<ApiResponse<User>>(
        `${API_BASE_URL}/QuanLyNguoiDung/ThongTinTaiKhoan`,
        {
          method: "POST",
          headers: getHeaders(),
        }
      );
      return response.content;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  // 🎫 BOOKING API METHODS
  const bookTickets = async (bookingData: TicketBooking): Promise<unknown> => {
    try {
      const response = await $fetch<ApiResponse<unknown>>(
        `${API_BASE_URL}/QuanLyDatVe/DatVe`,
        {
          method: "POST",
          headers: getHeaders(),
          body: bookingData,
        }
      );
      return response.content;
    } catch (error) {
      console.error("Booking error:", error);
      throw error;
    }
  };

  return {
    // Movie methods
    getMovies,
    getMovieDetail,

    // Cinema methods
    getCinemaComplexes,
    getSeats,

    // User methods
    login,
    register,
    getUserInfo,

    // Booking methods
    bookTickets,
  };
};
