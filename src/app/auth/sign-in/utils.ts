// Import Yup để sử dụng cho việc xác thực form
import * as Yup from "yup";

// Import các regex, message từ constants để dễ dàng quản lý
import { EMAIL_REGEX } from "@/constants/regex";  // Đảm bảo regex email được định nghĩa chính xác
import { EMAIL_MESSAGE } from "@/constants/message/common/email";  // Đảm bảo cấu trúc thông báo lỗi cho email
import { PASSWORD_MESSAGE } from "@/constants/message/common/password";  // Đảm bảo cấu trúc thông báo lỗi cho mật khẩu

// Định nghĩa schema dùng để xác thực form đăng nhập bằng Yup
export const loginValidator = Yup.object().shape({
  email: Yup.string()
    .trim() // Xóa khoảng trắng đầu và cuối chuỗi email
    .required(EMAIL_MESSAGE.REQUIRED)  // Bắt buộc phải nhập email (thông báo lỗi nếu để trống)
    .matches(EMAIL_REGEX, EMAIL_MESSAGE.WRONG_FORMAT),  // Xác thực email phải theo đúng định dạng (regex email)
  password: Yup.string()
    .trim() // Xóa khoảng trắng đầu và cuối chuỗi password
    .required(PASSWORD_MESSAGE.REQUIRED)  // Bắt buộc phải nhập mật khẩu (thông báo lỗi nếu để trống)
    .min(6, PASSWORD_MESSAGE.WRONG_FORMAT),  // Mật khẩu phải có ít nhất 6 ký tự (thông báo lỗi nếu không đủ)
});
