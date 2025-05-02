import { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  createdAt: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.email && parsedUser.createdAt) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        } else {
          // Invalid user data
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      // Handle JSON parse error
      console.error("Error parsing user data:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string, userData: User) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error) {
      console.error("Error storing auth data:", error);
      alert("Failed to store authentication data");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};