import "./layout.css";
import {
  TeamOutlined,
  WarningOutlined,
  DatabaseOutlined,
  ProjectOutlined,
  HomeOutlined,
  ExportOutlined,
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
  getItem("ERP 홈", "/erp/home", <HomeOutlined />),
  getItem("기준 정보 관리", "/erp/standard", <TeamOutlined />, [
    getItem("거래처 관리", "/erp/standard/client"),
    getItem("고객사 관리", "/erp/standard/customer"),
    getItem("자재 관리", "/erp/standard/material"),
    getItem("장비 관리", "/erp/standard/equipment"),
    getItem("선박 관리", "/erp/standard/vessel"),
    getItem("창고 관리", "/erp/standard/warehouse"),
    getItem("표준 공정 관리", "/erp/standard/StandardProcess"),
    getItem("사원 정보 관리", "/erp/standard/user"),
    getItem("BOM 관리", "/erp/standard/bom"),
  ]),
  getItem("프로젝트 관리", "/erp/project", <ProjectOutlined />, [
    getItem("프로젝트 등록", "/erp/project/projectCreate"),
    getItem("프로젝트 조회", "/erp/project/projectView"),
  ]),
  // getItem("자재 관리", "/material", <DatabaseOutlined />, [
  //   getItem("발주 관리", "/4-1"),
  //   getItem("재고 관리", "/4-2"),
  // ]),
  getItem("안전 관리", "/erp/safety", <WarningOutlined />),
  getItem("MES로 이동", "/mes", <ExportOutlined />),
];
const LayoutPresent = ({
  collapsed,
  setCollapsed,
  loginUser,
  navigate,
  HandleLogout,
}) => {
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
export default LayoutPresent;
