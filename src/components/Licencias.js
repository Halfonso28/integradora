import React from 'react';
import { useAxios } from '../hooks/useAxios';
import { Flex } from 'antd';
import Tarjeta from '../components/Tarjeta';

const Licencias = ({id}) => {
    const { data, status, error } = useAxios({
        url: "http://localhost:8080/licencia/getAll",
        method: "get"
    });

    return (
        <>
            {error && (
                <p style={{ color: 'red' }}>
                    Error {status}: {error.message ? error.message : error}
                </p>
            )}

            {status === 200 && data && (
                <Flex wrap gap="large" justify="center">
                    {data.map(item => (
                        <Tarjeta
                            id={item.id}
                            idUser={id}
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
