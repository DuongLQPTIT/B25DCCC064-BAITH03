import { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");
const handleSubmit = (
  e: React.FormEvent
) => {
  e.preventDefault();

  setError("");

  if (!username.trim()) {
    setError(
      "❌ Vui lòng nhập tên đăng nhập"
    );
    return;
  }

  const success = login(
    username,
    password
  );

  if (success) {

    const from =
      (
        location.state as {
          from?: {
            pathname: string;
          };
        }
      )?.from?.pathname || "/";

    navigate(from, {
      replace: true,
    });

  } else {

    setError(
      "❌ Mật khẩu sai"
    );
    }
  };

  return (
    <div className="login-wrapper">

      <div className="login-card">

        <div className="login-header">
          <h1>🔐 Đăng nhập</h1>

          <p>
            Đăng nhập để tiếp tục
            thanh toán và quản lý
            giỏ hàng.
          </p>
        </div>

        

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            type="submit"
          >
            Đăng nhập
          </button>
        </form>

      </div>

    </div>
  );
}

export default LoginPage;