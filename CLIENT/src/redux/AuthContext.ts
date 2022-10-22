import { createContext } from "react";

type AuthContextType = {
    token: string | undefined,
    userId: string | undefined,
    tokenExpirationDate: undefined | Date,
    logoutUser: () => void
}

export const AuthContext = createContext<AuthContextType>({ token: undefined, userId: undefined, tokenExpirationDate: undefined, logoutUser: () => { } });