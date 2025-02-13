import React, { useState } from 'react';
import axios from 'axios';  // Para hacer solicitudes HTTP

const Usuario = ({ username, onLogout }) => {
  const [faceIdValidated, setFaceIdValidated] = useState(false);
  const [image, setImage] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  // Simula la validación de Face ID con un servicio como Face++ o similares
  const handleFaceIdValidation = async () => {
    if (!image) {
      setValidationMessage('Por favor, sube una foto antes de validar.');
      return;
    }

    try {
      // Enviar la imagen a un servicio de reconocimiento facial (ejemplo con Face++)
      const formData = new FormData();
      formData.append('image_file', image); // Adjuntar la imagen

      // Aquí deberías reemplazar con la URL de la API y la clave de la API de Face++
      const response = await axios.post(
        'https://api-us.faceplusplus.com/facepp/v3/detect',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'apikey': 'TU_API_KEY',  // Usa tu clave de API de Face++
          },
        }
      );

      if (response.data.faces.length > 0) {
        setFaceIdValidated(true);
        setValidationMessage('¡Face ID Validado correctamente!');
      } else {
        setFaceIdValidated(false);
        setValidationMessage('No se detectó una cara en la imagen.');
      }
    } catch (error) {
      setValidationMessage('Error al validar la imagen. Intenta de nuevo.');
    }
  };

  // Permite al usuario cargar una foto
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Establece la imagen cargada
    setFaceIdValidated(false); // Resetea la validación de Face ID
    setValidationMessage(''); // Resetea el mensaje de validación
  };

  return (
    <div className="usuario-page">
      {/* Botón de cerrar sesión fuera del panel */}
      <button className="logout-button" onClick={onLogout}>
        Cerrar sesión
      </button>

      {/* Panel de usuario */}
      <div className="usuario-container">
        <h2>Bienvenido, {username}</h2>

        <div className="usuario-info">
          {/* Foto de usuario */}
          <div className="user-photo">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Foto de usuario" width="150" height="150" style={{ borderRadius: '50%' }} />
            ) : (
              <p>No se ha cargado una foto</p>
            )}
          </div>

          {/* Validación de Face ID */}
          <div className="face-id-validation">
            <button onClick={handleFaceIdValidation}>Validar Face ID</button>
            {validationMessage && <p>{validationMessage}</p>}
          </div>
        </div>

        {/* Permite subir una nueva foto */}
        <div className="upload-photo">
          <input type="file" onChange={handleImageChange} />
        </div>
      </div>

      <style jsx>{`
        /* Contenedor de la página completa */
        .usuario-page {
          position: relative;
        }

        /* Estilos del botón de cerrar sesión fuera del panel */
        .logout-button {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #dc3545;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .logout-button:hover {
          background-color: #c82333;
        }

        /* Estilos del panel de usuario */
        .usuario-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .usuario-info {
          margin-bottom: 20px;
        }

        .user-photo {
          margin-bottom: 20px;
        }

        .face-id-validation {
          margin-bottom: 20px;
        }

        .upload-photo {
          margin-top: 20px;
        }

        button {
          padding: 10px;
          background-color: #61dafb;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #21a1f1;
        }
      `}</style>
    </div>
  );
};

export default Usuario;
