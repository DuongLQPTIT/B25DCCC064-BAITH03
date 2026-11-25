import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  selectTotalPrice,
  selectTotalQuantity,
} from "../features/cart/cartSlice";

function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const totalPrice = useAppSelector(selectTotalPrice);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const isProfileComplete = Boolean(
    user &&
      profile.fullName.trim() &&
      profile.phone.trim() &&
      profile.address.trim()
  );

  const shippingFee = 30000;
  const finalPrice = totalPrice * 25000 + shippingFee;

  const handleOrder = () => {
    if (!isProfileComplete) {
      alert("⚠️ Vui lòng cập nhật đầy đủ thông tin nhận hàng!");
      return;
    }

    dispatch(clearCart());
    alert(`🎉 Đặt hàng thành công! (Phương thức: ${paymentMethod})`);
    navigate("/");
  };

  return (
    <div className="checkout-layout">
      {/* LEFT */}
      <div className="checkout-left">
        <h1 className="checkout-title">📍 Thông tin nhận hàng</h1>

        <div className="receiver-box">
          <div className="receiver-item">
            <span>👤 Họ tên</span>
            <strong>{profile.fullName || "Chưa cập nhật"}</strong>
          </div>

          <div className="receiver-item">
            <span>📞 Số điện thoại</span>
            <strong>{profile.phone || "Chưa cập nhật"}</strong>
          </div>

          <div className="receiver-item">
            <span>📍 Địa chỉ</span>
            <strong>{profile.address || "Chưa cập nhật"}</strong>
          </div>
        </div>

        <h2 className="payment-title">💳 Phương thức thanh toán</h2>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Thanh toán khi nhận hàng (COD)
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="MoMo"
              checked={paymentMethod === "MoMo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Ví MoMo
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="VNPay"
              checked={paymentMethod === "VNPay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            VNPay
          </label>
        </div>
      </div>

      {/* RIGHT */}
      <div className="checkout-right">
        <h2>🛒 Đơn hàng của bạn</h2>

        <div className="checkout-row">
          <span>Số lượng sản phẩm</span>
          <strong>{totalQuantity}</strong>
        </div>

        <div className="checkout-row">
          <span>Tạm tính</span>
          <strong>{(totalPrice * 25000).toLocaleString("vi-VN")} VNĐ</strong>
        </div>

        <div className="checkout-row">
          <span>Phí vận chuyển</span>
          <strong>{shippingFee.toLocaleString("vi-VN")} VNĐ</strong>
        </div>

        <hr />

        <div className="checkout-total">
          <span>Tổng thanh toán</span>
          <strong>{finalPrice.toLocaleString("vi-VN")} VNĐ</strong>
        </div>

        {!isProfileComplete && (
          <div className="checkout-warning">
            ⚠️ Vui lòng cập nhật đầy đủ họ tên, số điện thoại và địa chỉ trước
            khi đặt hàng.
          </div>
        )}

        {totalQuantity === 0 && (
          <div className="checkout-warning">
            🛒 Giỏ hàng của bạn đang trống.
          </div>
        )}

        <button
          className="checkout-order-btn"
          onClick={handleOrder}
          disabled={totalQuantity === 0 || !isProfileComplete}
        >
          ✅ ĐẶT HÀNG NGAY
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;