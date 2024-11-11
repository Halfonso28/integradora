import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Flex } from 'antd';
import Dashboard from './components/Dashboard';
import Inicio from './components/Inicio';
import Licencias from './components/Licencias';
import Tickets from './components/Tickets';
import Login from './components/Login';
import PrivateRoute from './components/session/PrivateRoute';
import { AuthProvider } from './components/session/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AuditOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import {
  faHouse,
  faGamepad
} from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [items, setItems] = useState([]);
  const [contenido, setContenido] = useState(<div>Inicio</div>);

  useEffect(() => {
    const menuItems = [
      { key: '1', icon: <FontAwesomeIcon icon={faHouse} />, label: 'Inicio' },
      { key: '2', icon: <FontAwesomeIcon icon={faGamepad} />, label: 'Licencias' },
      { key: '3', icon: <AuditOutlined />, label: 'Tickets' },
      { key: '4', icon: <PieChartOutlined />, label: 'Gráficas' }
    ];
    setItems(menuItems);
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
        setContenido(<Tickets id={1} />);
        break;
      default:
        setContenido(<div>Graficas</div>);
    }
  };

  return (
    <AuthProvider>
      <Router>
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
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={
              <Dashboard
                contenido={contenido}
                selectKey="1"
                items={items}
                onMenuSelect={onMenuSelect}
                nameUser='Lael28'
              ></Dashboard>}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;