import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Checa si el token existe en sessionStorage al cargar la app
    return sessionStorage.getItem('token') !== null;
  });

  const login = (token) => {
    sessionStorage.setItem('token', token); // Almacena el token
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('token'); // Elimina el token de sessionStorage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
