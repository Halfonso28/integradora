import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook personalizado para realizar llamadas a API utilizando Axios.
 * 
 * @param {String} url - La URL de la API a la que se va a realizar la solicitud.
 * @param {Object} params - Parámetros opcionales para la solicitud, como datos de consulta o cuerpo de la solicitud.
 * @param {String} method - El método HTTP que se usará para la solicitud (por ejemplo, 'get', 'post', 'put', 'delete').
 * @returns {Object} - Devuelve un objeto con `data`, `status` y `error` obtenidos de la solicitud a la API.
 * 
 * Ejemplo de uso:
 * const { data, status, error } = useAxios("http://localhost/apirest/pacientes", {
 *   params: {
 *     page: 1
 *   }
 * }, "get");
 */
export function useAxios(url, params, method) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios[method](url, params);
                setStatus(response.status);
                setData(response.data);
            } catch (err) {
                if (err.response) {
                    setStatus(err.response.status); // Establecer el estado HTTP si hay respuesta de error
                    setError(err.response.data);    // Almacenar el mensaje de error del servidor
                } else {
                    setError('Error al conectar con el servidor'); // Error de conexión
                }
            }
        };
        if (url && method) {
            getData();  // Solo ejecuta la solicitud si la URL y el método están definidos
        }
    }, []); // Dependencias actualizadas: el efecto se ejecutará si cambian estos valores

    return { data, status, error }; // Devuelve la data, status y error al componente que lo consume
}
