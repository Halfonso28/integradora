import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAxios(url, method = 'get', params = null, dependencies = []) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const config = {
                    method,
                    url,
                    ...(method.toLowerCase() !== 'get' && params && { data: params }),
                    ...(method.toLowerCase() === 'get' && params && { params }),
                };

                const response = await axios(config);
                setStatus(response.status);
                setData(response.data);
                setError(null);
            } catch (err) {
                if (err.response) {
                    setStatus(err.response.status);
                    setError(err.response.data || 'Error en la solicitud');
                } else {
                    setStatus(null);
                    setError('Error al conectar con el servidor');
                }
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }
    }, [url, method, ...dependencies]);

    return { data, status, error, loading };
}
