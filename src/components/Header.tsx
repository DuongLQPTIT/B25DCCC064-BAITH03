import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

import { useAppSelector } from "../app/hooks";
import { selectTotalQuantity } from "../features/cart/cartSlice";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, profile, updateProfile } = useAuth();

  const [showProfile, setShowProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setFullName(profile.fullName || "");
    setPhone(profile.phone || "");
    setAddress(profile.address || "");
  }, [profile]);

  const totalQuantity = useAppSelector(selectTotalQuantity);

  const saveProfile = () => {
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanAddress = address.trim();

    if (!cleanName || !cleanPhone || !cleanAddress) {
      alert("⚠️ Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ!");
      return;
    }

    if (!/^0\d{9}$/.test(cleanPhone)) {
      alert("⚠️ Số điện thoại không hợp lệ (phải gồm 10 chữ số, bắt đầu bằng 0)!");
      return;
    }

    updateProfile({
      fullName: cleanName,
      phone: cleanPhone,
      address: cleanAddress,
    });

    alert("✅ Đã lưu thông tin");
    setShowProfile(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          🛒 ShopMini
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-btn home-btn">
          <span className="nav-icon">🏠</span>
          <span>Trang chủ</span>
        </Link>

        <Link to="/cart" className="nav-btn cart-btn">
          <span className="nav-icon">🛒</span>
          <span>Giỏ hàng</span>
          <div className="cart-count">{totalQuantity}</div>
        </Link>

        <Link to="/checkout" className="nav-btn payment-btn">
          <span className="nav-icon">💳</span>
          <span>Thanh toán</span>
        </Link>
      </nav>

      <div className="header-right">
        {user ? (
          <>
            <div className="user-box" onClick={() => setShowProfile(true)}>
              <span>👤</span>
              <span>{user.username}</span>
            </div>

            <button className="logout-btn" onClick={logout}>
              🚪 Đăng xuất
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            🔑 Đăng nhập
          </Link>
        )}

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {showProfile && (
        <div
          className="profile-overlay"
          onClick={() => setShowProfile(false)}
        >
          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>👤 Hồ sơ người dùng</h2>

            <input
              type="text"
              placeholder="Họ tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Số điện thoại (VD: 0912345678)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button onClick={saveProfile}>💾 Lưu thông tin</button>
          </div>
        </div>
      )}
    </header>
  );
}


export default Header;