import { FC, useContext, useEffect, useState } from "react";
import {
  signIn as signInFirebase,
  signOut as signOutFirebase,
  signUp as signUpFirebase,
  subscribeAuthStateChanged,
} from "../api/firebase";
import AuthContext, { defaultState } from "./AuthContext";

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
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string, displayName: string) {
    setLoading(true);
    try {
      await signUpFirebase(email, password, displayName);
    } catch (error) {
      console.log(`Couldn't sign up. ${error}`);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    try {
      await signOutFirebase();
    } catch (error) {
      console.log(`Couldn't sign in. ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = subscribeAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
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
