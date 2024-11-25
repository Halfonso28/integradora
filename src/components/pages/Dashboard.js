import React, { useState } from 'react';
import { Button, Layout, Menu, theme, Image, Flex, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
const Dashboard = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



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
          defaultSelectedKeys={[props.selectKey]}
          items={props.items}
          onSelect={props.onMenuSelect}
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
              <p className='nameUser'>{props.nameUser}</p>
              <Avatar
                size={50}
                icon={<UserOutlined />}
                src="IMG/logo.png"
                style={{
                  marginTop: 6,
                  marginRight: 20
                }}
              />
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
          {props.contenido}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;