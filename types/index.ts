// API Response Types
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  content: T;
  dateTime: string;
}

// Movie Types
export interface Movie {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot?: boolean;
  dangChieu?: boolean;
  sapChieu?: boolean;
}

export interface MovieDetail extends Movie {
  cumRapChieu: CinemaComplex[];
}

// Cinema Types
export interface CinemaComplex {
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
  lichChieuPhim: Showtime[];
}

export interface Showtime {
  maLichChieu: number;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  thoiLuong: number;
}

// User Types
export interface User {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  accessToken?: string;
}

export interface LoginRequest {
  taiKhoan: string;
  matKhau: string;
}

export interface RegisterRequest {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  hoTen: string;
}

// Booking Types
export interface Seat {
  maGhe: number;
  tenGhe: string;
  maRap: string;
  loaiGhe: string;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat?: string;
}

export interface TicketBooking {
  maLichChieu: number;
  danhSachVe: TicketInfo[];
}

export interface TicketInfo {
  maGhe: number;
  giaVe: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  to: string;
  icon?: string;
}
