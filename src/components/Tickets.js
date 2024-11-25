import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAxios } from '../hooks/useAxios';
import { Flex } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
const Tickets = ({ id }) => {
    const { data, status, error } = useAxios({
        url: "http://localhost:8080/ticket/getByUser/" + id,
        method: "get"
    });

    const { confirm } = Modal;
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <>
            <Flex>
                {error && (
                    <p style={{ color: 'red' }}>
                        Error {status}: {error.message ? error.message : error}
                    </p>
                )}

                {status === 200 && data && (
                    <>
                        {status === 200 && data && (
                            <Flex wrap gap="large" justify="center">
                                {data.map(item => (
                                    <div>{item.descripcion}</div>
                                ))}
                            </Flex>
                        )}
                    </>
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
            </Flex>
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
            <Button onClick={showDeleteConfirm} type="dashed">
                Delete
            </Button>
        </>
    );
}

export default Tickets;