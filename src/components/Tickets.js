import React, { useState, useEffect } from 'react';
import { Table, Button, DatePicker, Space, Select } from 'antd';
import { useAxios } from '../hooks/useAxios';

const Tickets = ({ id }) => {
    const { Column } = Table;
    const { data, status, error } = useAxios({
        url: "http://localhost:8080/ticket/getByUser/" + id,
        method: "get"
    });

    const [filteredData, setFilteredData] = useState([]); // Estado para los tickets filtrados
    const { Option } = Select;

    // Inicializar filteredData con todos los tickets cuando se obtienen
    useEffect(() => {
        if (data) {
            setFilteredData(data);  // Inicializa con todos los datos al cargar
        }
    }, [data]);

    // Filtro por Estado
    const handleStateFilter = (value) => {
        let filtered = data;

        if (value && value !== 'all') {
            filtered = data.filter(ticket => ticket.estado === value);
        }

        setFilteredData(filtered);  // Establece los tickets filtrados
    };

    // Filtro por Fecha
    const handleDateFilter = (date, dateString) => {
        let filtered = data;

        if (dateString) {
            filtered = data.filter(ticket => ticket.fechaCreacion.startsWith(dateString));
        }

        setFilteredData(filtered);
    };

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Select
                    defaultValue="all"
                    style={{ width: 120 }}
                    onChange={handleStateFilter}
                >
                    <Option value="all">Todos</Option>
                    <Option value="Nuevo">Nuevo</Option>
                    <Option value="En progreso">En progreso</Option>
                    <Option value="Finalizado">Finalizado</Option>
                </Select>
                <DatePicker
                    style={{ width: 150 }}
                    onChange={handleDateFilter}
                    format="YYYY-MM-DD"
                    placeholder="Filtrar por fecha"
                />
            </Space>

            <Table dataSource={filteredData} rowKey="id" pagination={{ pageSize: 5 }}>
                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Id Compra" dataIndex="idCompra" key="idCompra" />
                <Column title="Id Soporte" dataIndex="idSoporte" key="idSoporte" />
                <Column title="Descripcion" dataIndex="descripcion" key="descripcion" />
                <Column title="Fecha de Creacion" dataIndex="fechaCreacion" key="fechaCreacion" />
                <Column title="Fecha de Cierre" dataIndex="fechaCierre" key="fechaCierre" />
                <Column title="Estado" dataIndex="estado" key="estado" />
                <Column
                    title="Acciones"
                    key="action"
                    render={(_, record) => (
                        <>
                            {record.estado === 'En progreso' && (
                                <Button
                                    type="primary"
                                    onClick={() => console.log('Abrir modal para:', record.id)}
                                    style={{ marginRight: '8px' }}
                                >
                                    Responder
                                </Button>
                            )}
                        </>
                    )}
                />
            </Table>
        </>
    );
};

export default Tickets;
