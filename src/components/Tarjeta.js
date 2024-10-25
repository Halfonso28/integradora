import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const Tarjeta = ({ imagen, nombre, genero, plataforma, clasificacion, precio }) => {
    return (
        <Card
            hoverable
            style={{ width: 260 }}
            cover={<img alt={nombre} src={imagen} style={{ height: '300px', objectFit: 'cover' }}/>}
        >
            <Meta title={nombre} description={`Género: ${genero}`} />
            <div style={{  }}>
                <p style={{
                    margin:0
                }}>Plataforma: {plataforma}</p>
                <p 
                style={{
                    margin:0
                }}
                >Clasificación: {clasificacion}</p>
                <p
                style={{
                    margin:0
                }}  
                >Precio: ${precio}MX</p>
            </div>
        </Card>
    );
};

export default Tarjeta;
