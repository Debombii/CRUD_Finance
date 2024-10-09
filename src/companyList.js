import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [currentCompanyId, setCurrentCompanyId] = useState(null);

    // Leer empresas
    useEffect(() => {
        const fetchCompanies = async () => {
            const response = await axios.get('http://localhost:5000/companies');
            setCompanies(response.data);
        };

        fetchCompanies();
    }, []);

    // Crear o actualizar empresa
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentCompanyId) {
            // Actualizar empresa existente
            await axios.put(`http://localhost:5000/companies/${currentCompanyId}`, { name, address, image });
        } else {
            // Crear nueva empresa
            await axios.post('http://localhost:5000/companies', { name, address, image });
        }

        // Resetear campos después de la operación
        setName('');
        setAddress('');
        setImage('');
        setCurrentCompanyId(null);

        // Volver a cargar las empresas
        const response = await axios.get('http://localhost:5000/companies');
        setCompanies(response.data);
    };

    // Eliminar empresa
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/companies/${id}`);
        setCompanies(companies.filter(company => company.id !== id));
    };

    // Editar empresa
    const handleEdit = (company) => {
        setName(company.name);
        setAddress(company.address);
        setImage(company.image);
        setCurrentCompanyId(company.id);
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
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Logotipo (URL)"
                    required
                />
                <button type="submit">{currentCompanyId ? 'Actualizar' : 'Crear'}</button>
            </form>
            <ul>
                {companies.map(company => (
                    <li key={company.id}>
                        <h2>{company.name}</h2>
                        <p>{company.address}</p>
                        <img src={company.image} alt={company.name} style={{ maxWidth: '100px' }} />
                        <button onClick={() => handleEdit(company)}>Editar</button>
                        <button onClick={() => handleDelete(company.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;
