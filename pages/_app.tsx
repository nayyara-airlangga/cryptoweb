import type { AppProps } from "next/app";
import { Layout } from "../components";
import { Provider } from "react-redux";

import store from "../app/store";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type PageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

function MyApp({ Component, pageProps }: AppProps) {
  // const getLayout = Component.getLayout ?? ((page) => page);
  return(
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default MyApp;
