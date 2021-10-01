import Link from "next/link";

import React from "react";
import { Space, Typography } from "antd";

const Footer = () => {
  return (
    <div className="footer">
      <Typography.Title
        level={5}
        style={{ color: "white", textAlign: "center" }}
      >
        CryptoWeb <br />
        All rights reserved
      </Typography.Title>
      <Space>
        <Link href="/">Home</Link>
        <Link href="/exchanges">Exchanges</Link>
        <Link href="/news">News</Link>
      </Space>
    </div>
  );
};

export default Footer;
