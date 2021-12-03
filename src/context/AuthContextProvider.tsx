import { User } from "@firebase/auth";
import { FC, useContext, useState } from "react";
import {
  signIn as signInFirebase,
  signOut as signOutFirebase,
  signUp as signUpFirebase,
} from "../api/firebase";
import AuthContext, { defaultState } from "./AuthContext";

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState(loadUserFromStorageOrDefault());
  const [loading, setLoading] = useState(defaultState.loading);

  function loadUserFromStorageOrDefault() {
    const userItem = localStorage.getItem("user");
    if (userItem) {
      console.log("DEBUG: updating user from storage");
      return JSON.parse(userItem) as User;
    }
    return defaultState.user;
  }

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const user = await signInFirebase(email, password);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
    } catch (error) {
      console.log(`Couldn't sign in. ${error}`);
    }
    setLoading(false);
    return false;
  }

  async function signUp(email: string, password: string) {
    setLoading(true);
    try {
      const user = await signUpFirebase(email, password);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
    } catch (error) {
      console.log(`Couldn't sign up. ${error}`);
    }
    setLoading(false);
    return false;
  }

  async function signOut() {
    setLoading(true);
    try {
      await signOutFirebase();
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log(`Couldn't sign in. ${error}`);
    }
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
