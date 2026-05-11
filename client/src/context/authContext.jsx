import { createContext, useContext, useState } from "react";
import { authApi } from "../api/authApi.jsx";
import auth from "../lib/auth";

const context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.user || null);
  
  async function login({ email, password }) {
    const { user, token } = await authApi.login({ email, password });
    auth.user = user;
    auth.token = token;
    setUser(user);
    return { user, token };
  }

  async function signup({ name, email, password }) {
    const { user, token } = await authApi.signup({ name, email, password });
    auth.user = user;
    auth.token = token;
    setUser(user);
    return { user, token };
  }

  function logout() {
    auth.logout();
    setUser(null);
  }

  return (
    <context.Provider
      value={{
        user,
        token: auth.token || "",
        login,
        signup,
        isLoggedIn: user ? true : false,
        logout,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default function useAuth() {
  return useContext(context);
}
