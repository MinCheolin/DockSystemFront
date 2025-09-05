import React, { useState } from 'react';
import {
  TeamOutlined,
  WarningOutlined,
  DatabaseOutlined,
  ProjectOutlined,
  ShoppingOutlined,
  MoneyCollectOutlined,
  HomeOutlined
} from '@ant-design/icons';
import {  Layout, Menu, theme } from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';
const { Header, Content, Footer,Sider} = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('홈','/home',<HomeOutlined />),
  getItem('기준 정보 관리', '/standard', <TeamOutlined />, 
  [ getItem('거래처 관리','/standard/client'), 
    getItem('고객사 관리','/1-2'),
    getItem('자재 관리','/1-3'), 
    getItem('장비 관리','/1-4'), 
    getItem('선박 관리','/1-5'),
    getItem('창고 관리','/1-6'),
    getItem('표준 공정 관리','/1-7')  
  ]),
  getItem('영업 관리','/sales',<ShoppingOutlined />,
  [ getItem('견적 관리','2-1'),
    getItem('수주 관리','2-2')
  ]),
  getItem('프로젝트 관리','/project',<ProjectOutlined />,
  [ getItem('BOM 관리','/3-1'),
    getItem('프로젝트 관리','/3-2'),
    getItem('생산 계획 관리','/3-3')
  ]),
  getItem('자재 관리','/material',<DatabaseOutlined/>, 
  [ getItem('발주 관리','/4-1'),
    getItem('재고 관리','/4-2')
  ]),
  getItem('인사/회계 관리','/account', <MoneyCollectOutlined />,
  [ getItem('전표 관리','/5-1'),
    getItem('추가 근무 등록','/5-2'),
    getItem('사원 정보 관리','/5-3')
  ]),
  getItem('안전 관리','/safety',<WarningOutlined />) 
];
const LayoutPresent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['/home']} onClick={({key})=>navigate(key)} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutPresent;