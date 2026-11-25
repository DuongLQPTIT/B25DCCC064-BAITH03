import {
  Link,
} from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      style={{
        textAlign:
          "center",
        marginTop:
          "80px",
      }}
    >
      <h1>
        404
      </h1>

      <p>
        Không tìm thấy
        trang
      </p>

      <Link to="/">
        Quay về trang
        chủ
      </Link>
    </div>
  );
}

export default NotFoundPage;