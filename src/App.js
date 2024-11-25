import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { Flex } from 'antd';
import Dashboard from './components/pages/Dashboard';
import Inicio from './components/pages/Inicio';
import Licencias from './components/Licencias';
import Tickets from './components/Tickets';
import Login from './components/pages/Login';
import Compras from './components/Compras';
// import PrivateRoute from './components/session/PrivateRoute';
// import { AuthProvider } from './components/session/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AuditOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import {
  faHouse,
  faGamepad,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons';
import Autenticador from './components/session/Autenticador';


const App = () => {
  const [items, setItems] = useState([]);
  const [contenido, setContenido] = useState(<div>Inicio</div>);
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    const menuItemsUsuario = [
      { key: '1', icon: <FontAwesomeIcon icon={faHouse} />, label: 'Inicio' },
      { key: '2', icon: <FontAwesomeIcon icon={faGamepad} />, label: 'Licencias' },
      { key: '3', icon: <FontAwesomeIcon icon={faCartShopping} />, label: 'Compras' },
      { key: '4', icon: <AuditOutlined />, label: 'Tickets' },
      { key: '5', icon: <PieChartOutlined />, label: 'Gráficas' }
    ];
    if (userData.rol == "usuario") {
      setItems(menuItemsUsuario);
    }


  }, []);

  const onMenuSelect = ({ key }) => {
    switch (key) {
      case '1':
        setContenido(
          <Flex wrap gap="large" justify='center'>
          </Flex>
        );
        break;
      case '2':
        setContenido(
          <Licencias />
        );
        break;
      case '3':
        setContenido(<Compras id={userData.id} />);
        break;
      case '4':
        setContenido(<Tickets id={userData.id} />);
        break;
      default:
        setContenido(<div>Graficas</div>);
    }
  };

  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <Inicio></Inicio>
          }
        />
        <Route
          path="/login"
          element={
            <Login></Login>
          }
        />
        <Route
          path="/autenticar"
          element={
            <Autenticador />
          }
        />


        {/* <Route element={<PrivateRoute />}> */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              contenido={contenido}
              selectKey="1"
              items={items}
              onMenuSelect={onMenuSelect}
              nameUser={userData.usuario}
            />
          }
        >
        </Route>
        <Route
          path='*'
          element={<div>ERORR 404</div>}
        />

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
};
export default App;