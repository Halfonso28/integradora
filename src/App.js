import React, { useState, useEffect } from 'react';
import { useAxios } from './hooks/useAxios';
import { Flex } from 'antd';
import Dashboard from './components/Dashboard';
import Tarjeta from './components/Tarjeta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AuditOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import {
  faHouse,
  faPlus,
  faBars,
  faGamepad
} from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const { data, status, error } = useAxios(["http://localhost/integradora/src/api/usuario.php"], {
    params: {
      accion: "obtenerUsuarioPorId",
      id: 2
    }
  }, "get");

  const [items, setItems] = useState([]);
  const [contenido, setContenido] = useState(<div>Inicio</div>);

  useEffect(() => {
    setItems([
      {
        key: '1',
        icon: <FontAwesomeIcon icon={faHouse} />,
        label: 'Inicio',
      },
      {
        key: '2',
        icon: <FontAwesomeIcon icon={faGamepad} />,
        label: 'Licencias'
      },
      {
        key: '3',
        icon: <AuditOutlined />,
        label: 'Tickets',
        children: [
          {
            key: "4",
            icon: <FontAwesomeIcon icon={faPlus} />,
            label: "Crear"
          },
          {
            key: "5",
            icon: <FontAwesomeIcon icon={faBars} />,
            label: "Historial"
          }
        ]
      },
      {
        key: '6',
        icon: <PieChartOutlined />,
        label: 'Graficas',
      }
    ])
  }, []);

  // const hola=()=>{
  //   return (
  //     <div>Hola</div>
  //   )
  // }

  const onMenuSelect = ({ key }) => {
    switch (key) {
      case '1':
        setContenido(
          <Flex wrap gap="large" justify='center'>
            <Tarjeta
              imagen="img/hola.webp"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="18"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
            <Tarjeta
              imagen="img/hola.jpg"
              nombre="Minecraft"
              genero="RPG"
              plataforma="PC"
              clasificacion="+18"
              precio="$18MX"
            />
          </Flex>
        );
        break;
      case '2':
        setContenido(
          <div>
            <h1>Detalles del Usuario</h1>

            {/* Verificar si hay un estado de error */}
            {error && (
              <p style={{ color: 'red' }}>
                Error {status}: {error.message ? error.message : error}
              </p>
            )}

            {/* Verificar si el estado es exitoso (200) */}
            {status === 200 && data && (
              <div>
                {/* {data.map(item => (
                  <p key={item.id}>{item.title}</p>
                ))} */}
                <p>Usuario encontrado con éxito</p>
                <p>ID: {data.id}</p>
                <p>Nombre: {data.contraseña}</p>
                {/* Muestra más datos del usuario según sea necesario */}
              </div>
            )}

            {/* Mostrar mensaje personalizado si no se encuentra el usuario */}
            {status === 404 && (
              <p>El usuario no fue encontrado.</p>
            )}

            {/* Mostrar mensaje si hay problemas con la solicitud */}
            {status === 400 && (
              <p>Acción no válida o parámetros faltantes.</p>
            )}

            {status === 405 && (
              <p>Método no permitido.</p>
            )}

            {/* Muestra un mensaje de carga si no hay error o éxito aún */}
            {!data && !error && (
              <p>Cargando...</p>
            )}
          </div>
        );
        break;
      case '4':
        setContenido(<div>Formulario para crear tickets</div>);
        break;
      case '5':
        setContenido(<div>Historial de tickets</div>);
        break;
      default:
        setContenido(<div>Graficas</div>);
    }
  };

  return (
    <div className='app'>
      <Dashboard
        contenido={contenido}
        selectKey="1"
        items={items}
        onMenuSelect={onMenuSelect}
      ></Dashboard>
    </div>
  );
};
export default App;