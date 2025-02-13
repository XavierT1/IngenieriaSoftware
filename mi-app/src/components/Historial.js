import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Historial = () => {
    const [historial, setHistorial] = useState([]); // Estado para almacenar el historial
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    // Función para obtener el historial desde el backend
    const fetchHistorial = async () => {
        try {
            const response = await axios.get('http://localhost:8080/history/all');
            setHistorial(response.data); // Guardar los datos en el estado
            setLoading(false); // Indicar que la carga ha terminado
        } catch (err) {
            setError(err.message); // Guardar el mensaje de error
            setLoading(false); // Indicar que la carga ha terminado
        }
    };

    // Llamar a la función al cargar el componente
    useEffect(() => {
        fetchHistorial();
    }, []);

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <div>Cargando historial...</div>;
    }

    // Mostrar un mensaje de error si algo sale mal
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Renderizar la lista de historial
    return (
        <div>
            <h1>Historial de Usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario ID</th>
                        <th>Fecha y Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.userId}</td>
                            <td>{item.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Historial;