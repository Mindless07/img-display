import { useState, useEffect, useContext, createContext } from "react";
import { getUser } from "@/utils/dbConfig";
import { currentUserKey, CURRENT_USER_LOCAL_STORAGE_KEY } from "./constantes";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!currentUserKey) return;
    getUser(currentUserKey).then((user) => {
      setUser(user);
    });
  }, []);

  const login = (username, password) => {
    if (
      (username === "muser1" && password === "mpassword1") ||
      (username === "muser2" && password === "mpassword2")
    ) {
      localStorage.setItem(CURRENT_USER_LOCAL_STORAGE_KEY, username);
      getUser(username).then((user) => {
        setUser(user);
      });
      return;
    }
    if (username === "muser3" && password === "mpassword3")
      throw new Error("Blocked account");

    throw new Error("Invalid credentials");
  };

  return {
    user,
    login,
  };
}
