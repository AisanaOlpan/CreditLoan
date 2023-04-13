import React from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const sidebar = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  left: 30,
  top: 0,
  bottom: 0,
  background: "none",
};

const menu = {
  background: "none",
  border: "none",
};
const SiderCustom = () => (
  <Sider style={sidebar}>
    <div
      style={{
        height: 32,
        margin: 16,
      }}
    />
    <Menu defaultSelectedKeys={["4"]} items={items} style={menu} />
  </Sider>
);

export default SiderCustom;
