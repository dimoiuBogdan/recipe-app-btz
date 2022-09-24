import "../styles/globals.css";
import type { AppProps } from "next/app";
import NotificationPopup from "../src/components/Notification/NotificationPopup";
import { Provider } from "react-redux";
import store from "../src/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-btz-blue bg-opacity-70">
      <div className="mx-auto max-w-screen-lg min-h-screen h-full shadow-lg">
        <Provider store={store}>
          <NotificationPopup />
          <Component {...pageProps} />
        </Provider>
      </div>
    </div>
  );
}

export default MyApp;
