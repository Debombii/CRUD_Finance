import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Asegúrate de importar los estilos

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState('');
    const [currentRoleId, setCurrentRoleId] = useState(null);

    // Leer roles y permisos
    useEffect(() => {
        const fetchRoles = async () => {
            const response = await axios.get('http://localhost:5000/roles');
            setRoles(response.data);
        };

        const fetchPermissions = async () => {
            const response = await axios.get('http://localhost:5000/permissions'); // Asegúrate de que esta ruta esté configurada en tu backend
            setPermissions(response.data);
        };

        fetchRoles();
        fetchPermissions();
    }, []);

    // Crear o actualizar rol
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentRoleId) {
            await axios.put(`http://localhost:5000/roles/${currentRoleId}`, { name, permission: selectedPermission });
        } else {
            await axios.post('http://localhost:5000/roles', { name, permission: selectedPermission });
        }
        setName('');
        setSelectedPermission('');
        setCurrentRoleId(null);
        const response = await axios.get('http://localhost:5000/roles');
        setRoles(response.data);
    };

    // Eliminar rol
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/roles/${id}`);
        setRoles(roles.filter(role => role._id !== id));
    };

    // Editar rol
    const handleEdit = (role) => {
        setName(role.name);
        setSelectedPermission(role.permission);
        setCurrentRoleId(role._id);
    };

    return (
        <div className="container">
            <h1>Lista de Roles</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <select value={selectedPermission} onChange={(e) => setSelectedPermission(e.target.value)} required>
                    <option value="">Seleccionar Permiso</option>
                    {permissions.map(permission => (
                        <option key={permission._id} value={permission._id}>{permission.name}</option>
                    ))}
                </select>
                <button type="submit">{currentRoleId ? 'Actualizar' : 'Crear'}</button>
            </form>
            <ul>
                {roles.map(role => (
                    <li key={role._id}>
                        <h2>{role.name}</h2>
                        <p>Permiso: {role.permission}</p>
                        <button onClick={() => handleEdit(role)}>Editar</button>
                        <button onClick={() => handleDelete(role._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleList;
