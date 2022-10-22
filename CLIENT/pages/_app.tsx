import "../styles/globals.css";
import type { AppProps } from "next/app";
import NotificationPopup from "../src/components/Notification/NotificationPopup";
import { Provider, useDispatch } from "react-redux";
import store from "../src/redux/store";
import Navbar from "../src/components/Navbar/Navbar";
import useLocalStorage from "../src/hooks/useLocalStorage";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../src/redux/AuthContext";
import useAuth from "../src/hooks/useAuth";

let logoutTimer: string | number | NodeJS.Timeout | undefined;
type MyAppProps = {
  protected: boolean;
};
function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const router = useRouter();
  const {
    autoLoginUser,
    logoutUser,
    token,
    tokenExpirationDate,
    userId,
    manageTokenExpiration,
  } = useAuth();

  useEffect(() => {
    autoLoginUser();

    if (pageProps.protected && token === "" && userId === "") {
      router.push("/unauthorized");
    }
  }, [token, userId, pageProps]);

  useEffect(() => {
    manageTokenExpiration();
  }, [manageTokenExpiration]);

  return (
    <div className="bg-orange-200 bg-opacity-40">
      <div className="mx-auto bg-orange-50 bg-opacity-50 max-w-screen-md min-h-screen h-full shadow-lg p-4 pb-16">
        <AuthContext.Provider
          value={{ token, userId, tokenExpirationDate, logoutUser }}
        >
          <Provider store={store}>
            <NotificationPopup />
            <Navbar />
            <Component {...pageProps} />
          </Provider>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default MyApp;
