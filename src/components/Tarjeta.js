import React, { useState } from 'react';
import { Card, Button, Modal, message } from 'antd';
import axios from 'axios';

const Tarjeta = ({ id, idUser, imagen, nombre, genero, plataforma, clasificacion, precio }) => {
    // Hooks
    const [showModal, setShowModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const openModal = () => {
        console.log('Datos enviados:', { idUsuario: idUser, idLicencia: id });
        setShowModal(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/compra/add',
                { idUsuario: idUser, idLicencia: id },
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }
            );
            if (response.status === 201) {
                message.success('Compra realizada con éxito');
            } else {
                message.error('Hubo un problema al realizar la compra');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
            message.error('Error al procesar la solicitud');
        } finally {
            setConfirmLoading(false);
            setShowModal(false);
        }
    };

    const handleCancel = () => {
        console.log('Compra cancelada');
        setShowModal(false);
    };

    return (
        <>
            <Card
                hoverable
                style={{
                    width: 260,
                    border: '1px solid #e3e5e6',
                }}
                cover={
                    <img
                        alt={nombre}
                        src={imagen}
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                }
            >
                <div className="divLabelTarjeta">
                    <p className="labelTarjetaNombre">{nombre}</p>
                    <p className="labelTarjetaGenero">Género: {genero}</p>
                    <p className="labelTarjeta">Plataforma: {plataforma}</p>
                    <p className="labelTarjeta">Clasificación: {clasificacion}</p>
                    <p className="labelTarjeta">Precio: ${precio} MX</p>
                    <Button type="primary" className="btnComprar" onClick={openModal}>
                        Comprar
                    </Button>
                </div>
            </Card>
            <Modal
                title={
                    <p style={{ fontSize: '22px', fontWeight: '600' }}>
                        ¿Está seguro que desea realizar esta compra?
                    </p>
                }
                open={showModal}
                onOk={handleOk}
                okText="Comprar"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>
                    <p className="labelTarjetaNombre">{nombre}</p>
                    <p className="labelTarjetaGenero">Género: {genero}</p>
                    <p className="labelTarjeta">Plataforma: {plataforma}</p>
                    <p className="labelTarjeta">Clasificación: {clasificacion}</p>
                    <p className="labelTarjeta">Precio: ${precio} MX</p>
                </div>
            </Modal>
        </>
    );
};

export default Tarjeta;
