import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";

import {
  addToCart,
} from "../features/cart/cartSlice";

import {
  translateCategory,
  translateDescription,
  translateProductName,
} from "../utils/productMapper";

function ProductDetailPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const product = useAppSelector((state) =>
    state.products.items.find(
      (item) => item.id === Number(id)
    )
  );

  if (!product) {
    return (
      <h2>
        Không tìm thấy sản phẩm
      </h2>
    );
  }

  const translatedTitle = translateProductName(
    product.title
  );

  const translatedCategory = translateCategory(
    product.category
  );

  const translatedDescription = translateDescription(
    product.category
  );

  return (
    <div className="detail-page">
      <div className="detail-image">
        <img
          src={product.image}
          alt={translatedTitle}
        />
      </div>

      <div className="detail-content">
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "12px",
          }}
        >
          {translatedTitle}
        </h1>

        <span className="category">
          {translatedCategory}
        </span>

        <h2 className="price">
          {(
            product.price * 25000
          ).toLocaleString("vi-VN")}đ
        </h2>

        <p
          style={{
            marginTop: "16px",
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          {translatedDescription}
        </p>

        <div
          className="detail-actions"
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "28px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            className="add-to-cart-detail-btn"
            style={{
              padding: "16px 28px",
              fontSize: "20px",
              fontWeight: 700,
              borderRadius: "16px",
              border: "2px solid #60a5fa",
              background:
                "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "#ffffff",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(addToCart(product));

              alert(
                "✅ Bạn đã thêm sản phẩm vào giỏ hàng"
              );
            }}
          >
            🛒 Thêm vào giỏ hàng
          </button>

          <Link
            to="/"
            className="back-home-detail-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 28px",
              fontSize: "20px",
              fontWeight: 700,
              borderRadius: "16px",
              border: "2px solid #94a3b8",
              background: "#f8fafc",
              color: "#0f172a",
              textDecoration: "none",
            }}
          >
            🏠 Quay lại
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;