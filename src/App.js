import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './itemList'; // Asegúrate de que el nombre sea correcto
import CompanyList from './companyList'; // Asegúrate de que el nombre sea correcto
import ReportList from './reportList'; // Asegúrate de que el nombre sea correcto
import RoleList from './roleList'; // Asegúrate de que el nombre sea correcto
import './App.css'; // Asegúrate de que los estilos estén aplicados

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar">
                    <Link to="/users">
                        <button className="nav-button">Usuarios</button>
                    </Link>
                    <Link to="/companies">
                        <button className="nav-button">Empresas</button>
                    </Link>
                    <Link to="/reports">
                        <button className="nav-button">Informes</button>
                    </Link>
                    <Link to="/roles">
                        <button className="nav-button">Roles</button>
                    </Link>
                </nav>
                
                <Routes>
                    <Route path="/users" element={<UserList />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/reports" element={<ReportList />} />
                    <Route path="/roles" element={<RoleList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
