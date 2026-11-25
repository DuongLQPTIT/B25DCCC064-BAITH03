import { Link } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";

import {
  removeFromCart,
  updateQuantity,
  selectTotalPrice,
} from "../features/cart/cartSlice";

import {
  translateProduct,
} from "../utils/productMapper";

function CartPage() {
  const dispatch =
    useAppDispatch();

  const items =
    useAppSelector(
      (state) => state.cart.items
    );

  const totalPrice =
    useAppSelector(
      selectTotalPrice
    );

  const shippingFee = 30000;

  const finalPrice =
    totalPrice * 25000 +
    shippingFee;

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1 className="cart-title">
          🛒 Giỏ hàng của bạn
        </h1>

        <p className="cart-subtitle">
          Quản lý sản phẩm và tiến hành thanh toán
        </p>
      </div>

      {items.length === 0 && (
        <div className="empty-cart">
          <h2>
            Chưa có sản phẩm nào
          </h2>

          <p>
            Hãy quay lại trang chủ để mua sắm.
          </p>

          <Link
            to="/"
            className="back-home-btn"
          >
            🏠 Quay lại mua sắm
          </Link>
        </div>
      )}

      {items.map((item) => (

        <div
          className="cart-item"
          key={item.id}
        >

          <img
            src={item.image}
            alt={item.title}
          />

          <div className="cart-info">

            <h2 className="cart-product-name">
              {translateProduct(
                item.title
              )}
            </h2>

            <p className="cart-price">
              💰 Đơn giá:
              {" "}
              {(item.price * 25000)
                .toLocaleString(
                  "vi-VN"
                )} VNĐ
            </p>

            <p className="item-total">
              🧾 Thành tiền:
              {" "}
              {(
                item.price *
                item.quantity *
                25000
              ).toLocaleString(
                "vi-VN"
              )} VNĐ
            </p>

            <div className="qty-box">

              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity:
                        Math.max(
                          1,
                          item.quantity - 1
                        ),
                    })
                  )
                }
              >
                −
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity:
                        item.quantity + 1,
                    })
                  )
                }
              >
                +
              </button>

            </div>

          </div>

          <button
            className="remove-btn"
            onClick={() =>
              dispatch(
                removeFromCart(
                  item.id
                )
              )
            }
          >
            🗑 Xóa
          </button>

        </div>

      ))}

      {items.length > 0 && (

        <div className="total-box">

          <div>

            <h3>
              💰 Tạm tính
            </h3>

            <h2>
              {(totalPrice * 25000)
                .toLocaleString(
                  "vi-VN"
                )} VNĐ
            </h2>

            <p>
              🚚 Phí vận chuyển:
              {" "}
              {shippingFee.toLocaleString("vi-VN")}
              {" "}VNĐ
            </p>

            <h1>
              Tổng cộng:
              {" "}
              {finalPrice.toLocaleString("vi-VN")}
              {" "}VNĐ
            </h1>

          </div>

          <div className="checkout-actions">

            <Link
              to="/"
              className="continue-btn"
            >
              🛍 Tiếp tục mua sắm
            </Link>

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              💳 Thanh toán ngay
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default CartPage;