import "../styles/globals.css";
import type { AppProps } from "next/app";
import NotificationPopup from "../src/components/Notification/NotificationPopup";
import { Provider } from "react-redux";
import store from "../src/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-purple-100 bg-opacity-30">
      <div className="mx-auto max-w-screen-md min-h-screen h-full shadow-lg p-4">
        <Provider store={store}>
          <NotificationPopup />
          <Component {...pageProps} />
        </Provider>
      </div>
    </div>
  );
}

export default MyApp;
