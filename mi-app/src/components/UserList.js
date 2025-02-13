import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const users = await getUsers();
        setUsers(users);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers(); // Refrescar la lista después de eliminar
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;