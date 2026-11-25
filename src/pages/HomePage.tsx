import {
  useEffect,
  useState,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";

import ProductCard from "../components/ProductCard";

import {
  fetchProducts,
} from "../features/products/productsSlice";

import {
  translateProduct,
} from "../utils/productMapper";

function HomePage() {
  const dispatch =
    useAppDispatch();

  const {
    items,
    status,
  } = useAppSelector(
    (state) =>
      state.products
  );

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {
    dispatch(
      fetchProducts()
    );
  }, [dispatch]);

  const filteredProducts =
    items.filter(
      (product) =>
        translateProduct(
          product.title
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <>
      <section className="hero">

        <h1>
          🔥 SHOPMINI SALE
        </h1>

        <p>
          Mua sắm thông minh,
          giá tốt mỗi ngày
        </p>

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </section>

      {status ===
        "loading" && (
        <div className="loading-box">
          <h2>
            ⏳ Đang tải sản phẩm...
          </h2>
        </div>
      )}

      {status ===
        "succeeded" &&
        filteredProducts.length === 0 && (
          <div className="empty-result">
            <h2>
              Không tìm thấy sản phẩm
            </h2>
          </div>
        )}

      <div className="products-grid">

        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        )}

      </div>
    </>
  );
}

export default HomePage;