import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAxios({ url, method, params = null }) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const config = method.toLowerCase() === 'get' ? { params } : params;
                const response = await axios[method](url, config);
                setStatus(response.status);
                setData(response.data);
            } catch (err) {
                if (err.response) {
                    setStatus(err.response.status);
                    setError(err.response.data);
                } else {
                    setError('Error al conectar con el servidor');
                }
            }
        };

        if (url && method) {
            getData();
        }
    }, []);

    return { data, status, error };
}
