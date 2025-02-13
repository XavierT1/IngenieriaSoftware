import React, { useState } from 'react';
import { uploadUserImage } from '../services/api';

const UserImageUpload = () => {
    const [userId, setUserId] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadUserImage(userId, image);
        setUserId('');
        setImage(null);
    };

    return (
        <div>
            <h2>Subir Imagen de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID del Usuario"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
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

export default UserImageUpload;