import React, { useState, useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';
import { Flex, Space, Table, Tag } from 'antd';

const Compras = ({ id }) => {
    const { data, status, error } = useAxios({
        url: "http://localhost:8080/compra/getByUser/" + id,
        method: "get"
    });

    // function getLicencia (idLicencia) {
    //     const { data: licenciaData, status: licenciaStatus, error: LicenciaError } = useAxios({
    //         url: "http://localhost:8080/Licencia/getById/" + idLicencia,
    //         method: "get"
    //     });
    // }


    const { Column, ColumnGroup } = Table;

    return (
        <>
            {error && (
                <p style={{ color: 'red' }}>
                    Error {status}: {error.message ? error.message : error}
                </p>
            )}

            {status === 200 && data && (
                <Flex wrap gap="large" justify="center">
                    <Table dataSource={data}>
                        {/* <ColumnGroup title="Id">
                            <Column title="First Name" dataIndex="firstName" key="firstName" />
                            <Column title="Last Name" dataIndex="lastName" key="lastName" />
                        </ColumnGroup> */}
                        <Column title="Id" dataIndex="id" key="age" />
                        <Column title="Fecha de Compra" dataIndex="fechaCompra" key="fechaCompra" />
                        <Column title="Codigo" dataIndex="codigo" key="codigo" />
                        <Column
                            title="Action"
                            key="action"
                            render={(_, record) => (
                                <Space size="middle">
                                    <a>Crear Ticket</a>
                                    <a>Ver mas</a>
                                </Space>
                            )}
                        />
                    </Table>
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

export default Compras;
