import React, { useState } from 'react';
import { addUser } from '../services/api';

const UserForm = () => {
    const [user, setUser] = useState({ name: '', email: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUser(user);
        setUser({ name: '', email: '' }); // Limpiar el formulario
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default UserForm;