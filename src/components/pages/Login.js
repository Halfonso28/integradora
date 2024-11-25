import React from 'react';
import { Button, Form, Input, Flex, Image } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    sessionStorage.setItem('usuario', values.usuario);
    sessionStorage.setItem('contraseña', values.contraseña);
    navigate("/autenticar");
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  

  return (
    <Flex justify='center' align='center' className='fondo'>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        className='formulario'
        onFinish={onFinish}
      >
        <Image
          className='logo'
          src="IMG/logo.png"
          preview={false}
        />
        <Form.Item
          name="usuario"
          rules={[
            {
              required: true,
              message: 'Ingresa tu nombre!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Usuario" className='input' />
        </Form.Item>
        <Form.Item
          name="contraseña"
          rules={[
            {
              required: true,
              message: 'Ingresa tu contraseña!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" className='input' />
        </Form.Item>


        <Form.Item>
          <Button block type="primary" htmlType="submit" className='boton'>
            Ingresar
          </Button>

        </Form.Item>
      </Form>
    </Flex>
  );
};
export default Login;

