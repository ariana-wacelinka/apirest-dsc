require('dotenv').config();

const express = require("express");
const app = express();
const cors = require('cors');
const Pool = require('pg').Pool;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
}));

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

    if (!title || !description || !date) {
        return response.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    pool.query(
        'INSERT INTO announcements (title, description, date) VALUES ($1, $2, $3)',
        [title, description, date],
        (error, results) => {
            if (error) {
                console.error('Error al crear anuncio:', error.message);
                return response.status(500).json({ error: 'Error al crear anuncio: ' + error.message });
            } else {
                return response.status(201).json({ AnnouncementCreated: 'Ok' });
            }
        }
    );    
};

const deleteAnnouncement = (request, response) => {
    const { id } = request.params; // Obtener el id de los parámetros de la URL, no del body
    console.log("Announcement to delete:", id);

    pool.query('DELETE FROM announcements WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar anuncio:', error);
            response.status(500).json({ error: 'Error al eliminar el anuncio' });
        } else if (results.rowCount === 0) {
            response.status(404).json({ error: 'Anuncio no encontrado' });
        } else {
            response.status(200).json({ AnnouncementDeleted: 'Ok' });
        }
    });
};

const updateAnnouncement = (request, response) => {
    const id = request.params.id;
    const { title, description, date } = request.body;

    pool.query('UPDATE announcements SET title = $1, description = $2, date = $3 WHERE id = $4', [title, description, date, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar anuncio:', error);
            response.status(500).json({ error: 'Error al actualizar anuncio' });
        } else if (results.rowCount === 0) {
            response.status(404).json({ error: 'Anuncio no encontrado' });
        } else {
            response.status(200).json({ AnnouncementUpdated: 'Ok' });
        }
    });
};

const getAnnouncementById = (request, response) => {
    const id = request.params.id;

    pool.query('SELECT * FROM announcements WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error('Error al obtener anuncio:', error);
            response.status(500).json({ error: 'Error al obtener anuncio' });
        } else if (results.rowCount === 0) {
            response.status(404).json({ error: 'Anuncio no encontrado' });
        } else {
            response.status(200).json(results.rows[0]);
        }
    });
};

app.get('/announcements', getAllAnnouncements);
app.post('/announcements', createAnnouncement);
app.get('/announcements/:id', getAnnouncementById);
app.put('/announcements/:id', updateAnnouncement);
app.delete('/announcements', deleteAnnouncement);

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
