import {User} from "@firebase/auth";
import {createContext, Dispatch, SetStateAction} from "react";

interface AuthState {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signUp: (email: string, password: string, displayName: string) => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const defaultState: AuthState = {
    user: null,
    setUser: () => null,
    loading: true,
    setLoading: () => null,
    signIn: async () => {
    },
    signInWithGoogle: async () => {

    },
    signUp: async () => {
    },
    verifyEmail: async () => {
    },
    signOut: async () => {
    },
};

const AuthContext = createContext(defaultState);

export default AuthContext;
