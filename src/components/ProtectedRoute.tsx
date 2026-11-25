import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;