import { User } from "@firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";

interface AuthState {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const defaultState: AuthState = {
  user: null,
  setUser: () => null,
  loading: false,
  setLoading: () => null,
  signIn: async () => false,
  signUp: async () => false,
  signOut: async () => {},
};

const AuthContext = createContext(defaultState);

export default AuthContext;
