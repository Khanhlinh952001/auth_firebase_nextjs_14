"use client";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Context để quản lý xác thực người dùng
import { useRouter } from "next/navigation"; // Hook để điều hướng sau khi đăng nhập
import { toast } from "react-toastify"; // Hiển thị thông báo
import { loginValidator } from "./utils"; // Import schema Yup đã định nghĩa

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(""); // State lưu email người dùng
  const [password, setPassword] = useState(""); // State lưu mật khẩu người dùng
  const [errorMessage, setErrorMessage] = useState(""); // State lưu lỗi để hiển thị trên giao diện
  const { login,loginWithGoogle } = useAuth(); // Lấy hàm login từ context
  const router = useRouter(); // Hook để chuyển hướng sau khi đăng nhập

  const handleGoogleLogin = async () => {
    await loginWithGoogle(); // Call the Google login function
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    try {
      // Thực hiện xác thực form với Yup
      await loginValidator.validate(
        { email, password }, // Dữ liệu cần xác thực
        { abortEarly: false } // Xác thực tất cả các trường, không dừng lại khi có lỗi đầu tiên
      );

      // Gọi API login từ context Auth
      await login(email, password);
     toast.success("Đăng nhập thành công!"); // Hiển thị thông báo thành công
    //   router.push("/pages/home"); // Điều hướng tới trang home
    } catch (validationErrors: any) {
      if (validationErrors.inner) {
        // Nếu có lỗi xác thực từ Yup, hiển thị thông báo lỗi
        validationErrors.inner.forEach((error: any) => {
          toast.error(error.message); // Hiển thị lỗi cho từng trường
        });
      } else {
        // Nếu có lỗi từ API (như tài khoản không tồn tại hoặc mật khẩu sai)
        setErrorMessage(validationErrors.message); // Lưu lỗi API vào state
        toast.error(validationErrors.message); // Hiển thị thông báo lỗi cho người dùng
      }
    }
  };

  return (
    <div className="font-sans min-h-screen antialiased bg-gray-900 pt-24 pb-5">
      <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          Your<span className="text-blue-500">App</span>
        </h1>

        {/* Form đăng nhập */}
        <form onSubmit={handleLogin}>
          <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
            <h1 className="font-bold text-xl text-center text-gray-700">
              Đăng nhập vào tài khoản
            </h1>

            {/* Input cho email */}
            <div className="flex flex-col space-y-1">
              <input
                type="text"
                name="email"
                id="email"
                className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                placeholder="Email"
                value={email} // Giá trị email được quản lý bởi state
                onChange={(e) => setEmail(e.target.value)} // Cập nhật state email khi người dùng nhập
              />
            </div>

            {/* Input cho password */}
            <div className="flex flex-col space-y-1">
              <input
                type="password"
                name="password"
                id="password"
                className="border-2 rounded px-3 text-gray-700 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                placeholder="Mật khẩu"
                value={password} // Giá trị password được quản lý bởi state
                onChange={(e) => setPassword(e.target.value)} // Cập nhật state password khi người dùng nhập
              />
            </div>

            {/* Hiển thị lỗi nếu có */}
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">
                {errorMessage} {/* Hiển thị thông báo lỗi từ API */}
              </div>
            )}

            {/* Nút đăng nhập */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </form>
        <button type="button" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
        {/* Hiển thị bản quyền */}
        <div className="flex justify-between text-gray-500 text-sm">
          <p>&copy;2021. All right reserved.</p>
        </div>

        {/* Liên kết đến trang đăng ký */}
        <div className="flex justify-center text-gray-500 text-sm">
          <p>
            Chưa có tài khoản?{" "}
            <a
              href="/auth/sign-up"
              className="text-blue-500 hover:text-blue-800 hover:underline"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
