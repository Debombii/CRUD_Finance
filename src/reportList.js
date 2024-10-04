import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Asegúrate de importar los estilos

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [currentReportId, setCurrentReportId] = useState(null);

    // Leer informes
    useEffect(() => {
        const fetchReports = async () => {
            const response = await axios.get('http://localhost:5000/reports');
            setReports(response.data);
        };

        fetchReports();
    }, []);

    // Crear o actualizar informe
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentReportId) {
            await axios.put(`http://localhost:5000/reports/${currentReportId}`, { title, content });
        } else {
            await axios.post('http://localhost:5000/reports', { title, content });
        }
        setTitle('');
        setContent('');
        setCurrentReportId(null);
        const response = await axios.get('http://localhost:5000/reports');
        setReports(response.data);
    };

    // Eliminar informe
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/reports/${id}`);
        setReports(reports.filter(report => report._id !== id));
    };

    // Editar informe
    const handleEdit = (report) => {
        setTitle(report.title);
        setContent(report.content);
        setCurrentReportId(report._id);
    };

    return (
        <div className="container">
            <h1>Lista de Informes</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Contenido"
                    required
                ></textarea>
                <button type="submit">{currentReportId ? 'Actualizar' : 'Crear'}</button>
            </form>
            <ul>
                {reports.map(report => (
                    <li key={report._id}>
                        <h2>{report.title}</h2>
                        <p>{report.content}</p>
                        <button onClick={() => handleEdit(report)}>Editar</button>
                        <button onClick={() => handleDelete(report._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportList;
