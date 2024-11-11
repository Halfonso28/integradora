import React from "react";
import { Button, Layout, Flex, Image, Checkbox, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faPlus,
  faUserAstronaut
} from '@fortawesome/free-solid-svg-icons';

const { Header, Footer, Content } = Layout;

const Inicio = () => {

  return (
    <Layout className="fondo">
      <Header className="header">
        <Flex justify="space-between" align="center">
          <Image
            width={50}
            src="IMG/logo.png"
          />
          <label className="labelHeader">GAMES X</label>
          <Flex gap={'middle'}>
            <Button type="primary" shape="round" icon={<FontAwesomeIcon icon={faUserAstronaut} />} size={'large'} href="./dashboard">Iniciar Sesión</Button>
            <Button type="primary" shape="round" icon={<FontAwesomeIcon icon={faPlus} />} size={'large'}>Registrarse</Button>
          </Flex>
        </Flex>
      </Header>
      <Content className="content">
        <Flex justify="flex-start" align="flex-end" className="contentFlex">
          <Flex vertical>
            <label className="labelJuegos labelContent">JUEGOS X</label>
            <label className="labelEslogan labelContent">Los mejores juegos al mejor precio.</label>
            <label className="labelDescripcion">Genera los reportes de tus compras aqui <FontAwesomeIcon icon={faArrowDown} /></label>
          </Flex>
        </Flex>
      </Content>
      <Footer className="footer"></Footer>
    </Layout>
  );
};

export default Inicio;
