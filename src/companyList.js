import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Asegúrate de importar los estilos

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [logo, setLogo] = useState('');
    const [adminId, setAdminId] = useState('');
    const [currentCompanyId, setCurrentCompanyId] = useState(null);
    const [users, setUsers] = useState([]);

    // Leer empresas
    useEffect(() => {
        const fetchCompanies = async () => {
            const response = await axios.get('http://localhost:5000/companies');
            setCompanies(response.data);
        };

        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        };

        fetchCompanies();
        fetchUsers();
    }, []);

    // Crear o actualizar empresa
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentCompanyId) {
            await axios.put(`http://localhost:5000/companies/${currentCompanyId}`, { name, address, logo, adminId });
        } else {
            await axios.post('http://localhost:5000/companies', { name, address, logo, adminId });
        }
        setName('');
        setAddress('');
        setLogo('');
        setAdminId('');
        setCurrentCompanyId(null);
        const response = await axios.get('http://localhost:5000/companies');
        setCompanies(response.data);
    };

    // Eliminar empresa
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/companies/${id}`);
        setCompanies(companies.filter(company => company._id !== id));
    };

    // Editar empresa
    const handleEdit = (company) => {
        setName(company.name);
        setAddress(company.address);
        setLogo(company.logo);
        setAdminId(company.adminId);
        setCurrentCompanyId(company._id);
    };

    return (
        <div className="container">
            <h1>Lista de Empresas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Dirección"
                    required
                />
                <input
                    type="text"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="Logotipo (URL)"
                    required
                />
                <select value={adminId} onChange={(e) => setAdminId(e.target.value)} required>
                    <option value="">Seleccionar Administrador</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                </select>
                <button type="submit">{currentCompanyId ? 'Actualizar' : 'Crear'}</button>
            </form>
            <ul>
                {companies.map(company => (
                    <li key={company._id}>
                        <h2>{company.name}</h2>
                        <p>{company.address}</p>
                        <p>{company.logo}</p>
                        <p>Administrador: {company.adminId}</p>
                        <button onClick={() => handleEdit(company)}>Editar</button>
                        <button onClick={() => handleDelete(company._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;
