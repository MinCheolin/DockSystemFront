import { useState } from "react";
import "./layout.css";
import {
  TeamOutlined,
  WarningOutlined,
  DatabaseOutlined,
  ProjectOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
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
  getItem("홈", "/mes/home", <HomeOutlined />),
  getItem("공정 관리", "/mes/process", <TeamOutlined />, [
    getItem("생산 계획 조회 ", "/mes/process/productPlan"),
    getItem("공정 조회", "/mes/process/processView"),
    getItem("공정 등록", "/mes/process/processCreate"),
  ]),
  getItem("프로젝트 관리", "/erp/project", <ProjectOutlined />, [
    getItem("프로젝트 등록", "/erp/project/projectCreate"),
    getItem("프로젝트 조회", "/erp/project/projectView"),
  ]),
  getItem("작업 지시", "/material", <DatabaseOutlined />, [
    getItem("발주 관리", "/4-1"),
    getItem("재고 관리", "/4-2"),
  ]),
  getItem("품질", "/safety", <WarningOutlined />),
];
const LayoutMESPresent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout className="layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
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
            <div>사용자 님</div>
            <div className="info-item">마이페이지</div>
            <div className="info-item">로그아웃</div>
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
    </Layout>
  );
};
export default LayoutMESPresent;
