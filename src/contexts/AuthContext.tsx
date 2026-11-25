import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    username: string,
    password: string
  ) => boolean;
  logout: () => void;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const login = (
username: string,
password: string
) => {
 
if (password === "123456") {
 
const shortName =
username
.split("@")[0]
.trim();
 
setUser({
username: shortName,
});
 
return true;
}
 
return false;
};

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}