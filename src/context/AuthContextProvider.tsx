import { User } from "@firebase/auth";
import { FC, useContext, useEffect, useState } from "react";
import {
  getUserInfo,
  signIn as signInFirebase,
  signOut as signOutFirebase,
  signUp as signUpFirebase,
  subscribeAuthStateChanged,
} from "../api/firebase";
import AuthContext, { defaultState } from "./AuthContext";

const STORAGE_USER_KEY = "user";

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState(defaultState.user);
  const [loading, setLoading] = useState(defaultState.loading);

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      await signInFirebase(email, password);
    } catch (error) {
      console.log(`Couldn't sign in. ${error}`);
    }
    setLoading(false);
  }

  async function signUp(email: string, password: string, displayName: string) {
    setLoading(true);
    try {
      await signUpFirebase(email, password, displayName);
    } catch (error) {
      console.log(`Couldn't sign up. ${error}`);
    }
    setLoading(false);
  }

  async function signOut() {
    setLoading(true);
    try {
      await signOutFirebase();
    } catch (error) {
      console.log(`Couldn't sign in. ${error}`);
    }
    setLoading(false);
  }

  function updateUser(user: User | null) {
    setUser(user);
  }

  useEffect(() => {
    const unsubscribe = subscribeAuthStateChanged(updateUser);
    return () => unsubscribe();
  }, []);

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
