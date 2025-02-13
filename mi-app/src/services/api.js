import axios from 'axios';

const API_URL = 'http://localhost:8080/admin'; // URL de los microservicios

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(`${API_URL}/add`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
};

export const uploadUserImage = async (userId, image) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('image', image);

    const response = await axios.post(`${API_URL}/upload-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};