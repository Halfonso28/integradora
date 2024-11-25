import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from 'react-router-dom';

const Autenticador = () => {
    const navigate = useNavigate();
    const usuario = sessionStorage.getItem('usuario');
    const contraseña = sessionStorage.getItem('contraseña');
    
    const { data, status, error } = useAxios({
        url: "http://localhost:8080/usuario/login",
        method: "post",
        params: {
            usuario: usuario,
            contraseña: contraseña
        }
    });

    if(status === 200 && data) {
        sessionStorage.setItem('userData', JSON.stringify(data));
        navigate("/dashboard");
    } else {
        navigate("/login");
    }
}

export default Autenticador;
