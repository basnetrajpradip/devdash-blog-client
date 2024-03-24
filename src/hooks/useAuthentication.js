import { getAuthInfo, loginUser, logoutUser, registerUser } from "../services/API";
import { useEffect, useState } from "react";

export default function useAuthentication() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    async function handleAuthInfo() {
      try {
        const userData = await getAuthInfo();
        setIsAuth(true);
        setCurrentUser(userData.user.id);
        userData.user.isAuthor ? setIsAuthor(true) : setIsAuthor(false);
      } catch (err) {
        setIsAuth(false);
        setIsAuthor(false);
        setCurrentUser("");
        console.log(`useAuth Not Authenticated: ${err}`);
      }
    }
    handleAuthInfo();
  }, []);

  async function register(registerData) {
    try {
      await registerUser(registerData);
    } catch (err) {
      console.log(`useAuth Register: ${err}`);
      throw err;
    }
  }

  async function login(loginData) {
    try {
      const userData = await loginUser(loginData);
      if (!userData) {
        setIsAuth(false);
        setCurrentUser("");
      } else {
        setIsAuth(true);
        setCurrentUser(userData.user.id);
        userData.user.isAuthor ? setIsAuthor(true) : setIsAuthor(false);
      }
    } catch (err) {
      console.log(`useAuth Login: ${err}`);
      throw err;
    }
  }

  async function logout() {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await logoutUser();
    setIsAuth(false);
    setIsAuthor(false);
    setCurrentUser("");
  }

  function handleAuthError(err) {
    if (err.response.status === 401) {
      setIsAuth(false);
      setIsAuthor(false);
      setCurrentUser(false);
    }
  }

  return { isAuth, isAuthor, currentUser, register, login, logout, handleAuthError };
}
