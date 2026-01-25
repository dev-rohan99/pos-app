import { Layout, Menu, Button } from 'antd';
import { ShoppingOutlined, DollarOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: 'Products',
      onClick: () => navigate('/products'),
    },
    {
      key: '/sales',
      icon: <DollarOutlined />,
      label: 'Sales',
      onClick: () => navigate('/sales'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="text-white text-xl font-bold p-4 text-center">
          POS System
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-6 flex justify-between items-center">
          <div className="text-lg font-semibold">
            {location.pathname === '/products' && 'Product Management'}
            {location.pathname === '/sales' && 'Sales'}
          </div>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content className="m-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
