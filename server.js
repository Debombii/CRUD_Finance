const express = require('express');
const mysql = require('mysql2'); // Asegúrate de tener mysql2 instalado
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'P@ssw0rd', // Cambia esto a tu contraseña de MySQL
    database: 'finance_dat', // Cambia esto al nombre de tu base de datos
    port: 3307
});

// Conectar a la base de datos MySQL
connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL como id ' + connection.threadId);
});

// Rutas CRUD para usuarios
app.post('/users', (req, res) => {
    const { name, email, password, company, role } = req.body;
    const query = 'INSERT INTO users (name, email, password, company, role) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [name, email, password, company, role], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json({ id: results.insertId, name, email, company, role });
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, company, role } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, password = ?, company = ?, role = ? WHERE id = ?';
    connection.query(query, [name, email, password, company, role, id], (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.sendStatus(204); // No Content
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.sendStatus(204); // No Content
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
