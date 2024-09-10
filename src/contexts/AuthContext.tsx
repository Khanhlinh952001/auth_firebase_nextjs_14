"use client";
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/component/loading/page'; // Component Loading để hiển thị khi đang tải dữ liệu
import { login, logout, register, loginWithGoogle, onAuthStateChange } from '@/lib/auth/client'; // Import các phương thức xác thực

// Tạo context cho xác thực người dùng
const AuthContext = createContext<any>(null);

// Hook tùy chỉnh để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // Trả về context xác thực
};

// Provider cho AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const [currentUser, setCurrentUser] = useState<any>(null); // Trạng thái người dùng hiện tại
  const [loading, setLoading] = useState(true); // Đặt trạng thái mặc định là đang tải
  const router = useRouter(); // Khởi tạo router

  // Hàm xử lý thay đổi trạng thái xác thực
  const handleAuthStateChange = useCallback(async (user: any) => { // Chỉ định kiểu 'any' cho user
    if (user) {
      setCurrentUser(user); // Cập nhật người dùng hiện tại
      if (pathname === '/auth/sign-in' || pathname === '/auth/sign-up') {
        router.push('/pages/home'); // Chuyển hướng đến trang chính nếu đã đăng nhập
      }
    } else {
      setCurrentUser(null); // Đặt người dùng hiện tại là null nếu không có người dùng
      if (pathname !== '/auth/sign-in' && pathname !== '/auth/sign-up') {
        router.push('/auth/sign-in'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      }
    }
    setLoading(false); // Đặt trạng thái tải là false
  }, [pathname, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(handleAuthStateChange); // Đăng ký lắng nghe thay đổi trạng thái xác thực
    return () => unsubscribe(); // Hủy đăng ký khi component bị hủy
  }, [handleAuthStateChange]);

  // Giá trị của AuthContext sẽ được cung cấp cho các component con
  const value = {
    currentUser,
    login,
    logout,
    register,
    loginWithGoogle // Thêm chức năng đăng nhập bằng Google
  };

  // Render AuthProvider với các component con hoặc loading nếu dữ liệu vẫn đang được tải
  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children} // Hiển thị loading hoặc các component con
    </AuthContext.Provider>
  );
};
