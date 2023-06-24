import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CognitoUser } from "../types/cognito";

export type AuthStoreUser = CognitoUser;

export type AuthStore = ({
    isAuthenticated: false;
    user: null;
} | {
    isAuthenticated: true;
    user: AuthStoreUser;
}) & {
    signedIn: (user: AuthStoreUser) => void;
    signedOut: () => void;
}

const useAuthStore = create(immer<AuthStore>((set) => ({
    isAuthenticated: false,
    user: null,
    signedIn: (user) => {
        set(state => {
            state.isAuthenticated = true;
            state.user = user;
        })
    },
    signedOut: () => {
        set(state => {
            state.isAuthenticated = false;
            state.user = null;
        })
    }
})))

export { useAuthStore };
