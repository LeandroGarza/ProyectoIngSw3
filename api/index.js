const express = require('express');
const cors = require('cors');
const { createPool } = require('mysql2/promise');
const app = express();
const port = 3000;

let transactionArr = [];

app.use(cors());
app.use(express.json());

const pool = createPool({
    host: 'database',
    user: 'root',
    password: 'leandro2',
    database: 'ingsw3leandro',
    port: 3306
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida correctamente');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
})();

async function getLastThreePrices() {
    try {
        const selectQuery = 'SELECT price FROM transactions ORDER BY id DESC LIMIT 3';
        const [rows] = await pool.query(selectQuery);

        return rows.reverse();
    } catch (error) {
        console.error('Error al obtener los últimos tres precios:', error);
        throw error;
    }
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/transactions', (req, res) => {
    console.log(transactionArr);
    res.send(JSON.stringify(transactionArr));
});

app.get('/transactions/last-three-prices', async (req, res) => {
    try {
        const lastThreePrices = await getLastThreePrices();
        res.status(200).json(lastThreePrices);
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/transactions', async (req, res) => {
    try {
        const { description, price } = req.body;
        const insertQuery = 'INSERT INTO transactions (description, price) VALUES (?, ?)';
        const result = await pool.query(insertQuery, [description, price]);

        console.log('Transacción insertada correctamente en la base de datos');

        // Respondemos con un objeto JSON indicando el éxito
        res.status(200).json({ success: true, message: 'Transacción insertada correctamente' });
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});


app.listen(port, () => {
    console.log(`Me ejecuto en http://localhost:${port}`);
});


