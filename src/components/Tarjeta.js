import React from 'react';
import { Card } from 'antd';

const Tarjeta = ({ imagen, nombre, genero, plataforma, clasificacion, precio }) => {
    return (
        <Card
            hoverable
            style={{ width: 260, border:'1px', borderColor:'#e3e5e6', borderStyle:'solid'}}
            cover={<img alt={nombre} src={imagen} style={{ height: '300px', objectFit: 'cover' }} />}
        >
            <div className='divLabelTarjeta'>
                <p className='labelTarjetaNombre'>{nombre}</p>
                <p className='labelTarjetaGenero'>Genero: {genero}</p>
                <p className='labelTarjeta'>Plataforma: {plataforma}</p>
                <p className='labelTarjeta'>Clasificación: {clasificacion}</p>
                <p className='labelTarjeta'>Precio: ${precio} MX</p>
            </div>
        </Card>
    );
};

export default Tarjeta;
