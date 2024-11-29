import React, { useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import { Table, Modal, Button, message, Input } from 'antd';
import axios from 'axios';

const Compras = ({ id }) => {
    const { TextArea } = Input;
    const [showModal, setShowModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [currentIdCompra, setCurrentIdCompra] = useState(null);

    const { data, status, error } = useAxios({
        url: `http://localhost:8080/compra/getByUser/${id}`,
        method: 'get',
    });

    const { Column } = Table;

    const openModal = (idCompra) => {
        setCurrentIdCompra(idCompra);
        setShowModal(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        console.log(descripcion);
        try {
            const response = await axios.post(
                'http://localhost:8080/ticket/add',
                { idCompra: currentIdCompra, descripcion: "Usuario: " + descripcion },
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }
            );
            if (response.status === 201) {
                message.success('Ticket creado con éxito!');
            } else {
                message.error('Error al crear el ticket.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
            message.error('Error al procesar la solicitud.');
        } finally {
            setConfirmLoading(false);
            setShowModal(false);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setDescripcion('');
    };

    const onChange = (e) => {
        setDescripcion(e.target.value);
    };

    return (
        <>
            {error && (
                <p style={{ color: 'red' }}>
                    Error {status}: {error.message || error}
                </p>
            )}

            {status === 200 && data && (
                <>
                    <Table dataSource={data} rowKey="id" pagination={{ pageSize: 5 }}>
                        <Column title="Id" dataIndex="id" key="id" />
                        <Column title="Fecha de Compra" dataIndex="fechaCompra" key="fechaCompra" />
                        <Column title="Nombre" dataIndex="nombre" key="nombre" />
                        <Column title="Código" dataIndex="codigo" key="codigo" />
                        <Column title="Precio (MX)" dataIndex="precio" key="precio" />
                        <Column title="Plataforma" dataIndex="plataforma" key="plataforma" />
                        <Column
                            title="Acciones"
                            key="action"
                            render={(_, record) => (
                                <>
                                    <Button
                                        type="primary"
                                        onClick={() => openModal(record.id)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Crear Ticket
                                    </Button>
                                    <Button type="dashed">Ver Más</Button>
                                </>
                            )}
                        />
                    </Table>
                    <Modal
                        title={
                            <p style={{ fontSize: '22px', fontWeight: '600' }}>
                                Crear Ticket
                            </p>
                        }
                        open={showModal}
                        onOk={handleOk}
                        okText="Crear"
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <TextArea
                            placeholder="Descripción"
                            allowClear
                            value={descripcion}
                            onChange={onChange}
                        />
                    </Modal>
                </>
            )}

            {status === 404 && <p>No se encontraron licencias.</p>}

            {status === 400 && <p>Acción no válida o parámetros faltantes.</p>}

            {status === 405 && <p>Método no permitido.</p>}

            {!data && !error && <p>Cargando...</p>}
        </>
    );
};

export default Compras;
