import { createContext } from "react";

type AuthContextType = {
    token: string,
    userId: string,
    tokenExpirationDate: undefined | Date,
    logoutUser: () => void
}

export const AuthContext = createContext<AuthContextType>({ token: '', userId: '', tokenExpirationDate: undefined, logoutUser: () => { } });