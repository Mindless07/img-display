import { useEffect, useState } from "react";
import { getUser } from "@/utils/dbConfig";

export const useAuth = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    getUser(currentUser).then((user) => setUser(user));
  }, []);
  return { user };
};

export const login = (username, password) => {
  if (
    (username === "muser1" && password === "mpassword1") ||
    (username === "muser2" && password === "mpassword2")
  )
    return localStorage.setItem("currentUser", username);

  if (username === "muser3" && password === "mpassword3")
    throw new Error("Blocked account");

  throw new Error("Invalid credentials");
};
