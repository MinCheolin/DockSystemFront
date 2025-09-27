import "./layout.css";
import {
  SafetyOutlined,
  FileOutlined,
  HomeOutlined,
  ExportOutlined,
  TeamOutlined,
  ContainerOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import Chatbot from "../components/Chatbot/Chatbot";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("MES 홈", "/mes/home", <HomeOutlined />),
  getItem("기준 정보 관리", "/mes/standard", <TeamOutlined />, [
    getItem("자재 관리", "/mes/standard/material"),
    getItem("장비 관리", "/mes/standard/equipment"),
  ]),
  getItem("생산 계획 조회 ", "/mes/productPlan", <ContainerOutlined />),
  getItem("작업 조회", "/mes/workOrder", <FileOutlined />),
  getItem("품질", "/mes/qualityControl", <SafetyOutlined />),
  getItem("ERP로 이동", "/erp", <ExportOutlined />),
];
const LayoutMESPresent = ({
  collapsed,
  setCollapsed,
  navigate,
  loginUser,
  HandleLogout,
}) => {
  return (
    <Layout className="layout">
      <Sider
        className="custom-sider"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          className="custom-sider"
          defaultSelectedKeys={["/home"]}
          onClick={({ key }) => navigate(key)}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="main-header">
          <div></div>
          <div className="user-info">
            <div>{loginUser} 님</div>
            <div className="info-item">마이페이지</div>
            <div onClick={HandleLogout} className="info-item">
              로그아웃
            </div>
          </div>
        </Header>
        <Content className="main-content">
          <Outlet />
        </Content>
        <Footer className="main-footer">
          2025-SmartFactory Final Project ©{new Date().getFullYear()} Created by
          Ant UED
        </Footer>
      </Layout>
      <Chatbot />
    </Layout>
  );
};
export default LayoutMESPresent;
