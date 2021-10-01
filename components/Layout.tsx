import Head from "next/head";

import React, { ReactElement } from "react";
import { Footer, Navbar } from "./";

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app">
      <Head>
        <link
          rel="shortcut icon"
          href="/images/cryptocurrency.png"
          type="image/x-icon"
        />
        <title>CryptoWeb</title>
      </Head>
      <Navbar />
      <div className="main">
        <div className="routes">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
