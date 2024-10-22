import React from 'react';
import { useAxios } from './hook/useAxios';


const App = () => {
  const data  = useAxios(["http://localhost/integradora/src/api/usuario.php"], {
    params: {
      accion:"obtenerUsuarioPorId",
      id:1
    }
  }, "get");
  const pacientes = data?.data;
  return (
    <div className="App">
      <h1>Fetch like a Pro</h1>
      <p>{data?.status}</p>
      <ul className="card">
        {
          pacientes?.map((item) => (
          <li key={item.id}>{item.usuario}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;