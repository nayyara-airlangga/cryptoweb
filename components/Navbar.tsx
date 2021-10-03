import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import Link from "next/link";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null || Number);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize]);

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src="/images/cryptocurrency.png" size="large" />
          <Typography.Title level={2} className="logo">
            <Link href="/">CryptoWeb</Link>
          </Typography.Title>
          <Button
            className="menu-control-container"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <MenuOutlined />
          </Button>
        </div>
        {activeMenu && (
          <Menu theme="dark">
            <Menu.Item key={0} icon={<HomeOutlined />}>
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item key={1} icon={<FundOutlined />}>
              <Link href="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item key={2} icon={<MoneyCollectOutlined />}>
              <Link href="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item key={3} icon={<BulbOutlined />}>
              <Link href="/news">News</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
