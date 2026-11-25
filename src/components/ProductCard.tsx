import { Link } from "react-router-dom";

import type { Product } from "../types";

import { useAppDispatch } from "../app/hooks";

import { addToCart } from "../features/cart/cartSlice";

import {
  translateCategory,
  translateProductName,
} from "../utils/productMapper";

interface Props {
  product: Product;
}

function ProductCard({
  product,
}: Props) {
  const dispatch =
    useAppDispatch();

  const translatedTitle =
    translateProductName(
      product.title
    );

  const translatedCategory =
    translateCategory(
      product.category
    );

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={translatedTitle}
      />

      <span className="category">
        {translatedCategory}
      </span>

      <h3>
        {translatedTitle}
      </h3>

      <p className="price">
        {(
          product.price * 25000
        ).toLocaleString(
          "vi-VN"
        )}đ
      </p>

      <div className="card-actions">
        <button
          onClick={() => {
            dispatch(
              addToCart(product)
            );

            alert(
              "✅ Bạn đã thêm sản phẩm vào giỏ hàng"
            );
          }}
        >
          Thêm vào giỏ hàng
        </button>

        <Link
          to={`/products/${product.id}`}
        >
          🔍 chi tiết
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;