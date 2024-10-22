import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Historial = () => {
  const [rol, setRol] = useState('usuario');
  const [usuario, setUsuario] = useState('Lael28');
  const [tickets, setTickets] = useState([]);
  const [estado, setEstado] = useState('Nuevo');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    // Simulación de obtener el rol y usuario desde la sesión
    // setRol(sessionStorage.getItem('rol'));
    // setUsuario(JSON.parse(sessionStorage.getItem('usuario')));
    fetchTickets();
  }, [estado, fechaInicio, fechaFin]);

  
  const fetchTickets = async () => {
    try {
      const response = await axios.get('https://localhost:3000/API/tickets?accion=obtenerTicketsPorUsuario&&id_usuario=1');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleEstadoChange = (e) => setEstado(e.target.value);
  const handleFechaInicioChange = (e) => setFechaInicio(e.target.value);
  const handleFechaFinChange = (e) => setFechaFin(e.target.value);

  const renderAcciones = (ticket) => {
    if (ticket.estado === 'Finalizado' && !ticket.estado_encuesta) {
      return <button className="btn btn-success"><a href={`encuesta.php?ticket_id=${ticket.id}`}>Encuesta</a></button>;
    } else if (ticket.estado === 'En progreso') {
      return <button className="btn btn-primary"><a href={`respuesta_ticket.php?ticket_id=${ticket.id}`}>Responder</a></button>;
    }
    return null;
  };

  const renderTable = () => (
    <table className="table table-striped mb-5">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Descripcion</th>
          <th>Estado</th>
          <th>Fecha Creación</th>
          <th>Fecha Fin</th>
          {estado !== 'Finalizado' && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <tr key={ticket.id}>
            <td>{usuario}</td>
            <td>{ticket.descripcion}</td>
            <td>{ticket.estado}</td>
            <td>{new Date(ticket.fecha_creacion).toLocaleDateString()}</td>
            <td>{ticket.fecha_cierre !== "1970-01-01" ? new Date(ticket.fecha_cierre).toLocaleDateString() : "Sin Fecha"}</td>
            {estado !== 'Finalizado' && <td>{renderAcciones(ticket)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderForm = () => (
    <form>
      <select name="estado" value={estado} onChange={handleEstadoChange}>
        <option value="Nuevo">Nuevo</option>
        <option value="En progreso">En progreso</option>
        <option value="Finalizado">Finalizado</option>
      </select>
      <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} placeholder="Fecha inicio" />
      <input type="date" value={fechaFin} onChange={handleFechaFinChange} placeholder="Fecha fin" />
      <button type="button" className="btn btn-primary" onClick={fetchTickets}>Filtrar</button>
    </form>
  );

  return (
    <div>
      <main>
        {rol === 'usuario' && renderForm()}
        {renderTable()}
      </main>
    </div>
  );
};

export default Historial;
