import { createContext, useContext, useState, useEffect } from "react";
import config from "../configs/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) return false;

    setToken(savedToken);

    const res = await fetch(`${config.BASE_API}/auth/user`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${savedToken}`
      }
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const response = await res.json();

    if (response.data) {
      setUser(response.data);
      return true;
    }

    return false;
  };

  const login = async ({ username, password }) => {
    const res = await fetch(`${config.BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const response = await res.json();

    if (response.data) {
      const newToken = response.data.token;

      setToken(newToken);
      localStorage.setItem("token", newToken);

      return getUser();
    }

    return false;
  };

  const register = async ({ username, password }) => {
    const res = await fetch(`${config.BASE_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const response = await res.json();

    if (response.success) {
      return login({ username, password });
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook cho dễ dùng
export const useAuth = () => {
  return useContext(AuthContext);
};