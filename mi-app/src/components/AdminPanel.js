import React, { useState } from 'react';
import { addUser, getUsers, deleteUser, uploadUserImage } from '../services/api';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [userIdForImage, setUserIdForImage] = useState('');
    const [image, setImage] = useState(null);

    // Obtener la lista de usuarios al cargar el componente
    React.useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const users = await getUsers();
        setUsers(users);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        await addUser(newUser);
        setNewUser({ name: '', email: '' }); // Limpiar el formulario
        fetchUsers(); // Actualizar la lista de usuarios
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        fetchUsers(); // Actualizar la lista de usuarios
    };

    const handleUploadImage = async (e) => {
        e.preventDefault();
        await uploadUserImage(userIdForImage, image);
        setUserIdForImage('');
        setImage(null);
    };

    return (
        <div>
            <h2>Panel de Administración</h2>

            {/* Formulario para crear usuario */}
            <form onSubmit={handleAddUser}>
                <h3>Crear Usuario</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <button type="submit">Crear Usuario</button>
            </form>

            {/* Lista de usuarios */}
            <div>
                <h3>Lista de Usuarios</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Formulario para subir imagen */}
            <form onSubmit={handleUploadImage}>
                <h3>Subir Foto de Usuario</h3>
                <input
                    type="text"
                    placeholder="ID del Usuario"
                    value={userIdForImage}
                    onChange={(e) => setUserIdForImage(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Subir Imagen</button>
            </form>
        </div>
    );
};

export default AdminPanel;