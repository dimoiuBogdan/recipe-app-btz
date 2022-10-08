import "../styles/globals.css";
import type { AppProps } from "next/app";
import NotificationPopup from "../src/components/Notification/NotificationPopup";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import Navbar from "../src/components/Navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-orange-200 bg-opacity-40">
      <div className="mx-auto bg-orange-50 bg-opacity-50 max-w-screen-md min-h-screen h-full shadow-lg p-4 pb-16">
        <Provider store={store}>
          <NotificationPopup />
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </div>
    </div>
  );
}

export default MyApp;
