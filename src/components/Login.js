import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el envío de formulario por defecto
    try {
      const response = await axios.post('http://localhost:8080/usuario/login','post', {
        usuario: username,
        contraseña: password,
      });

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso:', response.data);
        // Aquí puedes almacenar el token o redirigir al usuario
      }
    } catch (err) {
      setError('Error de inicio de sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
