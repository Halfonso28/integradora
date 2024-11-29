import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

// Componentes Propios
import Dashboard from './components/pages/Dashboard';
import Inicio from './components/pages/Inicio';
import Login from './components/pages/Login';
import Autenticador from './components/session/Autenticador';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={<Inicio />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/autenticar"
          element={<Autenticador />}
        />
        <Route
          path="/dashboard/*"
          element={<Dashboard />}
        />
        <Route
          path="*"
          element={<div>ERROR 404</div>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
