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

type MyAppProps = {
  protected: boolean;
};
function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
  const router = useRouter();
  const { getItem, removeItem } = useLocalStorage();
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const autoLoginUser = useCallback(() => {
    const btzToken = getItem("btz-token");

    const userData =
      btzToken !== null
        ? (JSON.parse(btzToken) as {
            token: string;
            userId: string;
          })
        : {
            token: "",
            userId: "",
          };

    if (userData.token) {
      setToken(userData.token);
    }

    if (userData.userId) {
      setUserId(userData.userId);
    }
  }, [getItem]);

  const logoutUser = useCallback(() => {
    removeItem("btz-token");
    setToken("");
    setUserId("");
  }, [removeItem]);

  useEffect(() => {
    autoLoginUser();

    if (pageProps.protected && !token && !userId) {
      router.push("/unauthorized");
    }
  }, [autoLoginUser, pageProps, router, token, userId]);

  return (
    <div className="bg-orange-200 bg-opacity-40">
      <div className="mx-auto bg-orange-50 bg-opacity-50 max-w-screen-md min-h-screen h-full shadow-lg p-4 pb-16">
        <AuthContext.Provider value={{ token, userId, logoutUser }}>
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
