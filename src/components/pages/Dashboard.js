import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, theme, Image, Flex, Avatar, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  AuditOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faGamepad,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';


// Componentes propios
import Licencias from '../Licencias';
import Tickets from '../Tickets';
import Compras from '../Compras';

const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  // Hooks
  const navigate = useNavigate();

  const menuItemsUsuario = [
    { key: '1', icon: <FontAwesomeIcon icon={faHouse} />, label: 'Inicio' },
    { key: '2', icon: <FontAwesomeIcon icon={faGamepad} />, label: 'Licencias' },
    { key: '3', icon: <FontAwesomeIcon icon={faCartShopping} />, label: 'Compras' },
    { key: '4', icon: <AuditOutlined />, label: 'Tickets' },
    { key: '5', icon: <PieChartOutlined />, label: 'Gráficas' }
  ];
  
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")));
  const [contenido, setContenido] = useState(<div>Inicio</div>);
  const [menuItems, setMenuItems] = useState();

  const onMenuSelect = ({ key }) => {
    switch (key) {
      case '1':
        setContenido(<Flex wrap gap="large" justify="center"><div>Inicio</div></Flex>);
        break;
      case '2':
        setContenido(<Licencias id={userData.id}/>); 
        break;
      case '3':
        setContenido(<Compras id={userData.id} />);
        break;
      case '4':
        setContenido(<Tickets id={userData.id} />);
        break;
      default:
        setContenido(<div>Gráficas</div>);
    }
  };

  useEffect(() => {
    if (userData.rol === "usuario") {
      setMenuItems(menuItemsUsuario);
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logout=()=>{
    sessionStorage.clear();
    sessionStorage.removeItem('userData');
    setUserData(null);
    navigate("/");
  }

  // Menú desplegable del avatar
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        Mi perfil
      </Menu.Item>
      <Menu.Item key="settings">
        Configuración
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Flex justify={'center'} align={'center'} style={{ margin: 10 }}>
          <Image
            width={150}
            src="IMG/logo.png"
            preview={false}
          />
        </Flex>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={'1'}
          items={menuItems}
          onSelect={onMenuSelect}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Flex justify={'space-between'}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
            <p className='titulo'>JUEGOSX</p>
            <Flex>
              <p className='nameUser'>{userData.usuario}</p>
              {/* Avatar con menú desplegable */}
              <Dropdown overlay={userMenu} trigger={['click']}>
                <Avatar
                  size={50}
                  icon={<UserOutlined />}
                  src="IMG/logo.png"
                  style={{
                    marginTop: 6,
                    marginRight: 20,
                    cursor: 'pointer',  // Indica que es clickeable
                  }}
                />
              </Dropdown>
            </Flex>
          </Flex>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {contenido}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
