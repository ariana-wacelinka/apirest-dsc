require('dotenv').config();

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos. Hora actual:', res.rows[0]);
    }
});

const getAllAnnouncements = (request, response) => {
    pool.query('SELECT * FROM announcements', (error, results) => {
        if (error) {
            console.error('Error al obtener anuncios:', error);
            response.status(500).json({ error: 'Error al obtener anuncios' });
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const createAnnouncement = (request, response) => {
    const { title, description, date } = request.body;
    console.log("Datos recibidos para crear anuncio:", title, description, date);

    pool.query('INSERT INTO announcements (title, description, date) VALUES ($1, $2, $3)', [title, description, date], (error, results) => {
        if (error) {
            console.error('Error al crear anuncio:', error);
            response.status(500).json({ error: 'Error al crear anuncio' });
        } else {
            response.status(201).json({ AnnouncementCreated: 'Ok' });
        }
    });
};

app.post('/announcements', createAnnouncement);
app.get('/announcements', getAllAnnouncements);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
