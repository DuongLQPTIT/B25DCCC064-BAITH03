# Bài thực hành 03 (BaiTH03) — ShopMini

Ứng dụng web bán hàng mini (**ShopMini**) được xây dựng bằng **React + TypeScript**, áp dụng kết hợp **useState**, **Context API** và **Redux Toolkit** để tổ chức và quản lý trạng thái (State Management) hợp lý theo từng phạm vi sử dụng.

---

## 1. Công nghệ sử dụng
- **React** & **TypeScript**
- **React Router** (`react-router-dom`) — Điều hướng giữa các trang và xử lý trang lỗi 404
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`) — Quản lý state giỏ hàng tập trung
- **Context API** — Quản lý xác thực người dùng (`AuthContext`) và giao diện Sáng/Tối (`ThemeContext`)

---

## 2. Cấu trúc thư mục dự án (`src/`)
```text
src/
├── app/              # Cấu hình Redux store và custom hooks (useAppDispatch, useAppSelector)
├── assets/           # Hình ảnh, tài nguyên tĩnh
├── components/       # Các component dùng chung (Header, ProductCard, Popup hồ sơ,...)
├── contexts/         # Quản lý state toàn cục bằng Context API
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── features/         # Các slice và logic nghiệp vụ Redux Toolkit (cartSlice,...)
├── layouts/          # Bố cục chung cho các trang
│   └── MainLayout.tsx
├── pages/            # Các trang chức năng chính của ứng dụng
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── LoginPage.tsx
│   └── NotFoundPage.tsx
├── types/            # Định nghĩa kiểu dữ liệu TypeScript (Product, CartItem, User,...)
├── utils/            # Các hàm tiện ích xử lý dữ liệu / localStorage
├── App.tsx           # Khai báo định tuyến (Routes) và bọc các Provider
└── main.tsx          # Điểm khởi chạy ứng dụng
```

---

## 3. Phân chia quản lý dữ liệu (State Management) & Lý do

### A. `useState` — State cục bộ trong từng component
Sử dụng cho các trạng thái tạm thời, chỉ phục vụ riêng cho một component hoặc một luồng tương tác nhỏ, không cần chia sẻ rộng rãi:

- **Trạng thái form & nhập liệu:**
  - Form đăng nhập tại `LoginPage.tsx` (`username`, `password`).
  - Form cập nhật thông tin nhận hàng (`fullName`, `phone`, `address`).
  - Ô tìm kiếm / lọc sản phẩm tại `HomePage.tsx` (`searchTerm`).
  - **Ví dụ trong code:**
    ```tsx
    const [searchTerm, setSearchTerm] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    ```
  - **Lý do:** Dữ liệu nhập liệu chỉ phục vụ quá trình thao tác trực tiếp trên chính form hoặc ô tìm kiếm đó; dùng `useState` giúp giao diện phản hồi nhanh và tránh đẩy dữ liệu tạm lên store toàn cục.

- **Trạng thái giao diện (UI local):**
  - Đóng/mở modal hoặc popup hồ sơ người dùng (`showProfile`).
  - Lựa chọn phương thức thanh toán tạm thời trên trang thanh toán `CheckoutPage.tsx` (`COD`, `MoMo`, `VNPay`).
  - **Ví dụ trong code:**
    ```tsx
    const [showProfile, setShowProfile] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    ```
  - **Lý do:** Chỉ sử dụng trong phạm vi một component cụ thể, không cần chia sẻ sang các component khác ở xa trong cây DOM, giúp mã nguồn gọn gàng và dễ bảo trì.

---

### B. Context API — State dùng chung toàn ứng dụng (ít biến đổi tần suất cao)
Sử dụng cho các cấu hình hoặc trạng thái toàn cục mà nhiều trang/component ở nhiều cấp khác nhau cần truy cập trực tiếp mà không phải truyền props qua nhiều cấp (prop drilling):

- **`AuthContext` (`src/contexts/AuthContext.tsx`):**
  - **Dữ liệu quản lý:** Thông tin người dùng hiện tại (`user`), trạng thái đã đăng nhập hay chưa, cùng các hàm đăng nhập (`login`) và đăng xuất (`logout`).
  - **Ví dụ trong code:**
    ```tsx
    const { user, login, logout } = useAuth();
    ```
  - **Lý do:** Nhiều trang và thành phần khác nhau như `MainLayout` / Header, popup hồ sơ cá nhân, `LoginPage` hay `CheckoutPage` đều cần kiểm tra xem người dùng đã đăng nhập chưa và lấy thông tin tài khoản hiện tại mà không phải truyền props trung gian qua nhiều cấp.

- **`ThemeContext` (`src/contexts/ThemeContext.tsx`):**
  - **Dữ liệu quản lý:** Trạng thái chế độ giao diện hiện tại (`Light Mode` / `Dark Mode`) và hàm chuyển đổi (`toggleTheme`).
  - **Ví dụ trong code:**
    ```tsx
    const { theme, toggleTheme } = useTheme();
    ```
  - **Lý do:** Giao diện sáng/tối áp dụng đồng bộ trên toàn bộ ứng dụng ở mọi trang và tần suất thay đổi thấp nên dùng Context API gọn nhẹ, tối ưu hơn so với Redux.

---

### C. Redux Toolkit — State phức tạp, cập nhật thường xuyên ở nhiều màn hình
Sử dụng cho dữ liệu nghiệp vụ cốt lõi có nhiều hành động cập nhật (actions) và được đọc/tính toán đồng thời ở nhiều màn hình khác nhau:

- **`cartSlice` (`src/features/cart/cartSlice.ts`):**
  - **Dữ liệu quản lý:**
    - Danh sách sản phẩm đang có trong giỏ hàng (`items`).
    - Tổng số lượng sản phẩm (`selectTotalQuantity`).
    - Tổng giá trị đơn hàng (`selectTotalPrice`).
    - Các action cập nhật giỏ hàng: thêm sản phẩm (`addToCart`), tăng/giảm số lượng, xóa từng sản phẩm và xóa toàn bộ giỏ hàng sau khi đặt hàng (`clearCart`).
  - **Ví dụ trong code:**
    ```tsx
    // Đọc dữ liệu giỏ hàng từ Redux store
    const totalPrice = useAppSelector(selectTotalPrice);
    const totalQuantity = useAppSelector(selectTotalQuantity);

    // Gửi action cập nhật giỏ hàng
    const dispatch = useAppDispatch();
    dispatch(addToCart(product));
    dispatch(clearCart());
    ```
  - **Lý do:** Dữ liệu giỏ hàng biến đổi liên tục qua nhiều thao tác và xuất hiện đồng thời ở nhiều nơi: **Header** (hiển thị tổng số lượng badge), **HomePage / ProductDetailPage** (thêm vào giỏ), **CartPage** (chỉnh sửa giỏ hàng) và **CheckoutPage** (tính tạm tính, phí vận chuyển và tổng thanh toán). Redux Toolkit giúp chuẩn hóa logic cập nhật tập trung, dễ debug và dễ mở rộng.

---

## 4. Các chức năng đã thực hiện
- **Trang chủ (`HomePage.tsx`):** Hiển thị danh sách sản phẩm và tìm kiếm/lọc sản phẩm theo từ khóa.
- **Chi tiết sản phẩm (`ProductDetailPage.tsx`):** Xem thông tin chi tiết từng sản phẩm và thêm vào giỏ hàng.
- **Giỏ hàng (`CartPage.tsx`):** Xem danh sách sản phẩm đã chọn, tăng/giảm số lượng và xóa sản phẩm khỏi giỏ.
- **Xác thực & Tài khoản (`LoginPage.tsx`, `AuthContext.tsx`):** Đăng nhập, đăng xuất và cập nhật/lưu thông tin nhận hàng (`fullName`, `phone`, `address`).
- **Giao diện Sáng / Tối (`ThemeContext.tsx`):** Chuyển đổi linh hoạt giữa Light Theme và Dark Theme trên toàn bộ ứng dụng.
- **Thanh toán (`CheckoutPage.tsx`):** Kiểm tra điều kiện giỏ hàng và thông tin nhận hàng đầy đủ trước khi đặt hàng, chọn phương thức thanh toán và tự động làm trống giỏ sau khi đặt thành công.
- **Xử lý đường dẫn không tồn tại (`NotFoundPage.tsx`):** Hiển thị trang 404 khi người dùng truy cập route không hợp lệ.

---

## 5. Hướng dẫn chạy dự án ở máy cục bộ (Local)
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy ứng dụng ở môi trường phát triển
npm run dev
```