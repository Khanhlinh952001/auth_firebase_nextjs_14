"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/firebase'; // Cấu hình Firebase của bạn
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { fireStore } from '@/firebase'; // Cấu hình Firestore của bạn
import Loading from '@/component/loading/page'; // Component Loading để hiển thị khi đang tải dữ liệu

// Tạo context cho xác thực người dùng
const AuthContext = createContext<any>(null);

// Hook tùy chỉnh để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider cho AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Đặt trạng thái mặc định là đang tải
  const router = useRouter();

  // Sử dụng useEffect để lắng nghe và hủy lắng nghe thay đổi trạng thái xác thực của người dùng
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Lấy thông tin người dùng từ Firestore
        const userDocRef = doc(fireStore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setCurrentUser({ ...user, ...userDoc.data() });
        }
        
        // Điều hướng người dùng nếu cần
        if (pathname === '/auth/sign-in' || pathname === '/auth/sign-up') {
          router.push('/pages/home');
        }
      } else {
        setCurrentUser(null);
        
        // Điều hướng về trang đăng nhập nếu người dùng không còn đăng nhập
        if (pathname !== '/auth/sign-in' && pathname !== '/auth/sign-up') {
          router.push('/auth/sign-in');
        }
      }
      setLoading(false); // Đặt trạng thái không còn đang tải
    });
    return () => unsubscribe(); // Hủy đăng ký khi component bị unmount
  }, [router]);

  // Hàm đăng nhập
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Đã xử lý điều hướng trong useEffect
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng xuất
  const logout = async () => {
    try {
      await signOut(auth); // Đăng xuất
      setCurrentUser(null); // Đặt trạng thái người dùng hiện tại là null
      await router.push('/auth/sign-in'); // Điều hướng đến trang đăng nhập sau khi đăng xuất thành công
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Hàm đăng ký
  const register = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      // Lưu thông tin người dùng vào Firestore
      const userDocRef = doc(fireStore, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        createdAt: new Date(),
      });

      setCurrentUser(userCredential.user); // Cập nhật trạng thái người dùng hiện tại
      await router.push('/pages/home'); // Điều hướng đến trang chính sau khi đăng ký thành công
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };

  // Giá trị của AuthContext sẽ được cung cấp cho các component con
  const value = {
    currentUser,
    login,
    logout,
    register
  };

  // Render AuthProvider với các component con hoặc loading nếu dữ liệu vẫn đang được tải
  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
