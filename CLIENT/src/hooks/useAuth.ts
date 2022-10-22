import { useCallback, useState } from "react";
import useLocalStorage from "./useLocalStorage";

let logoutTimer: string | number | NodeJS.Timeout | undefined;

const useAuth = () => {
    const { getItem, removeItem } = useLocalStorage();
    const [token, setToken] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [tokenExpirationDate, setTokenExpirationDate] = useState<
        Date | undefined
    >(undefined);

    const logoutUser = useCallback(() => {
        removeItem("btz-token");
        setToken("");
        setUserId("");
        setTokenExpirationDate(undefined);
    }, [removeItem]);

    const autoLoginUser = useCallback(() => {
        const btzToken = getItem("btz-token");

        const userData =
            btzToken !== null
                ? (JSON.parse(btzToken) as {
                    token: string;
                    userId: string;
                    tokenExpirationDate: Date;
                })
                : {
                    token: "",
                    userId: "",
                    tokenExpirationDate: undefined,
                };

        if (userData.token && userData.userId && userData.tokenExpirationDate) {
            setToken(userData.token);
            setUserId(userData.userId);
            setTokenExpirationDate(userData.tokenExpirationDate);
        }

        if (
            userData.tokenExpirationDate &&
            new Date(userData.tokenExpirationDate) < new Date()
        ) {
            logoutUser();
        }
    }, [getItem, logoutUser]);

    const manageTokenExpiration = useCallback(
        () => {
            if (token && tokenExpirationDate) {
                const remainingTime =
                    new Date(tokenExpirationDate).getTime() - new Date().getTime();
                logoutTimer = setTimeout(logoutUser, remainingTime);
            } else {
                clearTimeout(logoutTimer);
            }
        }, [logoutUser, token, tokenExpirationDate])


    return {
        token, userId, tokenExpirationDate, logoutUser, autoLoginUser, manageTokenExpiration
    }
}

export default useAuth