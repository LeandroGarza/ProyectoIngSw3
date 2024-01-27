const express = require('express');
const cors = require('cors');
//import { createPool } from 'mysql2/promise';
const { createPool } = require('mysql2/promise');
const app = express()
const port = 3000

let transactionArr = []

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());


const pool = createPool({
    host: 'database',
    user: 'root',
    password: 'leandro2',
    database: 'ingsw3leandro',
    port: 3306
});

// Verifica la conexión a la base de datos al inicio del servidor
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida correctamentee');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
})();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/transactions', (req, res) => {
    console.log(transactionArr);
    res.send(JSON.stringify(transactionArr));
});

app.post('/transactions', async (req, res) => {
    try {
        const { description, price } = req.body; // Cambia aquí
        const insertQuery = 'INSERT INTO transactions (description, price) VALUES (?, ?)'; // Cambia aquí
        const result = await pool.query(insertQuery, [description, price]); // Cambia aquí

        console.log('Transacción insertada correctamente en la base de datos');
        res.status(200).send('Transacción insertada correctamente');
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).send('Error interno del servidor');
    }
});


app.listen(port, () => {
    console.log(`Me ejecuto en http://localhost:${port}`);
});

