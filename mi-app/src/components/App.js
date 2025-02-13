import React from 'react';
import './App.css';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel'; // Importa el nuevo componente

function App() {
    return (
        <div className="App">
            <Login /> {/* Panel de inicio de sesión existente */}
            <hr /> 
            <AdminPanel /> {/* Nuevo panel de administración */}
        </div>
    );
}

export default App;