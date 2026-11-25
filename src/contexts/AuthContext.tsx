import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface User {
  username: string;
}

export interface UserProfile {
  fullName: string;
  phone: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: UserProfile) => void;
}

const emptyProfile: UserProfile = {
  fullName: "",
  phone: "",
  address: "",
};

const readStoredProfile = (username?: string): UserProfile => {
  if (!username) return emptyProfile;
  try {
    const raw = localStorage.getItem(`profile_${username}`);
    if (!raw) return emptyProfile;
    const parsed = JSON.parse(raw);
    return {
      fullName: parsed.fullName || "",
      phone: parsed.phone || "",
      address: parsed.address || "",
    };
  } catch {
    return emptyProfile;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);

  useEffect(() => {
    setProfile(readStoredProfile(user?.username));
  }, [user?.username]);

  const login = (username: string, password: string) => {
    if (password === "123456") {
      const shortName = username.split("@")[0].trim();
      setUser({
        username: shortName,
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setProfile(emptyProfile);
  };

  const updateProfile = (data: UserProfile) => {
    if (!user?.username) return;
    localStorage.setItem(`profile_${user.username}`, JSON.stringify(data));
    setProfile(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}