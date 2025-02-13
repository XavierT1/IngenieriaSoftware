import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel'; // Panel de administración
import Usuario from './components/Usuario'; // Panel de usuario normal

function App() {
  const [user, setUser] = useState(null); // Estado para almacenar usuario
  const [isAdmin, setIsAdmin] = useState(false); // Estado para determinar si es admin

  // Función que se pasa al Login para manejar el login
  const handleLogin = (username, isAdmin) => {
    setUser(username); // Guarda el nombre de usuario
    setIsAdmin(isAdmin); // Define si es admin
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setUser(null); // Resetea el estado de usuario
    setIsAdmin(false); // Resetea el estado de admin
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} /> // Si no hay usuario, mostramos Login
      ) : isAdmin ? (
        <AdminPanel onLogout={handleLogout} /> // Si es admin, mostramos AdminPanel
      ) : (
        <Usuario username={user} onLogout={handleLogout} /> // Si es un usuario normal, mostramos Usuario
      )}
    </div>
  );
}

export default App;
