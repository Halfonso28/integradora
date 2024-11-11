import React from 'react';
import { useAxios } from '../hooks/useAxios';
import { Flex } from 'antd';
import Tarjeta from '../components/Tarjeta';

const Licencias = () => {
    const { data, status, error} = useAxios("http://localhost:8080/licencia/getAll", "get");
    return (
        <>
            {error && (
                <p style={{ color: 'red' }}>
                    Error {status}: {error.message ? error.message : error}
                </p>
            )}

            {status === 200 && data && (
                <Flex wrap gap="large" justify='center'>
                    {data.map(item => (
                        <Tarjeta
                            imagen={item.urlImagen}
                            nombre={item.nombre}
                            genero={item.genero}
                            plataforma={item.plataforma}
                            clasificacion={item.clasificacion}
                            precio={item.precio}
                        />
                    ))}
                </Flex>
            )}

            {status === 404 && (
                <p>Sin Licencias</p>
            )}

            {status === 400 && (
                <p>Acción no válida o parámetros faltantes.</p>
            )}

            {status === 405 && (
                <p>Método no permitido.</p>
            )}

            {!data && !error && (
                <p>Cargando...</p>
            )}
        </>
    );
}

export default Licencias;