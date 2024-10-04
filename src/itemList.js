import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Asegúrate de importar los estilos

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    // Leer usuarios
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    // Crear o actualizar usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentUserId) {
            await axios.put(`http://localhost:5000/users/${currentUserId}`, { name, email, password, company, role });
        } else {
            await axios.post('http://localhost:5000/users', { name, email, password, company, role });
        }
        setName('');
        setEmail('');
        setPassword('');
        setCompany('');
        setRole('');
        setCurrentUserId(null);
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    };

    // Eliminar usuario
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
    };

    // Editar usuario
    const handleEdit = (user) => {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password); // Dependiendo de cómo manejes las contraseñas, tal vez no quieras mostrar esto
        setCompany(user.company);
        setRole(user.role);
        setCurrentUserId(user._id);
    };

    return (
        <div className="container"> {/* Agregamos la clase container */}
            <h1>Lista de Usuarios</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo Electrónico"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Empresa"
                    required
                />
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Rol"
                    required
                />
                <button type="submit">{currentUserId ? 'Actualizar' : 'Crear'}</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.company}</p>
                        <p>{user.role}</p>
                        <button onClick={() => handleEdit(user)}>Editar</button>
                        <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
