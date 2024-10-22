import { useState, useEffect } from 'react';
import axios from 'axios';

/** * 
Funcion para usar API
* @param {String} url - Url base de la API. 
* @param {Array} params - Lista de parametros para la solicitud a API. 
* @param {String} method - Metodo de llamada a la API. 
* @returns {Array} - Array que devuelve la respuesta{data} de la API. 
* 
*Ejemplo:
*const data  = useAxios(["http://localhost/apirest/pacientes"], {
*   params: {
*     page: 1
*   }
* }, "get");
*
*Ejemplo para convertir Array devuelto en Objeto:
*const pacientes = data?.data;
*/

export function useAxios(url, params, method) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const respuesta = await axios[method](url, params);
                console.log(respuesta.status)
                console.log(respuesta)
                setData(respuesta)
            } catch (error) {
                console.error('Error al obtener datos'.error)
            }
        }
        getData();
    }, []);

    return data;
}

