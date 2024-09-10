"use client";
import ProtectedRoute from '@/component/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/component/loading/page';
import { Avatar } from '@mui/material';
const Page: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
   console.log(currentUser)
  const handleLogout = async () => {
    setLoading(true); // Đặt trạng thái tải để thông báo cho người dùng
    try {
      await logout();
      toast.success('Logged out successfully!'); // Hiển thị thông báo khi đăng xuất thành công
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.'); // Hiển thị thông báo lỗi nếu có lỗi xảy ra
    } finally {
      setLoading(false); // Đặt trạng thái tải về false sau khi hoàn tất
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <div className='w-full flex justify-center'>
             <Avatar src={currentUser?.photoURL} alt='avatar' />
            </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, {currentUser?.name || currentUser?.displayName }</h1>
          <p className="text-gray-600 mb-6">You are now logged in. Explore the features of the application!</p>
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`bg-blue-500 text-white font-bold px-4 py-2 rounded transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
           {loading ? <Loading/> : 'Logout'}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
