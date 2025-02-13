import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css'; // Importar FontAwesome

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      onLogin(username, true); // Pasa true para indicar que es admin
    } else if (username !== '' && password !== '') {
      onLogin(username, false); // Pasa false para un usuario normal
    } else {
      setError('Por favor ingrese las credenciales.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterna entre mostrar y ocultar la contraseña
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Contraseña</label>
          <div className="password-container" style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'} // Si showPassword es true, muestra el texto, si es false, oculta la contraseña
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: '40px' }} // Añadimos espacio a la derecha para el icono
            />
            <i
              className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} // Icono de ojo para mostrar/ocultar
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px', // Alinea el icono en el extremo derecho del input
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            ></i>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
