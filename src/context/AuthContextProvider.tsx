import {FC, useCallback, useContext, useEffect, useState} from "react";
import {
    applyEmailVerificationCode,
    signIn as signInFirebase,
    signOut as signOutFirebase,
    signUp as signUpFirebase,
    subscribeAuthStateChanged,
    signInWithGoogle as signInWithGoogleFirebase
} from "../api/firebase";
import AuthContext, {defaultState} from "./AuthContext";

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider: FC = ({children}) => {
    const [user, setUser] = useState(defaultState.user);
    const [loading, setLoading] = useState(defaultState.loading);

    async function signIn(email: string, password: string) {
        try {
            await signInFirebase(email, password);
        } catch (error) {
            throw error;
        }
    }

    async function signInWithGoogle() {
        try {
            await signInWithGoogleFirebase();
        } catch (error) {
            throw error;
        }
    }

    async function signUp(email: string, password: string, displayName: string) {
        try {
            await signUpFirebase(email, password, displayName);
        } catch (error) {
            throw error;
        }
    }

    const verifyEmail = useCallback(async (code: string) => {
        try {
            await applyEmailVerificationCode(code);
        } catch (error) {
            throw error;
        }
    }, []);

    async function signOut() {
        try {
            await signOutFirebase();
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribeAuthChanged = subscribeAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribeAuthChanged();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                signIn,
                signInWithGoogle,
                signUp,
                verifyEmail,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
